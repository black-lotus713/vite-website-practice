import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve('./');
const sourcePath = path.join(projectRoot, 'tmp', 'review_scrape.json');
const reviewsFile = path.join(projectRoot, 'src', 'data', 'reviews.ts');

const raw = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

const normalizeText = (value = '') => {
  return value
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u00A0/g, ' ')
    .replace(/😎/g, ':)');
};

const sanitize = value => normalizeText(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');

const mapped = raw.map(item => {
  const date = item.id === '1556720332471972014' ? 'November 2025' : item.date ?? 'Unknown';
  return {
    id: item.id,
    author: normalizeText(item.author),
    location: normalizeText(item.location),
    rating: item.rating,
    date,
    stayDetails: normalizeText(item.stayContext),
    text: normalizeText(item.body),
    source: 'airbnb'
  };
});

const uniqueIds = new Set();
const deduped = [];
for (const review of mapped) {
  if (uniqueIds.has(review.id)) continue;
  uniqueIds.add(review.id);
  deduped.push(review);
}

const totals = deduped.reduce(
  (acc, review) => {
    acc.sum += review.rating;
    acc.count += 1;
    acc.breakdown[review.rating] += 1;
    return acc;
  },
  { sum: 0, count: 0, breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } }
);

const overall = totals.sum / totals.count;
const overallRating = Math.round(overall * 100) / 100;

const header = `import type { Review, ReviewStats } from '../types';\n\n` +
  `/**\n * Guest Reviews Data\n * Source: Airbnb listing - data-extraction-results.md Section 10\n * Last Updated: November 2025\n */\n`;

const serializeReview = review => {
  return `  {\n` +
    `    id: "${sanitize(review.id)}",\n` +
    `    author: "${sanitize(review.author)}",\n` +
    `    location: "${sanitize(review.location)}",\n` +
    `    rating: ${review.rating},\n` +
    `    date: "${sanitize(review.date)}",\n` +
    `    stayDetails: "${sanitize(review.stayDetails)}",\n` +
    `    text: "${sanitize(review.text)}",\n` +
    `    source: "${sanitize(review.source)}"\n` +
    `  }`;
};

const reviewsArray = `export const reviews: Review[] = [\n${deduped.map(serializeReview).join(',\n')}\n];\n\n`;

const statsBlock = `export const reviewStats: ReviewStats = {\n` +
  `  overallRating: ${overallRating.toFixed(2)},\n` +
  `  totalReviews: ${totals.count},\n` +
  `  ratingBreakdown: {\n` +
  `    5: ${totals.breakdown[5]},\n` +
  `    4: ${totals.breakdown[4]},\n` +
  `    3: ${totals.breakdown[3]},\n` +
  `    2: ${totals.breakdown[2]},\n` +
  `    1: ${totals.breakdown[1]}\n` +
  `  }\n};\n\n`;

const helpers = `export const getReviewsByDate = (): Review[] => {\n` +
  `  return [...reviews].sort((a, b) => {\n` +
  `    const timeA = Date.parse(a.date);\n` +
  `    const timeB = Date.parse(b.date);\n` +
  `    if (Number.isNaN(timeA) && Number.isNaN(timeB)) {\n` +
  `      return 0;\n` +
  `    }\n` +
  `    if (Number.isNaN(timeA)) {\n` +
  `      return 1;\n` +
  `    }\n` +
  `    if (Number.isNaN(timeB)) {\n` +
  `      return -1;\n` +
  `    }\n` +
  `    return timeB - timeA;\n` +
  `  });\n};\n\n` +
  `export const getReviewsByRating = (rating: number): Review[] => {\n` +
  `  return reviews.filter(review => review.rating === rating);\n` +
  `};\n\n` +
  `export const searchReviews = (keyword: string): Review[] => {\n` +
  `  const lowerKeyword = keyword.toLowerCase();\n` +
  `  return reviews.filter(review =>\n` +
  `    review.text.toLowerCase().includes(lowerKeyword) ||\n` +
  `    review.author.toLowerCase().includes(lowerKeyword)\n` +
  `  );\n` +
  `};\n`;

const fileContents = header + reviewsArray + statsBlock + helpers;
fs.writeFileSync(reviewsFile, fileContents + '\n');

console.log(`Wrote ${deduped.length} reviews to src/data/reviews.ts`);

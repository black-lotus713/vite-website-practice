import type { ReviewStats } from '../types';

/**
 * Generate array of star icons based on rating
 * @param rating - Rating value (1-5)
 * @returns Array of 'full' or 'empty' strings for star display
 */
export const getStarArray = (rating: number): ('full' | 'empty')[] => {
  const stars: ('full' | 'empty')[] = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating ? 'full' : 'empty');
  }
  return stars;
};

/**
 * Calculate percentage for rating bar
 * @param count - Number of reviews with this rating
 * @param total - Total number of reviews
 * @returns Percentage as number (0-100)
 */
export const calculateRatingPercentage = (count: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((count / total) * 100);
};

/**
 * Format rating number for display
 * @param rating - Rating value
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted rating string
 */
export const formatRating = (rating: number, decimals: number = 2): string => {
  return rating.toFixed(decimals);
};

/**
 * Get rating category label
 * @param rating - Rating value (1-5)
 * @returns Category label string
 */
export const getRatingLabel = (rating: number): string => {
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 4.0) return 'Very Good';
  if (rating >= 3.0) return 'Good';
  if (rating >= 2.0) return 'Fair';
  return 'Needs Improvement';
};

/**
 * Calculate average rating from reviews
 * @param reviews - Array of review objects with rating property
 * @returns Average rating
 */
export const calculateAverageRating = (reviews: { rating: number }[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};

/**
 * Get review stats summary text
 * @param stats - Review statistics object
 * @returns Formatted summary string
 */
export const getReviewSummary = (stats: ReviewStats): string => {
  return `${formatRating(stats.overallRating)} out of 5 based on ${stats.totalReviews} reviews`;
};

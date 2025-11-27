import type { Review, ReviewStats } from '../types';

/**
 * Guest Reviews Data
 * Source: Airbnb listing - data-extraction-results.md Section 10
 * Last Updated: November 2025
 */
export const reviews: Review[] = [
  {
    id: 'review-001',
    author: 'Keith',
    location: 'Spring, Texas',
    rating: 5,
    date: 'October 2025',
    stayDetails: 'Stayed with a pet',
    text: "We loved staying here. Gordon was very accommodating. Beautiful sunrise in the morning to sit out on the back deck with a cup of coffee. Unfortunately didn't catch any crab but that's ok. Caught fish on the back deck in the evening time. If you are looking for a beautiful place to stay with a responsive host this is the place for you.",
    source: 'airbnb'
  },
  {
    id: 'review-002',
    author: 'Albert',
    location: 'League City, Texas',
    rating: 5,
    date: 'September 2025',
    stayDetails: 'Stayed a few nights',
    text: "Great location and great over all stay, my wife loved the patio over looking the laguna and back side of padre island. The sunrise comes up right thru the master bedroom window which was an unexpected surprise. I was able to tie my boat to the dock which has easy access to the laguna madre fishing grounds, which did not disappoint. I would definitely stay here again",
    source: 'airbnb'
  },
  {
    id: 'review-003',
    author: 'Kellie',
    location: 'Bryan, Texas',
    rating: 4,
    date: 'September 2025',
    stayDetails: 'Stayed a few nights',
    text: "Great location, beautiful canal views. We had fun with the kayaks. The unit was nice, needed some repairs that the owner states he was getting done. Parking is tight if you have more than one car.",
    source: 'airbnb'
  },
  {
    id: 'review-004',
    author: 'Levelt',
    location: 'Oklahoma City, Oklahoma',
    rating: 5,
    date: 'July 2025',
    stayDetails: 'Stayed with kids',
    text: "Great place to stay, will definitely be coming back here. Beautiful sunrise/sunset. Fishing right out the back door was awesome! Gordon was very responsive and super friendly and helpful. This is a place for anyone whether you are a stay at home person or super active. The beach is literally less than 5 minutes from this property. Picture perfect, the whole family enjoyed our stay!!!!! 5 star experience!!! Definitely recommended!!",
    source: 'airbnb'
  },
  {
    id: 'review-005',
    author: 'Richard',
    location: 'Fulshear, Texas',
    rating: 5,
    date: 'November 2025',
    stayDetails: 'Stayed with kids',
    text: "Fishing was great. My kids caught a lot. Close to the beach. Gordon responded quickly. Good time.",
    source: 'airbnb'
  },
  {
    id: 'review-006',
    author: 'Troy',
    location: '6 years on Airbnb',
    rating: 5,
    date: 'June 2025',
    stayDetails: 'Stayed with kids',
    text: "This location is very well taken care of and is perfect for a family vacation. It is in a very good location with a good amount of food options close by, just a short drive to the beach, and the neighborhood is very nice. The deck in the back is a very nice amenity and we were lucky enough to catch a few fish while hanging out in the afternoons. If you bring more than one truck or bigger suv parking in the driveway can be a little bit of a challenge if there's someone staying next door with two vehicles as well but if you're in cars or smaller suvs, it shouldn't be too bad. Overall, I would definitely stay here again.",
    source: 'airbnb'
  }
];

/**
 * Review Statistics
 * Calculated from actual reviews data
 */
export const reviewStats: ReviewStats = {
  overallRating: 4.88,
  totalReviews: 41,
  ratingBreakdown: {
    5: 38,
    4: 3,
    3: 0,
    2: 0,
    1: 0
  }
};

/**
 * Get reviews sorted by date (newest first)
 */
export const getReviewsByDate = (): Review[] => {
  return [...reviews].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
};

/**
 * Get reviews filtered by rating
 */
export const getReviewsByRating = (rating: number): Review[] => {
  return reviews.filter(review => review.rating === rating);
};

/**
 * Get reviews that mention specific keywords
 */
export const searchReviews = (keyword: string): Review[] => {
  const lowerKeyword = keyword.toLowerCase();
  return reviews.filter(review =>
    review.text.toLowerCase().includes(lowerKeyword) ||
    review.author.toLowerCase().includes(lowerKeyword)
  );
};

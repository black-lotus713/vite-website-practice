# Phase 3: Sprint 3a - Reviews Implementation Plan

## Document Purpose
This document provides detailed, step-by-step instructions for implementing the **Reviews feature** as part of Sprint 3 in the Vite website practice project. This follows the established pattern from Sprint 1-2.

---

## Prerequisites

### Project Status Check
Before starting, verify:
- ✅ Sprint 1 & 2 completed (Home, Gallery, Amenities, Location pages)
- ✅ React Router DOM navigation working
- ✅ React Icons installed
- ✅ Layout components operational
- ✅ Development server runs without errors (`npm run dev`)

### Data Source
All review data is extracted from Section 10 of `!ai_docs/data-extraction-results.md`

---

## Sprint 3a Overview: Reviews Feature

**Objective**: Implement a complete Reviews page with rating display, review cards, and filtering/sorting capabilities.

**Components to Create**:
1. Reviews data module (`src/data/reviews.ts`)
2. Rating utilities (`src/utils/ratingUtils.ts`)
3. ReviewCard component (`src/components/ui/ReviewCard.tsx`)
4. ReviewsPage implementation (`src/components/pages/ReviewsPage.tsx`)

**Key Principle**: All content driven from structured data - NO hard-coded strings in components.

---

## Implementation Tasks

### Task 3a.1: Add Review TypeScript Interfaces

**File**: `src/types/index.ts`

**Objective**: Add type definitions for review data

**Action**: Add the following interfaces to the existing file:

```typescript
// Review Types
export interface Review {
  id: string;
  author: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  stayDetails: string;
  text: string;
  source: string;
}

export interface ReviewStats {
  overallRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}
```

**Verification**:
```powershell
Get-Content src/types/index.ts | Select-String "Review"
```

---

### Task 3a.2: Create Reviews Data Module

**File**: `src/data/reviews.ts` (NEW)

**Objective**: Create centralized reviews data from Section 10 of data-extraction-results.md

**Action**: Create the file with the following content:

```typescript
import { Review, ReviewStats } from '../types';

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
```

**Verification**:
```powershell
Get-Content src/data/reviews.ts | Select-String "export"
```

---

### Task 3a.3: Create Rating Utility Functions

**File**: `src/utils/ratingUtils.ts` (NEW)

**Objective**: Create reusable utility functions for rating calculations and display

**Action**: Create the file with the following content:

```typescript
import { ReviewStats } from '../types';

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
```

**Verification**:
```powershell
Get-Content src/utils/ratingUtils.ts | Select-String "export"
```

---

### Task 3a.4: Create ReviewCard Component Styles

**File**: `src/components/ui/ReviewCard.css` (NEW)

**Objective**: Create styles for individual review cards

**Action**: Create the file with the following content:

```css
/* ReviewCard.css */
.review-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.review-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Review Header */
.review-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}

.review-card__author-info {
  flex: 1;
}

.review-card__author-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #222222;
  margin: 0 0 4px 0;
}

.review-card__author-location {
  font-size: 0.9rem;
  color: #717171;
  margin: 0;
}

.review-card__rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.review-card__star {
  color: #ffc107;
  font-size: 1rem;
}

.review-card__star--empty {
  color: #e0e0e0;
}

/* Review Meta */
.review-card__meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.review-card__date {
  font-size: 0.9rem;
  color: #717171;
}

.review-card__stay-details {
  font-size: 0.9rem;
  color: #717171;
  display: flex;
  align-items: center;
  gap: 4px;
}

.review-card__stay-icon {
  font-size: 0.85rem;
}

/* Review Text */
.review-card__text {
  font-size: 1rem;
  line-height: 1.6;
  color: #484848;
  margin: 0;
}

.review-card__text--expanded {
  display: block;
}

.review-card__text--collapsed {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.review-card__read-more {
  background: none;
  border: none;
  color: #0066cc;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 8px;
  padding: 0;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.review-card__read-more:hover {
  color: #004999;
}

/* Responsive Design */
@media (max-width: 768px) {
  .review-card {
    padding: 20px;
    margin-bottom: 16px;
  }

  .review-card__header {
    flex-direction: column;
    gap: 12px;
  }

  .review-card__author-name {
    font-size: 1rem;
  }

  .review-card__text {
    font-size: 0.95rem;
  }
}
```

**Verification**: File created successfully

---

### Task 3a.5: Create ReviewCard Component

**File**: `src/components/ui/ReviewCard.tsx` (NEW)

**Objective**: Create reusable review card component

**Action**: Create the file with the following content:

```typescript
import { useState } from 'react';
import { FaStar, FaRegStar, FaUserFriends, FaDog, FaChild } from 'react-icons/fa';
import { Review } from '../../types';
import { getStarArray } from '../../utils/ratingUtils';
import './ReviewCard.css';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const stars = getStarArray(review.rating);
  const shouldShowReadMore = review.text.length > 200;

  const getStayIcon = () => {
    const stayLower = review.stayDetails.toLowerCase();
    if (stayLower.includes('pet')) return <FaDog className="review-card__stay-icon" />;
    if (stayLower.includes('kid')) return <FaChild className="review-card__stay-icon" />;
    return <FaUserFriends className="review-card__stay-icon" />;
  };

  return (
    <article className="review-card">
      <div className="review-card__header">
        <div className="review-card__author-info">
          <h3 className="review-card__author-name">{review.author}</h3>
          <p className="review-card__author-location">{review.location}</p>
        </div>
        <div className="review-card__rating" aria-label={`Rating: ${review.rating} out of 5 stars`}>
          {stars.map((star, index) => (
            star === 'full' ? (
              <FaStar key={index} className="review-card__star" />
            ) : (
              <FaRegStar key={index} className="review-card__star review-card__star--empty" />
            )
          ))}
        </div>
      </div>

      <div className="review-card__meta">
        <span className="review-card__date">{review.date}</span>
        <span className="review-card__stay-details">
          {getStayIcon()}
          {review.stayDetails}
        </span>
      </div>

      <p className={`review-card__text ${isExpanded ? 'review-card__text--expanded' : 'review-card__text--collapsed'}`}>
        {review.text}
      </p>

      {shouldShowReadMore && (
        <button 
          className="review-card__read-more"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Show less' : 'Read more'}
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </article>
  );
};

export default ReviewCard;
```

**Verification**:
```powershell
Get-Content src/components/ui/ReviewCard.tsx | Select-String "export default"
```

---

### Task 3a.6: Create ReviewsPage Styles

**File**: `src/components/pages/ReviewsPage.css` (NEW)

**Objective**: Create styles for the Reviews page layout

**Action**: Create the file with the following content:

```css
/* ReviewsPage.css */
.reviews-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px 80px;
}

/* Page Header */
.reviews-page__header {
  margin-bottom: 48px;
  text-align: center;
}

.reviews-page__title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #222222;
  margin: 0 0 16px 0;
}

.reviews-page__subtitle {
  font-size: 1.2rem;
  color: #717171;
  margin: 0;
}

/* Stats Section */
.reviews-page__stats {
  background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);
  color: #ffffff;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 48px;
  box-shadow: 0 4px 20px rgba(0, 102, 204, 0.2);
}

.reviews-page__stats-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 48px;
  align-items: center;
}

.reviews-page__overall {
  text-align: center;
}

.reviews-page__overall-rating {
  font-size: 4rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  line-height: 1;
}

.reviews-page__overall-stars {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 8px;
  font-size: 1.5rem;
}

.reviews-page__overall-label {
  font-size: 1.1rem;
  opacity: 0.95;
  margin: 0 0 4px 0;
}

.reviews-page__overall-count {
  font-size: 0.95rem;
  opacity: 0.85;
  margin: 0;
}

/* Rating Breakdown */
.reviews-page__breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reviews-page__breakdown-row {
  display: grid;
  grid-template-columns: 60px 1fr 80px;
  gap: 16px;
  align-items: center;
}

.reviews-page__breakdown-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.95rem;
}

.reviews-page__breakdown-bar {
  background: rgba(255, 255, 255, 0.2);
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.reviews-page__breakdown-fill {
  background: #ffffff;
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.reviews-page__breakdown-count {
  font-size: 0.9rem;
  text-align: right;
}

/* Filters Section */
.reviews-page__filters {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  align-items: center;
}

.reviews-page__filter-label {
  font-size: 1rem;
  font-weight: 600;
  color: #222222;
}

.reviews-page__filter-select {
  padding: 10px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: #ffffff;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.reviews-page__filter-select:hover {
  border-color: #0066cc;
}

.reviews-page__filter-select:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

/* Reviews List */
.reviews-page__list {
  margin-top: 32px;
}

.reviews-page__count {
  font-size: 1.1rem;
  font-weight: 600;
  color: #222222;
  margin: 0 0 24px 0;
}

.reviews-page__empty {
  text-align: center;
  padding: 60px 24px;
  color: #717171;
}

.reviews-page__empty-icon {
  font-size: 3rem;
  margin-bottom: 16px;
  opacity: 0.5;
}

.reviews-page__empty-text {
  font-size: 1.1rem;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .reviews-page__stats-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .reviews-page {
    padding: 40px 16px 60px;
  }

  .reviews-page__title {
    font-size: 2rem;
  }

  .reviews-page__subtitle {
    font-size: 1rem;
  }

  .reviews-page__stats {
    padding: 32px 24px;
  }

  .reviews-page__overall-rating {
    font-size: 3rem;
  }

  .reviews-page__overall-stars {
    font-size: 1.2rem;
  }

  .reviews-page__breakdown-row {
    grid-template-columns: 50px 1fr 60px;
    gap: 12px;
  }

  .reviews-page__filters {
    flex-direction: column;
    align-items: stretch;
  }

  .reviews-page__filter-select {
    width: 100%;
  }
}
```

**Verification**: File created successfully

---

### Task 3a.7: Implement ReviewsPage Component

**File**: `src/components/pages/ReviewsPage.tsx`

**Objective**: Replace placeholder with full Reviews page implementation

**Action**: Replace the entire file content with:

```typescript
import { useState, useMemo } from 'react';
import { FaStar, FaRegStar, FaComments } from 'react-icons/fa';
import { reviews, reviewStats } from '../../data/reviews';
import ReviewCard from '../ui/ReviewCard';
import { getStarArray, calculateRatingPercentage, formatRating } from '../../utils/ratingUtils';
import './ReviewsPage.css';

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';
type FilterOption = 'all' | '5' | '4' | '3' | '2' | '1';

const ReviewsPage: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterRating, setFilterRating] = useState<FilterOption>('all');

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let result = [...reviews];

    // Apply rating filter
    if (filterRating !== 'all') {
      const ratingValue = parseInt(filterRating);
      result = result.filter(review => review.rating === ratingValue);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    return result;
  }, [sortBy, filterRating]);

  const overallStars = getStarArray(Math.round(reviewStats.overallRating));

  return (
    <div className="reviews-page">
      {/* Page Header */}
      <header className="reviews-page__header">
        <h1 className="reviews-page__title">Guest Reviews</h1>
        <p className="reviews-page__subtitle">
          What our guests are saying about their stay
        </p>
      </header>

      {/* Overall Stats Section */}
      <section className="reviews-page__stats">
        <div className="reviews-page__stats-content">
          {/* Overall Rating */}
          <div className="reviews-page__overall">
            <div className="reviews-page__overall-rating">
              {formatRating(reviewStats.overallRating)}
            </div>
            <div className="reviews-page__overall-stars" aria-label={`Overall rating: ${reviewStats.overallRating} out of 5 stars`}>
              {overallStars.map((star, index) => (
                star === 'full' ? (
                  <FaStar key={index} />
                ) : (
                  <FaRegStar key={index} />
                )
              ))}
            </div>
            <p className="reviews-page__overall-label">Excellent</p>
            <p className="reviews-page__overall-count">
              Based on {reviewStats.totalReviews} reviews
            </p>
          </div>

          {/* Rating Breakdown */}
          <div className="reviews-page__breakdown">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = reviewStats.ratingBreakdown[rating as keyof typeof reviewStats.ratingBreakdown];
              const percentage = calculateRatingPercentage(count, reviewStats.totalReviews);

              return (
                <div key={rating} className="reviews-page__breakdown-row">
                  <span className="reviews-page__breakdown-label">
                    <FaStar /> {rating}
                  </span>
                  <div className="reviews-page__breakdown-bar">
                    <div 
                      className="reviews-page__breakdown-fill"
                      style={{ width: `${percentage}%` }}
                      aria-label={`${percentage}% of reviews`}
                    />
                  </div>
                  <span className="reviews-page__breakdown-count">
                    {count} {count === 1 ? 'review' : 'reviews'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters and Sorting */}
      <div className="reviews-page__filters">
        <label className="reviews-page__filter-label" htmlFor="sort-select">
          Sort by:
        </label>
        <select
          id="sort-select"
          className="reviews-page__filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>

        <label className="reviews-page__filter-label" htmlFor="filter-select">
          Filter:
        </label>
        <select
          id="filter-select"
          className="reviews-page__filter-select"
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value as FilterOption)}
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars Only</option>
          <option value="4">4 Stars Only</option>
          <option value="3">3 Stars Only</option>
          <option value="2">2 Stars Only</option>
          <option value="1">1 Star Only</option>
        </select>
      </div>

      {/* Reviews List */}
      <section className="reviews-page__list">
        <h2 className="reviews-page__count">
          {filteredAndSortedReviews.length} {filteredAndSortedReviews.length === 1 ? 'Review' : 'Reviews'}
        </h2>

        {filteredAndSortedReviews.length > 0 ? (
          filteredAndSortedReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="reviews-page__empty">
            <FaComments className="reviews-page__empty-icon" />
            <p className="reviews-page__empty-text">
              No reviews match your selected filters.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ReviewsPage;
```

**Verification**:
```powershell
npm run dev
```

Navigate to http://localhost:5173/reviews and verify:
- Overall rating displays correctly (4.88 out of 5)
- Rating breakdown bars show correct percentages
- All 6 reviews display with proper formatting
- Star ratings display correctly
- Sort and filter controls work
- "Read more" button works for longer reviews
- Responsive design works on mobile

---

## Testing Checklist

### Functional Testing
- [ ] Reviews page loads without errors
- [ ] All 6 reviews display correctly
- [ ] Overall rating shows 4.88 with star display
- [ ] Rating breakdown percentages are correct
- [ ] Sort by newest/oldest works
- [ ] Sort by highest/lowest rating works
- [ ] Filter by rating (5, 4, 3, 2, 1 stars) works
- [ ] "All Ratings" filter shows all reviews
- [ ] Empty state displays when no reviews match filter
- [ ] "Read more" button expands/collapses long reviews
- [ ] Author names and locations display correctly
- [ ] Review dates display correctly
- [ ] Stay details with icons display correctly

### Visual Testing
- [ ] Page layout is clean and organized
- [ ] Stats section has blue gradient background
- [ ] Stars display in gold (#ffc107)
- [ ] Review cards have hover effects
- [ ] Spacing and margins are consistent
- [ ] Typography is readable

### Responsive Testing
- [ ] Desktop view (1200px+): Stats in 2 columns
- [ ] Tablet view (768-1024px): Stats stack vertically
- [ ] Mobile view (<768px): Filters stack, cards adjust
- [ ] Touch targets are adequate on mobile

### Accessibility Testing
- [ ] All interactive elements are keyboard accessible
- [ ] Proper ARIA labels on star ratings
- [ ] Select dropdowns have associated labels
- [ ] Semantic HTML structure (article, section, header)
- [ ] Color contrast meets WCAG standards

---

## Completion Criteria

Sprint 3a is complete when:

1. ✅ All files created successfully
2. ✅ No TypeScript errors in any file
3. ✅ No console errors when running `npm run dev`
4. ✅ Reviews page accessible via /reviews route
5. ✅ All 6 reviews display correctly with data from reviews.ts
6. ✅ Rating stats display correctly (4.88 overall, 41 total)
7. ✅ Sort and filter functionality works as expected
8. ✅ All testing checklist items pass
9. ✅ Responsive design works on all screen sizes
10. ✅ No hard-coded review text in components (all from data module)

---

## Next Steps

After completing Sprint 3a:
- Sprint 3b can implement the Book page (pricing, availability calendar)
- Sprint 3c can implement the Contact page (host info, contact form)
- Final polish and optimization can be applied across all pages

---

## Notes

- Review data is sourced from Section 10 of data-extraction-results.md
- Only 6 reviews are shown (first 6 from the listing)
- Overall stats (4.88 rating, 41 reviews) come from the full listing data
- All content is data-driven - NO hard-coded strings in components
- Rating utilities are reusable for other components that need star displays
- Review filtering/sorting demonstrates React state management patterns

---

**Document Version**: 1.0  
**Last Updated**: November 27, 2025  
**Status**: Ready for Implementation

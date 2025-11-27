import { useState, useMemo } from 'react';
import { FaStar, FaRegStar, FaComments } from 'react-icons/fa';
import { reviews, reviewStats } from '../../data/reviews';
import ReviewCard from '../ui/ReviewCard';
import { getStarArray, calculateRatingPercentage, formatRating } from '../../utils/ratingUtils';
import './ReviewsPage.css';

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';
type FilterOption = 'all' | '5' | '4' | '3' | '2' | '1';

const ReviewsPage = () => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterRating, setFilterRating] = useState<FilterOption>('all');

  const filteredAndSortedReviews = useMemo(() => {
    let result = [...reviews];

    if (filterRating !== 'all') {
      const ratingValue = parseInt(filterRating);
      result = result.filter(review => review.rating === ratingValue);
    }

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
      <header className="reviews-page__header">
        <h1 className="reviews-page__title">Guest Reviews</h1>
        <p className="reviews-page__subtitle">
          What our guests are saying about their stay
        </p>
      </header>

      <section className="reviews-page__stats">
        <div className="reviews-page__stats-content">
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

import { useState } from 'react';
import { FaStar, FaRegStar, FaUserFriends, FaDog, FaChild } from 'react-icons/fa';
import type { Review } from '../../types';
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

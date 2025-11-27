import './PageStyles.css';

const ReviewsPage = () => {
  return (
    <div className="page">
      <h1>Guest Reviews</h1>
      <p className="page-description">
        Read what our guests have to say about their experience.
      </p>
      <div className="placeholder-content">
        <p>⭐ Reviews page content coming soon...</p>
        <ul>
          <li>Guest testimonials</li>
          <li>Star ratings</li>
          <li>Review cards with avatars</li>
          <li>Pagination or infinite scroll</li>
        </ul>
      </div>
    </div>
  );
};

export default ReviewsPage;

import './PageStyles.css';

const BookPage = () => {
  return (
    <div className="page">
      <h1>Book Your Stay</h1>
      <p className="page-description">
        Check availability and reserve your dates.
      </p>
      <div className="placeholder-content">
        <p>📅 Booking page content coming soon...</p>
        <ul>
          <li>Airbnb calendar widget integration</li>
          <li>Pricing information</li>
          <li>Booking rules and policies</li>
          <li>Direct booking link</li>
        </ul>
      </div>
    </div>
  );
};

export default BookPage;

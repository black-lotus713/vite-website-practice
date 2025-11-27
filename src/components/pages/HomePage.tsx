import './PageStyles.css';

const HomePage = () => {
  return (
    <div className="page">
      <h1>Welcome to Property Name</h1>
      <p className="page-description">
        Your perfect getaway awaits. Explore our beautiful property and book your stay today.
      </p>
      <div className="placeholder-content">
        <p>🏠 Home page content coming soon...</p>
        <ul>
          <li>Hero section with property image</li>
          <li>Property highlights</li>
          <li>Quick availability checker</li>
          <li>Call-to-action buttons</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;

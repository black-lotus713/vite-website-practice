import Hero from '../features/Hero';
import PropertyHighlights from '../features/PropertyHighlights';
import PropertyDescription from '../features/PropertyDescription';
import './PageStyles.css';

const HomePage = () => {
  return (
    <div className="page home-page">
      <Hero />
      <PropertyHighlights />
      <PropertyDescription />

      <section className="quick-links">
        <h2>Explore More</h2>
        <div className="quick-links-grid">
          <a href="/gallery" className="quick-link-card">
            <h3>Gallery</h3>
            <p>Browse 60+ photos of the property</p>
          </a>
          <a href="/amenities" className="quick-link-card">
            <h3>Amenities</h3>
            <p>See all features and amenities</p>
          </a>
          <a href="/location" className="quick-link-card">
            <h3>Location</h3>
            <p>Explore the area and nearby attractions</p>
          </a>
          <a href="/reviews" className="quick-link-card">
            <h3>Reviews</h3>
            <p>Read what guests are saying</p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

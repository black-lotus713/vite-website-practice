import { propertyData } from '../../data/propertyData';
import { FaStar, FaMedal } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const { propertyInfo, host } = propertyData;

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-header">
          <h1 className="hero-title">{propertyInfo.title}</h1>
          <div className="hero-badges">
            {host.guestFavorite && (
              <span className="badge guest-favorite">
                <FaStar /> Guest Favorite
              </span>
            )}
            {host.status === 'Superhost' && (
              <span className="badge superhost">
                <FaMedal /> {host.status}
              </span>
            )}
          </div>
        </div>

        <div className="hero-meta">
          <span className="location">{propertyInfo.location}</span>
          <span className="rating">
            <FaStar className="star-icon" />
            {host.overallRating} ({host.totalReviews} reviews)
          </span>
        </div>

        <div className="hero-capacity">
          <span>{propertyInfo.capacity.guests} guests</span>
          <span className="separator">·</span>
          <span>{propertyInfo.capacity.bedrooms} bedrooms</span>
          <span className="separator">·</span>
          <span>{propertyInfo.capacity.beds} beds</span>
          <span className="separator">·</span>
          <span>{propertyInfo.capacity.bathrooms} bathrooms</span>
        </div>

        <div className="hero-actions">
          <a href="/book" className="btn btn-primary">
            Reserve Now
          </a>
          <a href="/contact" className="btn btn-secondary">
            Contact Host
          </a>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://a0.muscache.com/im/pictures/miso/Hosting-1037878703063081617/original/03c7cba0-7a9b-48ba-9685-8bfba6aeec24.jpeg"
          alt="Waterfront property with deck and bay view"
        />
      </div>
    </section>
  );
};

export default Hero;

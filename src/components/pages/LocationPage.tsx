import { getLocationDetails } from '../../data/propertyData';
import { FaMapMarkerAlt, FaCar, FaUmbrellaBeach } from 'react-icons/fa';
import './PageStyles.css';
import './LocationPage.css';

const LocationPage = () => {
  const location = getLocationDetails();

  return (
    <div className="page location-page">
      <div className="page-header">
        <h1>Location</h1>
        <p className="page-description">
          {location.area} in {location.city}, {location.state}
        </p>
      </div>

      <section className="location-section">
        <div className="location-info">
          <div className="location-badge">
            <FaMapMarkerAlt />
            <span>
              {location.city}, {location.state}, {location.country}
            </span>
          </div>
          <p className="location-description">{location.area}</p>
        </div>
      </section>

      <section className="nearby-section">
        <h2>
          <FaCar className="section-icon" />
          Nearby Attractions
        </h2>
        <div className="attractions-grid">
          {location.nearbyAttractions.map((attraction, index) => (
            <div key={index} className="attraction-card">
              <FaUmbrellaBeach className="attraction-icon" />
              <span>{attraction}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="map-section">
        <h2>Map & Directions</h2>
        <div className="map-placeholder">
          <div className="map-content">
            <FaMapMarkerAlt className="map-icon" />
            <p className="map-text">Interactive map integration coming soon</p>
            <p className="map-subtext">Use the address above for GPS navigation</p>
          </div>
        </div>
        <p className="map-note">
          <strong>Note:</strong> Exact address will be provided after booking confirmation.
        </p>
      </section>

      <section className="area-info">
        <h2>About the Area</h2>
        <div className="info-cards">
          <div className="info-card">
            <h3>Beach Access</h3>
            <p>
              Just 6 minutes to Whitecap Beach and 13 minutes to the National Seashore. Perfect for daily beach trips and
              water activities.
            </p>
          </div>
          <div className="info-card">
            <h3>Waterfront Living</h3>
            <p>
              Direct access to Laguna Madre Bay with boat slip and kayaks. Fish from the dock or explore the calm bay
              waters.
            </p>
          </div>
          <div className="info-card">
            <h3>Convenient Location</h3>
            <p>
              Less than 30 minutes to Port Aransas and the airport. Close to restaurants, shopping, and local
              attractions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPage;

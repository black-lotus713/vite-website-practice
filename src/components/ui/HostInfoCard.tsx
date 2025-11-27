import { FaStar, FaAward, FaClock, FaBolt } from 'react-icons/fa';
import './HostInfoCard.css';
import { propertyData } from '../../data/propertyData';

const HostInfoCard = () => {
  const { host } = propertyData;

  if (!host) {
    return null;
  }

  const yearsLabel = host.yearsHosting === 1 ? 'year' : 'years';

  return (
    <section className="host-info-card" aria-labelledby="host-info-heading">
      <header className="host-info-card__header">
        <h3 id="host-info-heading">Meet Your Host</h3>
      </header>

      <div className="host-info-card__body">
        <div className="host-info-card__name-row">
          <div>
            <p className="host-info-card__name">{host.name}</p>
            <p className="host-info-card__tenure">
              Hosting for {host.yearsHosting} {yearsLabel}
            </p>
          </div>
          {host.isSuperhost && (
            <span className="host-info-card__superhost" aria-label="Superhost badge">
              <FaAward /> Superhost
            </span>
          )}
        </div>

        <div className="host-info-card__stats">
          <div className="host-info-card__stat">
            <FaStar className="host-info-card__stat-icon" />
            <div>
              <p className="host-info-card__stat-label">Rating</p>
              <p className="host-info-card__stat-value">{host.overallRating.toFixed(2)}</p>
            </div>
          </div>
          <div className="host-info-card__stat">
            <FaBolt className="host-info-card__stat-icon" />
            <div>
              <p className="host-info-card__stat-label">Reviews</p>
              <p className="host-info-card__stat-value">{host.totalReviews}</p>
            </div>
          </div>
        </div>

        <ul className="host-info-card__details">
          {host.responseTime && (
            <li>
              <FaClock /> Response time: <strong>{host.responseTime}</strong>
            </li>
          )}
          {host.responseRate && (
            <li>
              <FaClock /> Response rate: <strong>{host.responseRate}</strong>
            </li>
          )}
          <li>
            <FaStar /> Status: <strong>{host.status}</strong>
          </li>
        </ul>
      </div>

      <footer className="host-info-card__footer">
        <p>Message us through your booking platform for the fastest response.</p>
      </footer>
    </section>
  );
};

export default HostInfoCard;

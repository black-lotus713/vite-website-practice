import type { ReactNode } from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import './HouseRulesCard.css';

interface HouseRulesCardProps {
  icon?: ReactNode;
  title: string;
  items: string[];
  variant?: 'info' | 'warning' | 'success' | 'danger';
}

const HouseRulesCard = ({ icon, title, items, variant = 'info' }: HouseRulesCardProps) => {
  const getDefaultIcon = () => {
    switch (variant) {
      case 'success':
        return <FaCheckCircle />;
      case 'danger':
        return <FaTimesCircle />;
      case 'warning':
        return <FaExclamationTriangle />;
      default:
        return <FaClock />;
    }
  };

  return (
    <div className={`house-rules-card house-rules-card--${variant}`}>
      <div className="house-rules-card__header">
        <div className="house-rules-card__icon">{icon || getDefaultIcon()}</div>
        <h3 className="house-rules-card__title">{title}</h3>
      </div>
      <ul className="house-rules-card__list">
        {items.map((item, index) => (
          <li key={index} className="house-rules-card__item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HouseRulesCard;

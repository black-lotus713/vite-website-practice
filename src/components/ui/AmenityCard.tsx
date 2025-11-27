import { FaCheck } from 'react-icons/fa';
import type { AmenityItem } from '../../types';
import './AmenityCard.css';

interface AmenityCardProps {
  amenity: AmenityItem;
}

const AmenityCard = ({ amenity }: AmenityCardProps) => {
  return (
    <div className="amenity-card">
      <div className="amenity-check">
        <FaCheck />
      </div>
      <span className="amenity-name">{amenity.name}</span>
    </div>
  );
};

export default AmenityCard;

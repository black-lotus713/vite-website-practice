import { amenities, getCategoryDisplayName, getTotalAmenitiesCount } from '../../data/amenities';
import AmenityCard from '../ui/AmenityCard';
import type { AmenityCategory } from '../../types';
import './PageStyles.css';
import './AmenitiesPage.css';

const AmenitiesPage = () => {
  const totalCount = getTotalAmenitiesCount();
  const categories = Object.keys(amenities) as AmenityCategory[];

  return (
    <div className="page amenities-page">
      <div className="page-header">
        <h1>Amenities</h1>
        <p className="page-description">
          Discover all {totalCount} wonderful amenities and features available at Pelican's Place.
        </p>
      </div>

      <div className="amenities-container">
        {categories.map((category) => {
          const categoryAmenities = amenities[category];
          const displayName = getCategoryDisplayName(category);

          return (
            <section key={category} className="amenity-category">
              <h2 className="category-title">{displayName}</h2>
              <div className="amenities-grid">
                {categoryAmenities.map((amenity, index) => (
                  <AmenityCard key={`${category}-${index}`} amenity={amenity} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default AmenitiesPage;

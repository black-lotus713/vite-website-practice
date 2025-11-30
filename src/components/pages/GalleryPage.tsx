import { useState } from 'react';
import './PageStyles.css';
import './GalleryPage.css';
import { propertyImages, getCategories, getImagesByCategory } from '../../data/propertyImages';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const categories = ['All', ...getCategories()];
  const displayedImages = selectedCategory === 'All' 
    ? propertyImages 
    : getImagesByCategory(selectedCategory);

  return (
    <div className="page">
      <h1>Gallery</h1>
      <p className="page-description">
        Browse through our collection of photos showcasing the property and its amenities.
      </p>

      {/* Category Filter */}
      <div className="gallery-page__filters">
        {categories.map(category => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`gallery-page__filter-btn ${selectedCategory === category ? 'is-active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="gallery-page__grid">
        {displayedImages.map(image => (
          <div
            key={image.id}
            className="gallery-card"
            onClick={() => setSelectedImage(image.url)}
          >
            <img
              src={image.url}
              alt={image.alt}
              loading="lazy"
            />
            {image.alt && (
              <div className="gallery-card__caption">
                {image.alt}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="gallery-lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="gallery-lightbox__close"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="gallery-lightbox__image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;

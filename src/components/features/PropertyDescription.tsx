import { useState } from 'react';
import { getDescription } from '../../data/propertyData';
import './PropertyDescription.css';

const PropertyDescription = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const description = getDescription();
  const paragraphs = description.split('\n\n').filter((p) => p.trim());

  const previewText = paragraphs.slice(0, 2).join('\n\n');
  const fullText = description;

  return (
    <section className="property-description">
      <h2>About This Property</h2>
      <div className="description-content">
        <p className="description-text">{isExpanded ? fullText : previewText}</p>
        {paragraphs.length > 2 && (
          <button className="show-more-btn" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </section>
  );
};

export default PropertyDescription;

import type { ReactNode } from 'react';
import { getHighlights } from '../../data/propertyData';
import { FaKey, FaHome, FaMountain } from 'react-icons/fa';
import './PropertyHighlights.css';

const iconMap: Record<string, ReactNode> = {
  FaKey: <FaKey />,
  FaHome: <FaHome />,
  FaMountain: <FaMountain />,
};

const PropertyHighlights = () => {
  const highlights = getHighlights();

  return (
    <section className="property-highlights">
      <h2>Property Highlights</h2>
      <div className="highlights-grid">
        {highlights.map((highlight, index) => (
          <div key={index} className="highlight-card">
            <div className="highlight-icon">
              {highlight.icon && iconMap[highlight.icon]}
            </div>
            <div className="highlight-content">
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyHighlights;

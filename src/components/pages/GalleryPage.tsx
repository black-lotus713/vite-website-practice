import './PageStyles.css';

const GalleryPage = () => {
  return (
    <div className="page">
      <h1>Gallery</h1>
      <p className="page-description">
        Browse through our collection of photos showcasing the property and its amenities.
      </p>
      <div className="placeholder-content">
        <p>📸 Gallery page content coming soon...</p>
        <ul>
          <li>Photo grid layout</li>
          <li>Lightbox for full-size images</li>
          <li>Category filtering</li>
          <li>Touch-friendly navigation</li>
        </ul>
      </div>
    </div>
  );
};

export default GalleryPage;

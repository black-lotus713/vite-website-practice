import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../components/pages/HomePage';
import GalleryPage from '../components/pages/GalleryPage';
import AmenitiesPage from '../components/pages/AmenitiesPage';
import LocationPage from '../components/pages/LocationPage';
import ReviewsPage from '../components/pages/ReviewsPage';
import BookPage from '../components/pages/BookPage';
import ContactPage from '../components/pages/ContactPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="amenities" element={<AmenitiesPage />} />
        <Route path="location" element={<LocationPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="book" element={<BookPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

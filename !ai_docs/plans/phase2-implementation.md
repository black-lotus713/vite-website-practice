# Phase 2 Implementation Plan: Architecture & Core Infrastructure

## Overview
This document provides step-by-step implementation instructions for Phase 2 of the Vite website practice project. This phase establishes the routing infrastructure, layout components, and project architecture that will serve as the foundation for all feature development.

---

## Prerequisites
- Node.js v20.19.0+ installed
- Project dependencies installed (`npm install` completed)
- Working development server capability (`npm run dev`)
- Git repository initialized

---

## Implementation Tasks

### Task 1: Install Required Dependencies

**Action**: Install React Router DOM and React Icons packages

**Commands**:
```powershell
npm install react-router-dom
npm install react-icons
```

**Expected Outcome**:
- `react-router-dom` added to package.json dependencies
- `react-icons` added to package.json dependencies
- Both packages installed in node_modules

**Verification**:
- Check package.json has both dependencies listed
- Run `npm list react-router-dom react-icons` to verify installation

---

### Task 2: Set Up Project Directory Structure

**Action**: Create the component directory structure

**Directories to Create**:
```
src/
├── components/
│   ├── layout/
│   ├── pages/
│   ├── features/
│   └── ui/
├── styles/
├── types/
├── utils/
└── routes/
```

**Implementation Steps**:
1. Create `src/components/` directory
2. Create subdirectories: `layout/`, `pages/`, `features/`, `ui/`
3. Create `src/styles/` directory for shared CSS
4. Create `src/types/` directory for TypeScript interfaces
5. Create `src/utils/` directory for helper functions
6. Create `src/routes/` directory for routing configuration

**Expected Outcome**:
- All directories created and visible in workspace
- Project follows organized component architecture

---

### Task 3: Create Routing Configuration

**File**: `src/routes/AppRoutes.tsx`

**Action**: Create the routing configuration component

**Code**:
```tsx
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
```

**Expected Outcome**:
- AppRoutes.tsx created with 7 route definitions
- All routes nested under Layout for consistent page structure

---

### Task 4: Update Main App Component

**File**: `src/App.tsx`

**Action**: Replace the existing App.tsx content with routing setup

**Code**:
```tsx
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
```

**Expected Outcome**:
- App.tsx updated to use React Router
- BrowserRouter wraps entire application
- AppRoutes component integrated

---

### Task 5: Create Layout Component

**File**: `src/components/layout/Layout.tsx`

**Action**: Create the main layout wrapper component

**Code**:
```tsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
```

**File**: `src/components/layout/Layout.css`

**Code**:
```css
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
}
```

**Expected Outcome**:
- Layout component created with Header, Footer, and Outlet
- Flexbox structure ensures footer stays at bottom
- Responsive padding for mobile devices

---

### Task 6: Create Header Component

**File**: `src/components/layout/Header.tsx`

**Action**: Create header with navigation

**Code**:
```tsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import MobileMenu from './MobileMenu';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/amenities', label: 'Amenities' },
    { path: '/location', label: 'Location' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/book', label: 'Book' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Property Name</h1>
        </Link>

        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </header>
  );
};

export default Header;
```

**File**: `src/components/layout/Header.css`

**Code**:
```css
.header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-decoration: none;
  color: #333;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.desktop-nav {
  display: none;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
}

.nav-link:hover {
  color: #333;
}

.nav-link.active {
  color: #007bff;
  border-bottom: 2px solid #007bff;
}

.mobile-menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  padding: 0.5rem;
}

/* Desktop styles */
@media (min-width: 769px) {
  .desktop-nav {
    display: block;
  }

  .mobile-menu-toggle {
    display: none;
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
  }

  .logo h1 {
    font-size: 1.25rem;
  }
}
```

**Expected Outcome**:
- Header component with logo and navigation
- Desktop navigation menu visible on larger screens
- Mobile hamburger icon visible on smaller screens
- Active link highlighting with NavLink
- Sticky header that stays at top when scrolling

---

### Task 7: Create Mobile Menu Component

**File**: `src/components/layout/MobileMenu.tsx`

**Action**: Create mobile slide-out menu

**Code**:
```tsx
import { NavLink } from 'react-router-dom';
import './MobileMenu.css';

interface NavLinkItem {
  path: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLinkItem[];
}

const MobileMenu = ({ isOpen, onClose, navLinks }: MobileMenuProps) => {
  return (
    <>
      <div
        className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
                  }
                  onClick={onClose}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
```

**File**: `src/components/layout/MobileMenu.css`

**Code**:
```css
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 998;
}

.mobile-menu-overlay.active {
  opacity: 1;
  visibility: visible;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 999;
  overflow-y: auto;
}

.mobile-menu.active {
  right: 0;
}

.mobile-nav {
  padding: 2rem 0;
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-nav-list li {
  border-bottom: 1px solid #eee;
}

.mobile-nav-link {
  display: block;
  padding: 1rem 2rem;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.mobile-nav-link:hover {
  background-color: #f5f5f5;
}

.mobile-nav-link.active {
  color: #007bff;
  background-color: #f0f7ff;
  border-left: 4px solid #007bff;
}

/* Hide on desktop */
@media (min-width: 769px) {
  .mobile-menu,
  .mobile-menu-overlay {
    display: none;
  }
}
```

**Expected Outcome**:
- Slide-out mobile menu from right side
- Overlay that closes menu when clicked
- Smooth transitions for opening/closing
- Active link highlighting
- Auto-close when link is clicked

---

### Task 8: Create Footer Component

**File**: `src/components/layout/Footer.tsx`

**Action**: Create footer with links and social media

**Code**:
```tsx
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/amenities">Amenities</Link></li>
            <li><Link to="/location">Location</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Booking</h3>
          <ul className="footer-links">
            <li><Link to="/book">Reserve Now</Link></li>
            <li><Link to="/reviews">Guest Reviews</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="mailto:info@example.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Property Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
```

**File**: `src/components/layout/Footer.css`

**Code**:
```css
.footer {
  background-color: #2c3e50;
  color: #ecf0f1;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.footer-section h3 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #ffffff;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #3498db;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  color: #bdc3c7;
  font-size: 1.5rem;
  transition: color 0.3s ease, transform 0.3s ease;
}

.social-links a:hover {
  color: #3498db;
  transform: translateY(-3px);
}

.footer-bottom {
  border-top: 1px solid #34495e;
  padding: 1.5rem 2rem;
  text-align: center;
}

.footer-bottom p {
  margin: 0;
  color: #95a5a6;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-container {
    padding: 2rem 1rem 1rem;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer-bottom {
    padding: 1rem;
  }
}
```

**Expected Outcome**:
- Footer component with multiple sections
- Quick links to all pages
- Social media icons with hover effects
- Responsive grid layout
- Copyright notice with current year

---

### Task 9: Create Placeholder Page Components

**Action**: Create all 7 page components with placeholder content

#### HomePage Component
**File**: `src/components/pages/HomePage.tsx`

**Code**:
```tsx
import './PageStyles.css';

const HomePage = () => {
  return (
    <div className="page">
      <h1>Welcome to Property Name</h1>
      <p className="page-description">
        Your perfect getaway awaits. Explore our beautiful property and book your stay today.
      </p>
      <div className="placeholder-content">
        <p>🏠 Home page content coming soon...</p>
        <ul>
          <li>Hero section with property image</li>
          <li>Property highlights</li>
          <li>Quick availability checker</li>
          <li>Call-to-action buttons</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
```

#### GalleryPage Component
**File**: `src/components/pages/GalleryPage.tsx`

**Code**:
```tsx
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
```

#### AmenitiesPage Component
**File**: `src/components/pages/AmenitiesPage.tsx`

**Code**:
```tsx
import './PageStyles.css';

const AmenitiesPage = () => {
  return (
    <div className="page">
      <h1>Amenities</h1>
      <p className="page-description">
        Discover all the wonderful amenities and features available at our property.
      </p>
      <div className="placeholder-content">
        <p>✨ Amenities page content coming soon...</p>
        <ul>
          <li>Grid layout with feature cards</li>
          <li>Icons for each amenity</li>
          <li>Detailed descriptions</li>
          <li>High-quality photos</li>
        </ul>
      </div>
    </div>
  );
};

export default AmenitiesPage;
```

#### LocationPage Component
**File**: `src/components/pages/LocationPage.tsx`

**Code**:
```tsx
import './PageStyles.css';

const LocationPage = () => {
  return (
    <div className="page">
      <h1>Location</h1>
      <p className="page-description">
        Explore the neighborhood and discover what's nearby.
      </p>
      <div className="placeholder-content">
        <p>🗺️ Location page content coming soon...</p>
        <ul>
          <li>Interactive map embed</li>
          <li>Neighborhood highlights</li>
          <li>Nearby attractions and distances</li>
          <li>Transportation information</li>
        </ul>
      </div>
    </div>
  );
};

export default LocationPage;
```

#### ReviewsPage Component
**File**: `src/components/pages/ReviewsPage.tsx`

**Code**:
```tsx
import './PageStyles.css';

const ReviewsPage = () => {
  return (
    <div className="page">
      <h1>Guest Reviews</h1>
      <p className="page-description">
        Read what our guests have to say about their experience.
      </p>
      <div className="placeholder-content">
        <p>⭐ Reviews page content coming soon...</p>
        <ul>
          <li>Guest testimonials</li>
          <li>Star ratings</li>
          <li>Review cards with avatars</li>
          <li>Pagination or infinite scroll</li>
        </ul>
      </div>
    </div>
  );
};

export default ReviewsPage;
```

#### BookPage Component
**File**: `src/components/pages/BookPage.tsx`

**Code**:
```tsx
import './PageStyles.css';

const BookPage = () => {
  return (
    <div className="page">
      <h1>Book Your Stay</h1>
      <p className="page-description">
        Check availability and reserve your dates.
      </p>
      <div className="placeholder-content">
        <p>📅 Booking page content coming soon...</p>
        <ul>
          <li>Airbnb calendar widget integration</li>
          <li>Pricing information</li>
          <li>Booking rules and policies</li>
          <li>Direct booking link</li>
        </ul>
      </div>
    </div>
  );
};

export default BookPage;
```

#### ContactPage Component
**File**: `src/components/pages/ContactPage.tsx`

**Code**:
```tsx
import './PageStyles.css';

const ContactPage = () => {
  return (
    <div className="page">
      <h1>Contact Us</h1>
      <p className="page-description">
        Get in touch with us for any questions or inquiries.
      </p>
      <div className="placeholder-content">
        <p>✉️ Contact page content coming soon...</p>
        <ul>
          <li>Contact form with validation</li>
          <li>Property owner information</li>
          <li>Social media links</li>
          <li>FAQ section</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactPage;
```

#### Shared Page Styles
**File**: `src/components/pages/PageStyles.css`

**Code**:
```css
.page {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.page-description {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.placeholder-content {
  background-color: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  padding: 2rem;
  margin-top: 2rem;
}

.placeholder-content p {
  font-size: 1.1rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 1rem;
}

.placeholder-content ul {
  list-style: none;
  padding-left: 0;
}

.placeholder-content ul li {
  padding: 0.5rem 0;
  color: #6c757d;
}

.placeholder-content ul li::before {
  content: "→ ";
  color: #007bff;
  font-weight: bold;
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .page h1 {
    font-size: 2rem;
  }

  .page-description {
    font-size: 1rem;
  }

  .placeholder-content {
    padding: 1.5rem;
  }
}
```

**Expected Outcome**:
- All 7 page components created with placeholder content
- Each page has a clear description of planned features
- Consistent styling across all pages
- Fade-in animation when navigating to pages

---

### Task 10: Update Global Styles

**File**: `src/index.css`

**Action**: Update with consistent base styles and CSS variables

**Code to Add/Update**:
```css
:root {
  /* Color Palette */
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --background-color: #ffffff;
  --text-color: #333333;
  --text-light: #666666;
  --border-color: #dee2e6;
  --shadow-color: rgba(0, 0, 0, 0.1);

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;

  /* Typography */
  --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.6;

  /* Breakpoints (for reference in media queries) */
  --breakpoint-mobile: 768px;
  --breakpoint-tablet: 1024px;
  --breakpoint-desktop: 1200px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--text-color);
  background-color: var(--background-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.2;
  font-weight: 700;
}

a {
  color: var(--primary-color);
  transition: color 0.3s ease;
}

a:hover {
  color: #0056b3;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

button {
  font-family: inherit;
  cursor: pointer;
}

/* Utility classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.text-center {
  text-align: center;
}

.mt-1 { margin-top: var(--spacing-sm); }
.mt-2 { margin-top: var(--spacing-md); }
.mt-3 { margin-top: var(--spacing-lg); }

.mb-1 { margin-bottom: var(--spacing-sm); }
.mb-2 { margin-bottom: var(--spacing-md); }
.mb-3 { margin-bottom: var(--spacing-lg); }
```

**Expected Outcome**:
- CSS variables defined for consistent theming
- Reset styles applied
- Base typography styles
- Utility classes for common patterns

---

### Task 11: Update App.css

**File**: `src/App.css`

**Action**: Clean up starter content and add minimal app-level styles

**Code**:
```css
#root {
  width: 100%;
  min-height: 100vh;
}

/* Remove default Vite starter styles if present */
/* Keep this file minimal as most styles are component-scoped */
```

**Expected Outcome**:
- Clean App.css file
- Minimal app-level styles
- Ready for component-specific styling

---

### Task 12: Test Navigation and Routing

**Action**: Manual testing of the complete routing system

**Testing Steps**:
1. Start development server with `npm run dev`
2. Open browser to localhost (typically http://localhost:5173)
3. Test desktop navigation:
   - Click each navigation link in header
   - Verify page transitions work smoothly
   - Check that active link highlighting works
   - Verify URL changes correctly
4. Test mobile navigation:
   - Resize browser to mobile width (<768px)
   - Click hamburger menu icon
   - Verify menu slides in from right
   - Click navigation links
   - Verify menu closes after clicking link
   - Click overlay to close menu
5. Test footer links:
   - Click footer navigation links
   - Verify they navigate correctly
   - Test social media links (they should open in new tab)
6. Test browser back/forward buttons
7. Test direct URL navigation (type URLs manually)

**Expected Behavior**:
- All 7 pages load correctly
- Navigation is smooth without page refresh
- Active links are highlighted
- Mobile menu opens/closes properly
- No console errors
- Header stays sticky on scroll
- Footer appears at bottom

---

### Task 13: Verify TypeScript Compilation

**Action**: Ensure no TypeScript errors exist

**Commands**:
```powershell
npm run build
```

**Expected Outcome**:
- Build completes successfully
- No TypeScript errors
- No ESLint errors
- Build files generated in `dist/` directory

**If Errors Occur**:
- Read error messages carefully
- Fix type definitions
- Ensure all imports are correct
- Verify component props interfaces

---

### Task 14: Create TypeScript Type Definitions

**File**: `src/types/index.ts`

**Action**: Create shared TypeScript interfaces

**Code**:
```typescript
// Navigation types
export interface NavLinkItem {
  path: string;
  label: string;
}

// Component prop types will be added here as needed
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Page types
export interface PageProps extends BaseComponentProps {
  title?: string;
}
```

**Expected Outcome**:
- Centralized type definitions
- Reusable interfaces across components
- Better TypeScript support and IDE autocomplete

---

## Post-Implementation Checklist

After completing all tasks, verify the following:

- [ ] All dependencies installed successfully
- [ ] Directory structure matches specification
- [ ] All 7 page components created
- [ ] Layout, Header, Footer, and MobileMenu components implemented
- [ ] Routing configuration complete
- [ ] Desktop navigation works on screens >768px
- [ ] Mobile menu works on screens <768px
- [ ] Active link highlighting functions correctly
- [ ] All links navigate properly
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] Responsive design works across breakpoints
- [ ] Development server runs without issues
- [ ] Build command completes successfully

---

## Success Criteria

**Phase 2 is complete when:**

1. ✅ All dependencies are installed (react-router-dom, react-icons)
2. ✅ Project directory structure is organized and complete
3. ✅ Routing system is fully functional with 7 routes
4. ✅ Layout component wraps all pages consistently
5. ✅ Header component has working desktop navigation
6. ✅ Mobile menu slides in/out correctly with overlay
7. ✅ Footer component displays on all pages
8. ✅ All 7 placeholder pages are created and accessible
9. ✅ Navigation between pages works without page refresh
10. ✅ Active link highlighting works on both desktop and mobile
11. ✅ TypeScript compilation has no errors
12. ✅ Development server runs without errors
13. ✅ Responsive design works on mobile, tablet, and desktop
14. ✅ All CSS is component-scoped and organized

---

## Common Issues and Solutions

### Issue 1: React Router imports not found
**Solution**: Ensure `react-router-dom` is installed. Run `npm install react-router-dom`

### Issue 2: React Icons not displaying
**Solution**: Verify `react-icons` is installed. Check import statements are correct (e.g., `import { FaBars } from 'react-icons/fa'`)

### Issue 3: Mobile menu doesn't slide in
**Solution**: Check that CSS transition properties are applied and `active` class toggles correctly

### Issue 4: Active link highlighting not working
**Solution**: Ensure using `NavLink` component from react-router-dom with `isActive` callback

### Issue 5: Pages show blank/white screen
**Solution**: Check browser console for errors. Verify all components are exported as default and imported correctly

### Issue 6: TypeScript errors about missing types
**Solution**: Install type definitions: `npm install --save-dev @types/react-router-dom`

---

## Next Steps

After Phase 2 completion:
1. Commit all changes to Git
2. Push to GitHub repository
3. Proceed to Phase 3: Feature Development
4. Begin implementing Home page and Gallery features

---

## Notes for AI Agent

**Important Considerations:**

1. **File Creation Order**: Create files in the order listed to avoid import errors
2. **Code Accuracy**: Copy code exactly as written, including all imports and CSS
3. **Testing**: Test after each major component is created, not just at the end
4. **Error Handling**: If errors occur, read them carefully and fix before proceeding
5. **Responsive Design**: Always test on multiple screen sizes
6. **Browser DevTools**: Use browser console to verify no runtime errors
7. **Hot Module Replacement**: Vite's HMR should reflect changes immediately

**Verification Commands:**
- `npm run dev` - Start development server
- `npm run build` - Test production build
- `npm run preview` - Preview production build locally

**Key Files Summary:**
- Routing: `App.tsx`, `AppRoutes.tsx`
- Layout: `Layout.tsx`, `Header.tsx`, `Footer.tsx`, `MobileMenu.tsx`
- Pages: 7 page components in `components/pages/`
- Styles: Component-specific CSS files + `index.css` for globals

**Performance Note:**
All routing is client-side using React Router, so navigation is instant without page refreshes. This provides an SPA (Single Page Application) experience.

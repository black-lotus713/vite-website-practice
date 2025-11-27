# Vite Website Practice - Project Plan

## Project Overview

A modern, responsive personal website built with React, TypeScript, and Vite, showcasing a rental property with integrated booking capabilities. This project serves as a practice exercise for building production-ready websites with modern web technologies.

### Project Details
- **Project Type**: Vite website project
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (v5.x)
- **Deployment**: Netlify
- **Purpose**: Personal website practice with real-world features

---

## Site Structure (Multi-page Application)

#### Pages Overview
1. **Home** (`/`)
   - Hero section with background image
   - Property overview and highlights
   - Quick availability checker widget
   - Call-to-action buttons

2. **Gallery** (`/gallery`)
   - Photo grid/masonry layout
   - Lightbox/modal for full-size images
   - Categories (exterior, interior, amenities, etc.)
   - Touch-friendly navigation

3. **Amenities** (`/amenities`)
   - Grid layout with feature cards
   - Icons for each amenity
   - Detailed descriptions
   - High-quality photos

4. **Location** (`/location`)
   - Interactive map embed (Google Maps/Mapbox)
   - Neighborhood highlights
   - Nearby attractions and distances
   - Transportation information

5. **Reviews** (`/reviews`)
   - Mock guest testimonials
   - Star ratings
   - Review cards with avatars
   - Pagination or infinite scroll

6. **Book/Reserve** (`/book`)
   - Generic calendar widget with iCal integration
   - Import availability from Airbnb and VRBO iCal feeds
   - Pricing information
   - Booking rules and policies
   - Links to booking platforms

7. **Contact** (`/contact`)
   - Contact form with validation
   - Property owner information
   - Social media links
   - FAQ section
   - **Email Configuration**: Forms will submit to `architect@pulseroi.com` but this email will not be exposed in the UI as a contact reference

### Data Integration Overview
- **Shared Types**: `src/types/index.ts` defines the contracts (`PropertyInfo`, `HostInfo`, `HouseRules`, `Amenities`, `Review`, `ReviewSummary`, `LocationDetails`, etc.) that every page should consume. No feature work is “done” until it uses these types instead of inline shapes.
- **Structured Data Modules**: `src/data/propertyData.ts`, `src/data/amenities.ts`, and `src/data/reviews.ts` source the Airbnb scrape results. These feed page content, cards, and widgets so we avoid placeholder copy.
- **Consumption Pattern**: Pages and feature components import the relevant module(s) through typed selectors/utilities. This keeps UI logic thin: render data, don’t recreate it. Any helper logic (grouping amenities, formatting ratings, selecting highlights) lives in `src/utils`.
- **Data-driven Layouts**: Layout elements (global facts strip, CTAs, summary panels) must read from the modules so updates to the scrape data automatically propagate across Home, Book, Amenities, Location, Reviews, and Contact pages.

### Tech Stack

#### Core Technologies
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing

#### Dependencies to Install
```json
{
  "dependencies": {
    "react-router-dom": "^6.x",
    "react-icons": "^5.x"
  },
  "devDependencies": {
    "@types/react-router-dom": "^5.x"
  }
}
```

#### Styling Approach
- CSS Modules or vanilla CSS
- Mobile-first responsive design
- CSS Grid and Flexbox
- CSS variables for theming

#### Third-Party Integrations
- Generic calendar widget with iCal feed support
- Airbnb and VRBO iCal calendar synchronization
- Google Maps or Mapbox API
- Form validation library (optional)

---

## Component Architecture

### Layout Components
- `Layout.tsx` - Main layout wrapper; pulls global facts (capacity, rules summary) from `propertyData` to render a persistent strip.
- `Header.tsx` - Navigation header with quick links to data-driven sections (gallery, amenities, book).
- `MobileMenu.tsx` - Mobile hamburger menu sharing the same nav data as `Header`.
- `Footer.tsx` - Footer with links and social media; can echo host/contact info from `propertyData.host`.

### Page Components
- `HomePage.tsx` - Landing page consuming `propertyData` highlights, hero basics, and CTA copy plus featured amenities.
- `GalleryPage.tsx` - Photo gallery backed by `propertyImages` (already implemented) and future metadata in `propertyData`.
- `AmenitiesPage.tsx` - Amenities showcase rendering grouped lists from `amenities` via helper utilities.
- `LocationPage.tsx` - Location and map using `propertyData.locationDetails` for attractions and travel notes.
- `ReviewsPage.tsx` - Guest reviews showing `reviews.summary` and mapping `reviews.items` into UI components.
- `BookPage.tsx` - Booking/reservation page presenting house rules and booking CTAs sourced from `propertyData`.
- `ContactPage.tsx` - Contact form plus host info drawn from `propertyData.host`.

### Feature Components
- `Hero.tsx` - Hero section with CTA populated by `propertyData.propertyInfo`.
- `AvailabilityChecker.tsx` - Quick date checker widget highlighting rules (min nights, check-in/out) from `propertyData.houseRules`.
- `ImageGallery.tsx` - Gallery grid component using `propertyImages` data.
- `Lightbox.tsx` - Image modal viewer fed by `propertyImages`.
- `AmenityCard.tsx` - Individual amenity card capable of rendering amenity category + icon from `amenities` utilities.
- `Map.tsx` - Map embed component receiving coordinates and nearby attractions from `propertyData.locationDetails`.
- `ReviewCard.tsx` - Individual review card typed with `Review` and showing provenance from `reviews`.
- `ContactForm.tsx` - Contact form with validation; success content can reference host data.
- `BookingWidget.tsx` - Generic calendar widget with iCal integration for Airbnb/VRBO availability, plus highlight stats from `propertyData.propertyInfo` and `houseRules`.

### Shared/UI Components
- `Button.tsx` - Reusable button component
- `Card.tsx` - Card container component
- `Modal.tsx` - Modal/dialog component
- `Spinner.tsx` - Loading spinner
- `Icon.tsx` - Icon wrapper component
- `HighlightCard.tsx` - Generic stat/highlight block for property facts, reused on Home and Book pages with `propertyData` entries.
- `StatsStrip.tsx` - Always-on facts strip (capacity, pets, check-in/out) that lives in Layout and reads from `propertyData.houseRules`.

---

## Development Guidelines

### Code Standards
- Use TypeScript strict mode
- Follow React best practices (hooks, functional components)
- Component composition over inheritance
- Props interfaces for all components
- Meaningful component and variable names

### Data & Utils
- Keep scraped content in `src/data/*.ts` modules only; components import from these sources rather than duplicating strings.
- Extend `src/types/index.ts` first whenever data structures change, then update modules + components to match.
- Centralize derived logic (amenity grouping, rating formatting, CTA copy selectors) inside `src/utils` to keep components declarative.
- Ensure helpers accept typed inputs/outputs so linting catches mismatches early.
- When sharing snippets (e.g., house rules) across pages, expose selector functions rather than duplicating object traversal.

### File Organization
```
src/
├── components/
│   ├── layout/
│   ├── pages/
│   ├── features/
│   └── ui/
├── styles/
├── assets/
│   └── images/
├── types/
├── utils/
└── routes/
```

### Performance Targets
- Lighthouse score: 90+ across all metrics
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Bundle size: Keep minimal

---

## Design Guidelines

### Color Scheme
- Primary: To be defined (suggest warm, inviting tones)
- Secondary: Complementary accent color
- Background: Light, airy colors
- Text: High contrast for readability

### Typography
- Headings: Modern sans-serif (e.g., Inter, Poppins)
- Body: Readable font with good spacing
- Font sizes: Responsive scale

### Spacing & Layout
- Consistent padding/margins
- White space for breathing room
- Maximum content width (e.g., 1200px)
- Grid system for alignment

### Imagery
- High-quality photos
- Consistent aspect ratios
- Optimized file sizes (WebP format)
- Alt text for accessibility

### Page-specific Layout Notes
- **Home & Book**: Prioritize reusable highlight/stat cards fed by `propertyData` (capacity, boat slip, kayaks) plus house-rule callouts near booking CTAs.
- **Amenities**: Present grouped lists (accordion or grid) that mirror amenity categories; consider iconography per group to keep long lists scannable.
- **Reviews**: Reserve space for a summary module (overall + category ratings) alongside a vertically stacked review list.
- **Location**: Include a structured “Nearby attractions” grid/table that reads from `LocationDetails`, paired with the map embed.
- **Global Layout**: Provide an always-visible facts strip (guests, bedrooms, pet policy, check-in/out) so scraped house rules show beyond the Book page.

---

## Implementation Roadmap

### Sprint 1: Routing & Layout (Week 1)
- [ ] Install React Router DOM
- [ ] Set up routing configuration
- [ ] Create Layout component
- [ ] Implement Header with navigation
- [ ] Create Footer component
- [ ] Build mobile menu with hamburger icon
- [ ] Add active link highlighting
- [ ] Test navigation between pages

### Sprint 2: Home & Gallery Pages (Week 1-2)
- [ ] Design and implement Hero component
- [ ] Create home page layout
- [ ] Add availability checker widget UI
- [ ] Source/create placeholder images
- [ ] Build Gallery page with grid layout
- [ ] Implement Lightbox component
- [ ] Add image lazy loading
- [ ] Make gallery touch-friendly

### Sprint 3: Amenities & Location (Week 2)
- [ ] Extend `src/types/index.ts` with `Amenities`, `LocationDetails`, helper enums for grouping.
- [ ] Create `src/data/propertyData.ts` (location basics) and `src/data/amenities.ts` (categorized items) from scrape results.
- [ ] Design amenity card component using typed amenity entries + icons.
- [ ] Add icons (react-icons) mapped per amenity category.
- [ ] Create amenities grid/accordion layout fed directly from the data module.
- [ ] Implement location page layout that consumes `propertyData.locationDetails` and nearby attractions.
- [ ] Integrate map embed (Google Maps/Mapbox) and keep markers in sync with data.
- [ ] Add neighborhood information section + travel times referencing `LocationDetails`.
- [ ] List nearby attractions using structured data, no hard-coded strings.
- [ ] Make map responsive.
- **Acceptance**: `AmenitiesPage`/`LocationPage` read only from data modules; updating the JSON-like files updates the UI with no code changes.

### Sprint 4: Reviews & Booking (Week 3)
- [ ] Finalize `Review` + `ReviewSummary` types in `src/types/index.ts`.
- [ ] Build `src/data/reviews.ts` with summary stats, six reviews, and provenance metadata.
- [ ] Create ReviewCard component typed with `Review`.
- [ ] Design star rating component and helper formatter (e.g., `formatRating` in `src/utils/reviews.ts`).
- [ ] Implement reviews summary panel + list layout pulling directly from the reviews module.
- [ ] Research generic calendar widget libraries (e.g., FullCalendar, react-big-calendar, react-calendar).
- [ ] Implement iCal feed parser/fetcher for Airbnb and VRBO availability.
- [ ] Create booking page layout that reads `propertyData.houseRules`, highlights, and CTA copy.
- [ ] Integrate generic calendar widget displaying merged availability from multiple iCal sources.
- [ ] Add booking policies section sourced from `houseRules`.
- [ ] Include links to Airbnb and VRBO listing pages for direct booking.
- **Acceptance**: Reviews page renders summary + list from data file; Book page shows calendar with combined iCal availability plus stats/rules from shared modules with no placeholder text.

### Sprint 5: Contact & Forms (Week 3)
- [ ] Design contact form layout.
- [ ] Implement form validation.
- [ ] Add error messages and states.
- [ ] Create success message.
- [ ] Configure form submission to send emails to `architect@pulseroi.com` (do not expose this email in the UI).
- [ ] Add FAQ section, including automated answers driven by `propertyData.houseRules` (pets, quiet hours, parking).
- [ ] Include social media + host contact links sourced from `propertyData.host`.
- [ ] Set up form submission (mock or real).
- [ ] Add a reusable Contact/Host info component so Layout/Footer pull from the same source of truth.
- **Acceptance**: Contact page and footer reference `propertyData.host`; FAQs reference `houseRules` data; form submissions routed to `architect@pulseroi.com` without displaying the email publicly.

### Sprint 6: Polish & Optimization (Week 4)
- [ ] Add loading states
- [ ] Optimize images
- [ ] Test responsive design on all breakpoints
- [ ] Add animations and transitions
- [ ] Improve accessibility (ARIA labels, focus states)
- [ ] SEO optimization (meta tags, titles)
- [ ] Cross-browser testing
- [ ] Performance audit (Lighthouse)

---

## Deployment Phases

### Phase 1: Project Setup & Foundation ✅

**Status**: Complete

**Objectives**: 
- Set up development environment
- Initialize project structure
- Configure tooling and deployment pipeline

**Tasks Completed**:
- [x] Node.js v20.19.0+ environment verified
- [x] Project scaffolded with `npx create-vite@latest`
- [x] Dependencies installed (`npm install`)
- [x] Git repository initialized
- [x] GitHub repository created (vite-website-practice)
- [x] Netlify configuration file created (`netlify.toml`)
- [x] ESLint configured
- [x] TypeScript configured
- [x] VS Code workspace configured

**Deliverables**:
- ✅ Working development environment
- ✅ Project skeleton with Vite + React + TypeScript
- ✅ Version control setup
- ✅ Deployment configuration ready

---

### Phase 2: Architecture & Core Infrastructure ✅

**Status**: Complete

**Objectives**:
- Set up routing infrastructure
- Create base layout components
- Establish component architecture
- Install core dependencies

**Tasks**:
- [x] Install React Router DOM (`npm install react-router-dom`)
- [x] Install React Icons (`npm install react-icons`)
- [x] Set up routing configuration in `App.tsx`
- [x] Create Layout component structure
- [x] Build Header component with navigation
- [x] Build Footer component
- [x] Implement mobile menu component
- [x] Create placeholder page components
- [x] Test navigation between all pages
- [x] Set up CSS structure (modules/variables)

**Deliverables**:
- ✅ Fully functional routing system
- ✅ Reusable layout components
- ✅ Navigation working on all devices
- ✅ Project structure ready for feature development

---

### Phase 3: Feature Development 📋

**Status**: In Progress (Gallery Complete)

**Objectives**:
- Build all page components
- Implement key features (gallery, forms, booking)
- Integrate third-party services
- Create reusable UI components

**Completed Work**:
- ✅ Gallery page with 60+ property images from Airbnb listing
- ✅ Category-based filtering system
- ✅ Responsive grid layout with hover effects
- ✅ Lightbox modal for full-size image viewing
- ✅ Image lazy loading for performance
- ✅ TypeScript data structure for property images

**Tasks**:

#### Sprint 1: Home & Gallery (Week 1-2) ✅ COMPLETE
- [x] Design and implement Hero component
- [x] Create home page layout with property highlights
- [x] Build availability checker widget UI
- [x] Source property images from Airbnb listing (60+ images)
- [x] Create property images data structure with TypeScript interfaces
- [x] Build Gallery page with responsive grid layout
- [x] Implement category filtering (Living Room, Kitchen, Bedrooms, Bathrooms, Outdoor, Exterior, Activities)
- [x] Implement Lightbox modal component for full-size image viewing
- [x] Add image lazy loading for performance optimization
- [x] Add hover effects and caption overlays
- [x] Make gallery touch-friendly for mobile devices

#### Sprint 2: Amenities & Location (Week 2) ✅ COMPLETE
- [x] Extend `src/types/index.ts` with `Amenities`, `LocationDetails`, and enums for grouping.
- [x] Convert scrape data into `src/data/propertyData.ts` (location slice) and `src/data/amenities.ts`.
- [x] Design amenity card component + icons powered by the data file.
- [x] Create a grouped grid/accordion layout that maps over categorized amenities.
- [x] Implement location page layout.
- [x] Integrate map embed (Google Maps or Mapbox) syncing with `LocationDetails` entries.
- [x] Add neighborhood information section including travel times from data file.
- [x] List nearby attractions with distances sourced from `LocationDetails`.
- [x] Make map responsive on all devices.
- **Definition of Done**: Amenities & Location pages render entirely from the typed data modules (no hard-coded strings).

#### Sprint 3: Reviews & Booking (Week 3)
- [ ] Define `Review` and `ReviewSummary` types.
- [ ] Create `src/data/reviews.ts` with summary + 6 reviews + provenance metadata.
- [ ] Create ReviewCard component.
- [ ] Design star rating + helper utilities (formatting averages, category scores).
- [ ] Implement reviews grid/list layout fed by the data file.
- [ ] Research generic calendar widget libraries (e.g., FullCalendar, react-big-calendar)
- [ ] Implement iCal feed parser for Airbnb and VRBO availability data
- [ ] Create booking page layout.
- [ ] Integrate generic calendar widget with merged iCal data
- [ ] Add booking policies and rules section populated from `propertyData.houseRules` and highlights.
- [ ] Add links to Airbnb and VRBO listing pages for direct booking
- **Definition of Done**: Reviews & Book pages pull all copy/stats from data modules; calendar displays combined availability from multiple iCal sources.

#### Sprint 4: Contact & Forms (Week 3)
- [ ] Design contact form layout.
- [ ] Implement client-side form validation.
- [ ] Add error messages and input states.
- [ ] Create success/failure message displays.
- [ ] Configure form submission to `architect@pulseroi.com` (backend/email service integration - email address should NOT be exposed in UI).
- [ ] Add FAQ section to contact page referencing `propertyData.houseRules` answers (pets, quiet hours, parking, check-in/out).
- [ ] Include social media + host contact links from `propertyData.host`.
- [ ] Set up form submission handler.
- [ ] Share host/facts data with Footer + Layout for consistency.
- **Definition of Done**: Contact + footer use shared host data; FAQs mirror `houseRules` content; form emails are sent to `architect@pulseroi.com` without exposing the email address publicly.

**Deliverables**:
- 📦 All 7 pages fully functional
- 📦 Working gallery with lightbox
- 📦 Contact form with validation
- 📦 Booking widget integrated
- 📦 Location map embedded

---

### Phase 4: Polish & Optimization 🎨

**Status**: Not Started

**Objectives**:
- Optimize performance
- Ensure responsive design
- Improve accessibility
- Add polish and animations
- Cross-browser testing

**Tasks**:
- [ ] Add loading states for async operations
- [ ] Optimize all images (compression, WebP format)
- [ ] Test responsive design on all breakpoints (mobile/tablet/desktop)
- [ ] Add smooth animations and transitions
- [ ] Improve accessibility (ARIA labels, keyboard navigation, focus states)
- [ ] SEO optimization (meta tags, titles, descriptions)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Run Lighthouse performance audit
- [ ] Fix all ESLint warnings and errors
- [ ] Code review and refactoring

**Deliverables**:
- 📦 Lighthouse score 90+ across all metrics
- 📦 Fully responsive on all devices
- 📦 Accessible to screen readers
- 📦 Smooth user experience with animations
- 📦 SEO-optimized pages

---

### Phase 5: Deployment & Launch 🚀

**Status**: Not Started

**Objectives**:
- Deploy to production
- Verify deployment
- Set up continuous deployment
- Monitor and maintain

**Pre-deployment Checklist
- [ ] Run production build (`npm run build`)
- [ ] Test production build locally (`npm run preview`)
- [ ] Fix all ESLint warnings
- [ ] Update README with project info
- [ ] Add environment variables (if needed)
- [ ] Verify all images load correctly
- [ ] Test all links and navigation

### Netlify Deployment
- [ ] Connect GitHub repository to Netlify
- [ ] Verify `netlify.toml` configuration
- [ ] Configure build settings in Netlify dashboard
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS
- [ ] Test deployed site
- [ ] Set up continuous deployment

### Post-Launch Tasks
- [ ] Monitor Netlify deployment logs
- [ ] Test all functionality on live site
- [ ] Monitor performance metrics (Core Web Vitals)
- [ ] Gather feedback from users
- [ ] Create GitHub issues for improvements
- [ ] Plan future enhancements

**Deliverables**:
- 📦 Live website on Netlify
- 📦 Custom domain configured (optional)
- 📦 HTTPS enabled
- 📦 Continuous deployment active
- 📦 Monitoring in place

---

## Key Features Summary

### Navigation
- ✅ Multi-page routing with React Router
- ✅ Responsive navigation header
- ✅ Mobile hamburger menu
- ✅ Smooth scrolling and transitions
- ✅ Footer with sitemap links

### Home Page
- ✅ Eye-catching hero section
- ✅ Property highlights
- ✅ Quick availability checker
- ✅ Clear call-to-action buttons

### Gallery
- ✅ Responsive grid layout (auto-adjusts to screen size)
- ✅ Lightbox for full-screen viewing with close button
- ✅ Image lazy loading for performance
- ✅ Touch/swipe gestures support
- ✅ Category filtering (8 categories: Living Room, Kitchen, Dining Area, Bedrooms, Bathrooms, Outdoor, Exterior, Activities, Additional)
- ✅ 60+ high-quality images from Airbnb listing
- ✅ Hover effects with caption overlays
- ✅ TypeScript-based data structure

### Booking Integration
- ✅ Generic calendar widget with iCal feed support
- ✅ Airbnb and VRBO calendar synchronization
- ✅ Availability checker widget on homepage
- ✅ Links to booking platforms
- ✅ Pricing information display

### Contact Form
- ✅ Input validation
- ✅ Error handling
- ✅ Success/failure messages
- ✅ Responsive design

### Technical Excellence
- ✅ TypeScript for type safety
- ✅ Responsive design (mobile-first)
- ✅ Performance optimized
- ✅ SEO friendly
- ✅ Accessibility compliant
- ✅ Cross-browser compatible

---

## Testing Strategy

### Manual Testing
- [ ] All navigation links work
- [ ] Forms validate correctly
- [ ] Images load properly
- [ ] Mobile menu functions
- [ ] Lightbox opens/closes
- [ ] Map is interactive
- [ ] Booking widget displays
- [ ] Data modules (`propertyData`, `amenities`, `reviews`) import without runtime errors and drive the corresponding pages end-to-end
- [ ] Review provenance (`source`, `importedAt`) surfaces in the UI so users know data origin

### Responsive Testing
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large screens (1440px+)

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## Future Enhancements

### V2 Features
- Real backend integration
- User authentication
- Admin dashboard
- Booking management system
- Email notifications
- Multi-language support
- Blog section
- Analytics integration

### Technical Improvements
- Add testing (Jest, React Testing Library)
- Implement state management (if needed)
- PWA capabilities
- Server-side rendering (Next.js migration)
- Advanced animations (Framer Motion)

---

## Resources & References

### Documentation
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Netlify Documentation](https://docs.netlify.com/)

### Design Inspiration
- [Airbnb](https://www.airbnb.com/)
- [Dribbble](https://dribbble.com/search/rental-property-website)
- [Awwwards](https://www.awwwards.com/)

### Tools
- [Unsplash](https://unsplash.com/) - Free stock photos
- [React Icons](https://react-icons.github.io/react-icons/)
- [Google Fonts](https://fonts.google.com/)
- [Can I Use](https://caniuse.com/) - Browser compatibility

---

## Project Timeline

**Total Duration**: 4 weeks

- **Week 1**: Setup + Routing + Layout + Home/Gallery
- **Week 2**: Amenities + Location + Reviews
- **Week 3**: Booking + Contact + Forms
- **Week 4**: Polish + Testing + Deployment

---

## Success Metrics

- ✅ All 7 pages fully functional
- ✅ Mobile-responsive on all devices
- ✅ Lighthouse score 90+ on all metrics
- ✅ Successfully deployed to Netlify
- ✅ Forms working with validation
- ✅ Booking widget integrated
- ✅ Zero console errors
- ✅ Clean, maintainable code

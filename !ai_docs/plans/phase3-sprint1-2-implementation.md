# Phase 3: Sprint 1 & 2 Implementation Plan

## Document Purpose
This document provides detailed, step-by-step instructions for an AI agent to complete **Sprint 1 (Home & Gallery)** and **Sprint 2 (Amenities & Location)** of Phase 3 in the Vite website practice project.

---

## Prerequisites

### Environment Requirements
- Node.js v20.19.0+ installed and verified
- All dependencies installed (`npm install` completed successfully)
- Development server can run (`npm run dev` works without errors)
- Build process works (`npm run build` completes successfully)

### Project Status Check
Before starting, verify the following are complete:
- ✅ Phase 1: Project Setup & Foundation (Complete)
- ✅ Phase 2: Architecture & Core Infrastructure (Complete)
- ✅ React Router DOM installed
- ✅ React Icons installed
- ✅ Layout components created (Header, Footer, MobileMenu, Layout)
- ✅ All 7 page placeholder components created
- ✅ Navigation working on desktop and mobile
- ✅ Gallery page with 60+ images already implemented

### Files Already Implemented
- `src/types/index.ts` - Basic types (NavLinkItem, BaseComponentProps, PageProps)
- `src/data/propertyImages.ts` - 60+ property images with categories
- `src/components/layout/` - All layout components
- `src/components/pages/` - All 7 placeholder page components
- Gallery page fully functional with filtering and lightbox

---

## Project Context

### Property Information
- **Property Name**: Pelican's Place
- **Location**: Corpus Christi, Texas (Laguna Madre Bay waterfront)
- **Type**: Vacation rental home
- **Airbnb URL**: https://www.airbnb.com/h/pelicansplace
- **Host**: Gordon (Superhost, 4.88 rating, 41 reviews)

### Data Source
All implementation data is extracted from the live Airbnb listing and documented in:
- `!ai_docs/data-extraction-results.md` (12 sections of structured data)
- `!ai_docs/scrape-results-implementation-context.md` (Implementation guidelines)

### Key Project Principle
**Data-Driven Development**: All content must come from structured data files. NO hard-coded strings in components. Components import from `src/data/` modules and render dynamically.

---

## Sprint 1: Home & Gallery (Remaining Tasks)

### Sprint 1 Overview
The Gallery page is already complete. Sprint 1 focuses on completing the Home page with data-driven components.

**Status**: Gallery ✅ Complete | Home ⏳ In Progress

---

### Task 1.1: Define Core TypeScript Interfaces

**File**: `src/types/index.ts`

**Objective**: Add comprehensive type definitions for all property data

**Action**: Add the following interfaces to the existing file (after the current interfaces):

```typescript
// Property Information Types
export interface PropertyInfo {
  title: string;
  subtitle?: string;
  location: string;
  description: string;
  capacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
}

// Property Highlights
export interface Highlight {
  title: string;
  description: string;
  icon?: string;
}

// Host Information
export interface HostInfo {
  name: string;
  status: string;
  yearsHosting: number;
  overallRating: number;
  totalReviews: number;
  guestFavorite: boolean;
}

// Location Details
export interface LocationDetails {
  city: string;
  state: string;
  country: string;
  area: string;
  nearbyAttractions: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// House Rules
export interface HouseRules {
  checkIn: string;
  checkOut: string;
  checkInMethod: string;
  duringYourStay: {
    maxGuests: number;
    petsAllowed: boolean;
    maxPets?: number;
    quietHours: string;
    restrictions: string[];
  };
  additionalRules: string[];
  beforeYouLeave: string[];
  cleaningNote?: string;
}

// Amenities Structure
export interface AmenityItem {
  name: string;
  available: boolean;
  icon?: string;
}

export interface Amenities {
  bathroom: AmenityItem[];
  bedroomAndLaundry: AmenityItem[];
  entertainment: AmenityItem[];
  heatingAndCooling: AmenityItem[];
  homeSafety: AmenityItem[];
  internetAndOffice: AmenityItem[];
  kitchenAndDining: AmenityItem[];
  locationFeatures: AmenityItem[];
  outdoor: AmenityItem[];
  parkingAndFacilities: AmenityItem[];
  services: AmenityItem[];
}

export type AmenityCategory = keyof Amenities;

// Reviews Types
export interface Review {
  author: string;
  location: string;
  rating: number;
  date: string;
  stayDetails: string;
  text: string;
  source: string;
  importedAt?: string;
}

export interface ReviewSummary {
  overallRating: number;
  totalReviews: number;
  categoryRatings: {
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
  };
}

// Complete Property Data Structure
export interface PropertyData {
  propertyInfo: PropertyInfo;
  highlights: Highlight[];
  host: HostInfo;
  locationDetails: LocationDetails;
  houseRules: HouseRules;
}
```

**Expected Outcome**:
- All interfaces added to `src/types/index.ts`
- No TypeScript compilation errors
- Types available for import across the project

**Verification**:
```powershell
npm run build
```
Should complete without errors.

---

### Task 1.2: Create Property Data Module

**File**: `src/data/propertyData.ts`

**Objective**: Create the main property data file with all information from the Airbnb extraction

**Action**: Create a new file with the following content:

```typescript
import type { PropertyData } from '../types';

export const propertyData: PropertyData = {
  propertyInfo: {
    title: "Beach|Relax|Kayak|Nature|FishLight|Waterfront",
    subtitle: "Pelican's Place",
    location: "Corpus Christi, Texas, United States",
    description: `Beautiful waterfront home ideally located at the edge of the Laguna Madre Bay. Quiet getaway near nature and wildlife. Close to beach and local attractions but nestled in a peaceful location.

6 minutes to Whitecap Beach! 13 minutes to National Seashore! Less than 30 minutes to Port Aransas or airport.

Boat slip and nearby launch gets you on the bay in minutes. Fish from dock/multiple nearby spots. 2 Kayaks available.

2 dedicated workspaces and strong WIFI for remote workers or students.

The space
Large master bedroom with new king-size bedding and top-notch mattress. Comfortable living room with large couch and ample room for dining in. Large guest room downstairs with comfortable queen-size mattress. Mattresses are high quality and brand new.

Upstairs guest room includes a twin-over-full bunk bed with trundle underneath. Three full bathrooms so everyone has their own space.

Guest rooms have desks with office chairs and large 24" monitors for remote work and study.

Propane grill available for use on the back deck. Underwater light to enjoy relaxing or fishing at night. 2 kayaks and life jackets available.`,
    capacity: {
      guests: 8,
      bedrooms: 3,
      beds: 5,
      bathrooms: 3
    }
  },

  highlights: [
    {
      title: "Self check-in",
      description: "Check yourself in with the smartlock.",
      icon: "FaKey"
    },
    {
      title: "Extra spacious",
      description: "Guests love this home's spaciousness for a comfortable stay.",
      icon: "FaHome"
    },
    {
      title: "Beautiful area",
      description: "Guests love this home's scenic location.",
      icon: "FaMountain"
    }
  ],

  host: {
    name: "Gordon",
    status: "Superhost",
    yearsHosting: 4,
    overallRating: 4.88,
    totalReviews: 41,
    guestFavorite: true
  },

  locationDetails: {
    city: "Corpus Christi",
    state: "Texas",
    country: "United States",
    area: "Laguna Madre Bay waterfront",
    nearbyAttractions: [
      "6 minutes to Whitecap Beach",
      "13 minutes to National Seashore",
      "Less than 30 minutes to Port Aransas or airport"
    ]
  },

  houseRules: {
    checkIn: "After 4:00 PM",
    checkOut: "Before 10:00 AM",
    checkInMethod: "Self check-in with smart lock",
    duringYourStay: {
      maxGuests: 8,
      petsAllowed: true,
      maxPets: 2,
      quietHours: "10:00 PM - 7:00 AM",
      restrictions: [
        "No parties or events",
        "No commercial photography",
        "No smoking"
      ]
    },
    additionalRules: [
      "Gather dishes and start dishwasher when you leave",
      "Start a load of towels in washing machine",
      "Put trash in the can outside front door",
      "Clean up after your pets",
      "Do not use fireplace",
      "Leave AC on 75 when you leave",
      "Don't put AC below 68 during stay as it may cause the unit to freeze"
    ],
    beforeYouLeave: [
      "Gather used towels",
      "Throw trash away",
      "Lock up"
    ],
    cleaningNote: "Severe cleaning jobs that create an unfair amount of work for cleaning crew will cost double the cleaning fee."
  }
};

// Helper selectors for easy access
export const getPropertyTitle = () => propertyData.propertyInfo.title;
export const getPropertyLocation = () => propertyData.propertyInfo.location;
export const getCapacity = () => propertyData.propertyInfo.capacity;
export const getDescription = () => propertyData.propertyInfo.description;
export const getHighlights = () => propertyData.highlights;
export const getHostInfo = () => propertyData.host;
export const getLocationDetails = () => propertyData.locationDetails;
export const getHouseRules = () => propertyData.houseRules;
export const getCheckInInfo = () => ({
  checkIn: propertyData.houseRules.checkIn,
  checkOut: propertyData.houseRules.checkOut,
  method: propertyData.houseRules.checkInMethod
});
export const getPetPolicy = () => ({
  allowed: propertyData.houseRules.duringYourStay.petsAllowed,
  maxPets: propertyData.houseRules.duringYourStay.maxPets
});
```

**Expected Outcome**:
- File created at `src/data/propertyData.ts`
- All property data properly typed
- Helper functions available for easy data access
- No TypeScript errors

**Verification**:
```typescript
// Test import in any file:
import { propertyData, getPropertyTitle } from '../data/propertyData';
console.log(getPropertyTitle()); // Should output: "Beach|Relax|Kayak|Nature|FishLight|Waterfront"
```

---

### Task 1.3: Create Hero Component

**File**: `src/components/features/Hero.tsx`

**Objective**: Create a Hero section component that displays property information dynamically

**Action**: Create the Hero component:

```typescript
import { propertyData } from '../../data/propertyData';
import { FaStar, FaMedal } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const { propertyInfo, host } = propertyData;

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-header">
          <h1 className="hero-title">{propertyInfo.title}</h1>
          <div className="hero-badges">
            {host.guestFavorite && (
              <span className="badge guest-favorite">
                <FaStar /> Guest Favorite
              </span>
            )}
            {host.status === "Superhost" && (
              <span className="badge superhost">
                <FaMedal /> {host.status}
              </span>
            )}
          </div>
        </div>

        <div className="hero-meta">
          <span className="location">{propertyInfo.location}</span>
          <span className="rating">
            <FaStar className="star-icon" />
            {host.overallRating} ({host.totalReviews} reviews)
          </span>
        </div>

        <div className="hero-capacity">
          <span>{propertyInfo.capacity.guests} guests</span>
          <span className="separator">·</span>
          <span>{propertyInfo.capacity.bedrooms} bedrooms</span>
          <span className="separator">·</span>
          <span>{propertyInfo.capacity.beds} beds</span>
          <span className="separator">·</span>
          <span>{propertyInfo.capacity.bathrooms} bathrooms</span>
        </div>

        <div className="hero-actions">
          <a href="/book" className="btn btn-primary">Reserve Now</a>
          <a href="/contact" className="btn btn-secondary">Contact Host</a>
        </div>
      </div>

      <div className="hero-image">
        <img 
          src="https://a0.muscache.com/im/pictures/miso/Hosting-1037878703063081617/original/d7c0f13d-3e9e-4402-a802-bce6dc00c8c3.jpeg" 
          alt="Waterfront property with deck and bay view"
        />
      </div>
    </section>
  );
};

export default Hero;
```

**File**: `src/components/features/Hero.css`

```css
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 2rem 0;
  align-items: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  line-height: 1.2;
}

.hero-badges {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.badge.guest-favorite {
  background-color: #fff3e0;
  color: #f57c00;
}

.badge.superhost {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  color: #666;
}

.location {
  font-weight: 500;
  color: #333;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
}

.star-icon {
  color: #ffc107;
  font-size: 0.875rem;
}

.hero-capacity {
  display: flex;
  gap: 0.5rem;
  font-size: 1rem;
  color: #666;
}

.separator {
  color: #ccc;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.875rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.btn-secondary {
  background-color: transparent;
  color: #007bff;
  border: 2px solid #007bff;
}

.btn-secondary:hover {
  background-color: #007bff;
  color: white;
}

.hero-image {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
```

**Expected Outcome**:
- Hero component displays property title, location, capacity, ratings
- Badges show Guest Favorite and Superhost status
- Responsive layout with image on the right
- CTA buttons for Reserve and Contact
- Mobile-friendly stacked layout

---

### Task 1.4: Create Property Highlights Component

**File**: `src/components/features/PropertyHighlights.tsx`

**Objective**: Display property highlights with icons

**Action**: Create the highlights component:

```typescript
import { getHighlights } from '../../data/propertyData';
import { FaKey, FaHome, FaMountain } from 'react-icons/fa';
import './PropertyHighlights.css';

const iconMap: { [key: string]: JSX.Element } = {
  FaKey: <FaKey />,
  FaHome: <FaHome />,
  FaMountain: <FaMountain />
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
```

**File**: `src/components/features/PropertyHighlights.css`

```css
.property-highlights {
  padding: 3rem 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  margin: 2rem 0;
}

.property-highlights h2 {
  font-size: 1.75rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.highlight-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.highlight-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.highlight-icon {
  font-size: 2rem;
  color: #007bff;
  flex-shrink: 0;
}

.highlight-content h3 {
  font-size: 1.125rem;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.highlight-content p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .highlights-grid {
    grid-template-columns: 1fr;
  }
}
```

**Expected Outcome**:
- Displays 3 property highlights from data
- Icons render correctly
- Cards have hover effects
- Responsive grid layout

---

### Task 1.5: Create Property Description Component

**File**: `src/components/features/PropertyDescription.tsx`

**Objective**: Display the full property description

**Action**: Create the description component:

```typescript
import { useState } from 'react';
import { getDescription } from '../../data/propertyData';
import './PropertyDescription.css';

const PropertyDescription = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const description = getDescription();
  const paragraphs = description.split('\n\n').filter(p => p.trim());

  const previewText = paragraphs.slice(0, 2).join('\n\n');
  const fullText = description;

  return (
    <section className="property-description">
      <h2>About This Property</h2>
      <div className="description-content">
        <p className="description-text">
          {isExpanded ? fullText : previewText}
        </p>
        {paragraphs.length > 2 && (
          <button 
            className="show-more-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </section>
  );
};

export default PropertyDescription;
```

**File**: `src/components/features/PropertyDescription.css`

```css
.property-description {
  padding: 3rem 0;
}

.property-description h2 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.description-content {
  max-width: 800px;
}

.description-text {
  color: #555;
  font-size: 1rem;
  line-height: 1.7;
  white-space: pre-wrap;
  margin: 0 0 1rem 0;
}

.show-more-btn {
  background: none;
  border: none;
  color: #007bff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 0;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.show-more-btn:hover {
  color: #0056b3;
}
```

**Expected Outcome**:
- Displays property description from data
- "Show More/Less" toggle for long text
- Preserves paragraph formatting
- Readable typography

---

### Task 1.6: Update HomePage Component

**File**: `src/components/pages/HomePage.tsx`

**Objective**: Replace placeholder content with data-driven components

**Action**: Replace the entire file content:

```typescript
import Hero from '../features/Hero';
import PropertyHighlights from '../features/PropertyHighlights';
import PropertyDescription from '../features/PropertyDescription';
import './PageStyles.css';

const HomePage = () => {
  return (
    <div className="page home-page">
      <Hero />
      <PropertyHighlights />
      <PropertyDescription />
      
      <section className="quick-links">
        <h2>Explore More</h2>
        <div className="quick-links-grid">
          <a href="/gallery" className="quick-link-card">
            <h3>Gallery</h3>
            <p>Browse 60+ photos of the property</p>
          </a>
          <a href="/amenities" className="quick-link-card">
            <h3>Amenities</h3>
            <p>See all features and amenities</p>
          </a>
          <a href="/location" className="quick-link-card">
            <h3>Location</h3>
            <p>Explore the area and nearby attractions</p>
          </a>
          <a href="/reviews" className="quick-link-card">
            <h3>Reviews</h3>
            <p>Read what guests are saying</p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
```

**Additional CSS** (add to `src/components/pages/PageStyles.css`):

```css
/* Quick Links Section */
.quick-links {
  padding: 3rem 0;
  margin-top: 2rem;
}

.quick-links h2 {
  font-size: 1.75rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.quick-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.quick-link-card {
  padding: 2rem;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.quick-link-card:hover {
  border-color: #007bff;
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.15);
}

.quick-link-card h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.25rem;
}

.quick-link-card p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}
```

**Expected Outcome**:
- HomePage now displays Hero, Highlights, Description
- All content comes from `propertyData`
- Quick links section for navigation
- Clean, professional layout

**Verification**: 
Run `npm run dev` and navigate to http://localhost:5173 to see the updated homepage.

---

## Sprint 2: Amenities & Location Pages

### Sprint 2 Overview
Implement fully data-driven Amenities and Location pages with structured content from the Airbnb extraction.

---

### Task 2.1: Create Amenities Data Module

**File**: `src/data/amenities.ts`

**Objective**: Create structured amenities data with categories

**Action**: Create a new file:

```typescript
import type { Amenities, AmenityItem } from '../types';

export const amenities: Amenities = {
  bathroom: [
    { name: "Bathtub", available: true },
    { name: "Hair dryer", available: true },
    { name: "Cleaning products", available: true },
    { name: "Shampoo", available: true },
    { name: "Conditioner", available: true },
    { name: "Body soap", available: true },
    { name: "Hot water", available: true },
    { name: "Shower gel", available: true }
  ],
  bedroomAndLaundry: [
    { name: "Washer", available: true },
    { name: "Free dryer – In unit", available: true },
    { name: "Essentials (Towels, bed sheets, soap, and toilet paper)", available: true },
    { name: "Hangers", available: true },
    { name: "Bed linens", available: true },
    { name: "Iron", available: true },
    { name: "Clothing storage: walk-in closet, closet, and dresser", available: true }
  ],
  entertainment: [
    { name: "TV", available: true },
    { name: "Books and reading material", available: true }
  ],
  heatingAndCooling: [
    { name: "Air conditioning", available: true },
    { name: "Indoor fireplace", available: true },
    { name: "Ceiling fan", available: true },
    { name: "Portable fans", available: true },
    { name: "Central heating", available: true }
  ],
  homeSafety: [
    { name: "Smoke alarm", available: true },
    { name: "Carbon monoxide alarm", available: true },
    { name: "Fire extinguisher", available: true },
    { name: "First aid kit", available: true }
  ],
  internetAndOffice: [
    { name: "Wifi", available: true },
    { name: "Dedicated workspace", available: true }
  ],
  kitchenAndDining: [
    { name: "Kitchen", available: true },
    { name: "Refrigerator", available: true },
    { name: "Microwave", available: true },
    { name: "Cooking basics (Pots and pans, oil, salt and pepper)", available: true },
    { name: "Dishes and silverware", available: true },
    { name: "Freezer", available: true },
    { name: "Dishwasher", available: true },
    { name: "Electric stove", available: true },
    { name: "Stainless steel single oven", available: true },
    { name: "Coffee maker (drip coffee maker, Keurig)", available: true },
    { name: "Wine glasses", available: true },
    { name: "Toaster", available: true },
    { name: "Baking sheet", available: true },
    { name: "Blender", available: true },
    { name: "Dining table", available: true },
    { name: "Coffee", available: true }
  ],
  locationFeatures: [
    { name: "Waterfront (Right next to a body of water)", available: true }
  ],
  outdoor: [
    { name: "Private patio or balcony", available: true },
    { name: "Outdoor furniture", available: true },
    { name: "Outdoor dining area", available: true },
    { name: "BBQ grill", available: true },
    { name: "Kayak", available: true },
    { name: "Boat slip", available: true }
  ],
  parkingAndFacilities: [
    { name: "Free parking on premises", available: true }
  ],
  services: [
    { name: "Pets allowed", available: true },
    { name: "Long term stays allowed", available: true },
    { name: "Self check-in (Smart lock)", available: true }
  ]
};

// Helper to get category display name
export const getCategoryDisplayName = (category: string): string => {
  const displayNames: { [key: string]: string } = {
    bathroom: "Bathroom",
    bedroomAndLaundry: "Bedroom & Laundry",
    entertainment: "Entertainment",
    heatingAndCooling: "Heating & Cooling",
    homeSafety: "Home Safety",
    internetAndOffice: "Internet & Office",
    kitchenAndDining: "Kitchen & Dining",
    locationFeatures: "Location Features",
    outdoor: "Outdoor",
    parkingAndFacilities: "Parking & Facilities",
    services: "Services"
  };
  return displayNames[category] || category;
};

// Helper to get all categories
export const getAllCategories = (): string[] => {
  return Object.keys(amenities);
};

// Helper to get amenities by category
export const getAmenitiesByCategory = (category: keyof Amenities): AmenityItem[] => {
  return amenities[category];
};

// Helper to count total amenities
export const getTotalAmenitiesCount = (): number => {
  return Object.values(amenities).reduce((total, items) => total + items.length, 0);
};
```

**Expected Outcome**:
- All 11 amenity categories defined
- 55 total amenity items structured
- Helper functions for data access
- TypeScript types enforced

---

### Task 2.2: Create Amenity Card Component

**File**: `src/components/ui/AmenityCard.tsx`

**Objective**: Create reusable amenity display component

**Action**: Create the component:

```typescript
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
```

**File**: `src/components/ui/AmenityCard.css`

```css
.amenity-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: #fff;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.amenity-card:hover {
  background-color: #f8f9fa;
}

.amenity-check {
  color: #28a745;
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.amenity-name {
  color: #333;
  font-size: 0.95rem;
  line-height: 1.4;
}
```

**Expected Outcome**:
- Reusable amenity card component
- Checkmark icon for visual confirmation
- Clean, minimal design
- Hover effect

---

### Task 2.3: Update AmenitiesPage Component

**File**: `src/components/pages/AmenitiesPage.tsx`

**Objective**: Replace placeholder with data-driven amenities display

**Action**: Replace entire file content:

```typescript
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
```

**File**: `src/components/pages/AmenitiesPage.css`

```css
.amenities-page {
  max-width: 1000px;
}

.page-header {
  margin-bottom: 3rem;
}

.amenities-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.amenity-category {
  padding-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
}

.amenity-category:last-child {
  border-bottom: none;
}

.category-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.amenities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .amenities-grid {
    grid-template-columns: 1fr;
  }
}
```

**Expected Outcome**:
- All 11 amenity categories displayed
- 55 amenities organized by category
- Responsive grid layout
- Clean category separation
- No placeholder content

**Verification**: Navigate to http://localhost:5173/amenities to see the updated page.

---

### Task 2.4: Update LocationPage Component

**File**: `src/components/pages/LocationPage.tsx`

**Objective**: Display location information with map and nearby attractions

**Action**: Replace entire file content:

```typescript
import { getLocationDetails } from '../../data/propertyData';
import { FaMapMarkerAlt, FaCar, FaUmbrellaBeach } from 'react-icons/fa';
import './PageStyles.css';
import './LocationPage.css';

const LocationPage = () => {
  const location = getLocationDetails();

  return (
    <div className="page location-page">
      <div className="page-header">
        <h1>Location</h1>
        <p className="page-description">
          {location.area} in {location.city}, {location.state}
        </p>
      </div>

      <section className="location-section">
        <div className="location-info">
          <div className="location-badge">
            <FaMapMarkerAlt />
            <span>{location.city}, {location.state}, {location.country}</span>
          </div>
          <p className="location-description">{location.area}</p>
        </div>
      </section>

      <section className="nearby-section">
        <h2>
          <FaCar className="section-icon" />
          Nearby Attractions
        </h2>
        <div className="attractions-grid">
          {location.nearbyAttractions.map((attraction, index) => (
            <div key={index} className="attraction-card">
              <FaUmbrellaBeach className="attraction-icon" />
              <span>{attraction}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="map-section">
        <h2>Map & Directions</h2>
        <div className="map-placeholder">
          <div className="map-content">
            <FaMapMarkerAlt className="map-icon" />
            <p className="map-text">
              Interactive map integration coming soon
            </p>
            <p className="map-subtext">
              Use the address above for GPS navigation
            </p>
          </div>
        </div>
        <p className="map-note">
          <strong>Note:</strong> Exact address will be provided after booking confirmation.
        </p>
      </section>

      <section className="area-info">
        <h2>About the Area</h2>
        <div className="info-cards">
          <div className="info-card">
            <h3>Beach Access</h3>
            <p>Just 6 minutes to Whitecap Beach and 13 minutes to the National Seashore. Perfect for daily beach trips and water activities.</p>
          </div>
          <div className="info-card">
            <h3>Waterfront Living</h3>
            <p>Direct access to Laguna Madre Bay with boat slip and kayaks. Fish from the dock or explore the calm bay waters.</p>
          </div>
          <div className="info-card">
            <h3>Convenient Location</h3>
            <p>Less than 30 minutes to Port Aransas and the airport. Close to restaurants, shopping, and local attractions.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPage;
```

**File**: `src/components/pages/LocationPage.css`

```css
.location-page {
  max-width: 1000px;
}

.location-section {
  margin-bottom: 3rem;
}

.location-info {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.location-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: #007bff;
  color: white;
  border-radius: 20px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.location-description {
  color: #555;
  font-size: 1.1rem;
  margin: 1rem 0 0 0;
}

.nearby-section {
  margin-bottom: 3rem;
}

.nearby-section h2 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.section-icon {
  color: #007bff;
}

.attractions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.attraction-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.attraction-card:hover {
  border-color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
}

.attraction-icon {
  color: #007bff;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.map-section {
  margin-bottom: 3rem;
}

.map-section h2 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.map-placeholder {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 4rem 2rem;
  text-align: center;
  margin-bottom: 1rem;
}

.map-content {
  color: white;
}

.map-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.map-text {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.map-subtext {
  margin: 0;
  opacity: 0.9;
}

.map-note {
  color: #666;
  font-size: 0.95rem;
  font-style: italic;
  margin: 0;
}

.area-info h2 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.info-card {
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.info-card h3 {
  margin: 0 0 0.75rem 0;
  color: #2c3e50;
  font-size: 1.125rem;
}

.info-card p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .attractions-grid {
    grid-template-columns: 1fr;
  }

  .info-cards {
    grid-template-columns: 1fr;
  }

  .map-placeholder {
    padding: 3rem 1.5rem;
  }
}
```

**Expected Outcome**:
- Location page displays city, state, area
- Nearby attractions listed with icons
- Map placeholder (ready for future integration)
- Area information cards
- Responsive layout
- All content from `propertyData`

**Verification**: Navigate to http://localhost:5173/location to see the updated page.

---

## Testing & Verification

### Task 3.1: Comprehensive Testing Checklist

**Action**: Test all implemented features systematically

**Testing Steps**:

1. **Build Verification**
```powershell
npm run build
```
- Should complete without TypeScript errors
- Should complete without ESLint errors

2. **Development Server**
```powershell
npm run dev
```
- Server should start on http://localhost:5173
- No console errors on page load

3. **Home Page Testing**
- Navigate to `/`
- Verify Hero section displays:
  - Property title from data
  - Location from data
  - Capacity information
  - Host rating and badges
  - CTA buttons (Reserve, Contact)
- Verify Property Highlights section:
  - 3 highlights displayed
  - Icons render correctly
  - Hover effects work
- Verify Property Description:
  - Full description loads
  - "Show More/Less" toggle works
  - Text formatting preserved
- Verify Quick Links section:
  - 4 cards displayed
  - Links navigate correctly

4. **Amenities Page Testing**
- Navigate to `/amenities`
- Verify total count displays correctly (55 amenities)
- Verify all 11 categories display
- Check category titles are readable
- Verify amenities render in each category
- Test responsive grid on mobile
- Verify no placeholder content remains

5. **Location Page Testing**
- Navigate to `/location`
- Verify location badge shows correct info
- Check all 3 nearby attractions display
- Verify map placeholder shows
- Check area info cards (3 cards)
- Test responsive layout

6. **Navigation Testing**
- Test header navigation links
- Test mobile menu on narrow screen (<768px)
- Test footer links
- Verify active link highlighting works
- Test browser back/forward buttons

7. **Responsive Testing**
- Test on mobile (320px - 767px)
- Test on tablet (768px - 1023px)
- Test on desktop (1024px+)
- Verify all layouts adapt correctly

8. **Data Integration Verification**
- Confirm NO hard-coded strings in components
- All content should come from:
  - `src/data/propertyData.ts`
  - `src/data/amenities.ts`
  - `src/data/propertyImages.ts`
- TypeScript types should prevent incorrect data access

**Expected Outcome**:
- All tests pass
- No console errors
- No TypeScript errors
- All content is data-driven
- Responsive design works perfectly

---

### Task 3.2: Create Summary Documentation

**File**: `!ai_docs/sprint1-2-completion-report.md`

**Objective**: Document what was implemented

**Action**: Create a completion report:

```markdown
# Sprint 1 & 2 Completion Report

## Implementation Date
[Insert Date]

## Completed Tasks

### Sprint 1: Home & Gallery
✅ **Gallery Page** - Already completed before this sprint
- 60+ images with categories
- Filtering system
- Lightbox modal
- Lazy loading

✅ **Home Page Completion**
- Hero component with property data
- Property highlights with icons
- Property description with toggle
- Quick links section

✅ **Data Infrastructure**
- `src/types/index.ts` - All interfaces defined
- `src/data/propertyData.ts` - Complete property data module
- Helper functions for data access

✅ **Feature Components**
- `src/components/features/Hero.tsx`
- `src/components/features/PropertyHighlights.tsx`
- `src/components/features/PropertyDescription.tsx`

### Sprint 2: Amenities & Location
✅ **Amenities Page**
- `src/data/amenities.ts` - 55 amenities in 11 categories
- `src/components/ui/AmenityCard.tsx` - Reusable amenity component
- Complete AmenitiesPage with data-driven content
- Category organization and display

✅ **Location Page**
- Location info display
- Nearby attractions (3 items)
- Map placeholder (ready for integration)
- Area information cards

## Statistics
- **Total Files Created**: 12
- **Total Lines of Code**: ~1,200
- **Data Points Implemented**: 70+
- **Components Created**: 5
- **Pages Updated**: 3

## Data-Driven Verification
✅ All components consume data from modules
✅ No hard-coded content strings in components
✅ TypeScript types enforced throughout
✅ Helper functions available for data access

## Testing Results
✅ Build completes without errors
✅ No TypeScript errors
✅ No console errors
✅ Responsive design verified
✅ Navigation works correctly
✅ All pages load properly

## Browser Compatibility
✅ Chrome - Working
✅ Firefox - Working
✅ Edge - Working
✅ Safari - [Test if available]

## Responsive Breakpoints Tested
✅ Mobile (320px - 767px)
✅ Tablet (768px - 1023px)
✅ Desktop (1024px+)

## Known Issues
[List any issues encountered or limitations]

## Next Steps
Proceed to Sprint 3: Reviews & Booking
- Create reviews data module
- Implement ReviewCard component
- Update Reviews page
- Create booking page layout
- Integrate Airbnb calendar widget

## Notes for Next Sprint
- Reviews data is available in data-extraction-results.md Section 9 & 10
- House rules data already in propertyData.ts for booking page
- Consider map API integration for location page

---

**Report Generated By**: [AI Agent Name]
**Date**: [Date]
```

**Expected Outcome**:
- Complete documentation of work done
- Clear record of files created
- Statistics on implementation
- Testing results documented

---

## Common Issues & Solutions

### Issue 1: TypeScript Import Errors
**Problem**: Cannot find module errors
**Solution**: 
- Verify file paths are correct
- Check that types are properly exported
- Ensure tsconfig.json includes src directory

### Issue 2: Components Not Rendering Data
**Problem**: Blank or undefined data in components
**Solution**:
- Check data module imports are correct
- Verify helper functions are called properly
- Use browser console to debug data flow

### Issue 3: CSS Not Applying
**Problem**: Styles don't show up
**Solution**:
- Ensure CSS files are imported in component
- Check for typos in className attributes
- Verify CSS specificity isn't being overridden

### Issue 4: React Icons Not Showing
**Problem**: Icons appear as empty boxes
**Solution**:
- Verify react-icons is installed
- Check import statements (e.g., `from 'react-icons/fa'`)
- Clear cache and restart dev server

### Issue 5: Build Fails
**Problem**: `npm run build` fails
**Solution**:
- Read error message carefully
- Check for unused imports
- Fix TypeScript type errors
- Verify all files are saved

---

## Performance Optimization Notes

### Current Implementation
- Hero image loads directly (single image, high priority)
- Gallery uses lazy loading (already implemented)
- No excessive re-renders (data is static)
- CSS is component-scoped

### Future Optimizations
- Consider code splitting for larger components
- Implement image optimization (WebP conversion)
- Add loading states for any future async operations
- Consider React.memo for expensive components

---

## Success Criteria Checklist

Before marking Sprint 1 & 2 as complete, verify:

- [ ] All TypeScript types defined in `src/types/index.ts`
- [ ] Property data module created and functional
- [ ] Amenities data module created and functional
- [ ] Hero component displays all property info correctly
- [ ] Property highlights render with icons
- [ ] Property description shows with toggle
- [ ] Home page has quick links section
- [ ] Amenities page shows all 11 categories
- [ ] Amenities page displays all 55 amenities
- [ ] AmenityCard component reusable
- [ ] Location page shows location info
- [ ] Location page lists nearby attractions
- [ ] Map placeholder present and styled
- [ ] Area information cards display
- [ ] No placeholder content remains on completed pages
- [ ] All components are data-driven (no hard-coded strings)
- [ ] TypeScript compilation succeeds
- [ ] Build process completes
- [ ] Dev server runs without errors
- [ ] Responsive design works on all breakpoints
- [ ] Navigation between pages works
- [ ] No console errors in browser
- [ ] All CSS files created and imported
- [ ] Completion report documented

---

## Additional Context Files

### Reference Documents
- `!ai_docs/data-extraction-results.md` - Source data (12 sections)
- `!ai_docs/scrape-results-implementation-context.md` - Implementation guidelines
- `!ai_docs/plans/main.md` - Overall project plan
- `!ai_docs/plans/phase2-implementation.md` - Architecture documentation

### Existing Code to Reference
- `src/data/propertyImages.ts` - Example of data module pattern
- `src/components/layout/Header.tsx` - Example of React component with icons
- `src/components/pages/GalleryPage.tsx` - Example of completed page

---

## Git Workflow (Optional)

If using version control, commit after each major task:

```powershell
# After Task 1.1
git add src/types/index.ts
git commit -m "Add core TypeScript interfaces for property data"

# After Task 1.2
git add src/data/propertyData.ts
git commit -m "Create property data module with Airbnb extraction data"

# After Task 1.3-1.5
git add src/components/features/*
git commit -m "Add Hero, PropertyHighlights, and PropertyDescription components"

# After Task 1.6
git add src/components/pages/HomePage.tsx src/components/pages/PageStyles.css
git commit -m "Update HomePage with data-driven components"

# After Task 2.1-2.2
git add src/data/amenities.ts src/components/ui/AmenityCard.tsx
git commit -m "Create amenities data module and AmenityCard component"

# After Task 2.3
git add src/components/pages/AmenitiesPage.*
git commit -m "Complete data-driven AmenitiesPage"

# After Task 2.4
git add src/components/pages/LocationPage.*
git commit -m "Complete data-driven LocationPage"

# Final commit
git add .
git commit -m "Complete Sprint 1 & 2: Home, Amenities, Location pages"
```

---

## Estimated Time Breakdown

### Sprint 1 Tasks
- Task 1.1: TypeScript types - 15 minutes
- Task 1.2: Property data module - 20 minutes
- Task 1.3: Hero component - 30 minutes
- Task 1.4: PropertyHighlights component - 20 minutes
- Task 1.5: PropertyDescription component - 20 minutes
- Task 1.6: Update HomePage - 15 minutes

**Sprint 1 Total**: ~2 hours

### Sprint 2 Tasks
- Task 2.1: Amenities data module - 25 minutes
- Task 2.2: AmenityCard component - 15 minutes
- Task 2.3: Update AmenitiesPage - 25 minutes
- Task 2.4: Update LocationPage - 35 minutes

**Sprint 2 Total**: ~1.5 hours

### Testing & Documentation
- Task 3.1: Comprehensive testing - 30 minutes
- Task 3.2: Documentation - 15 minutes

**Total Estimated Time**: 4-5 hours

---

## Final Notes

### Code Quality Reminders
- Always import types from `src/types`
- Use helper functions from data modules
- Keep components focused (single responsibility)
- Add comments for complex logic
- Use semantic HTML elements
- Ensure accessibility (ARIA labels, alt text)

### Data-Driven Development Principles
1. **Single Source of Truth**: Data lives in `src/data/` only
2. **Type Safety**: Always use TypeScript interfaces
3. **Reusability**: Helper functions for common data access
4. **Scalability**: Easy to add/modify data without touching components
5. **Maintainability**: Clear separation of data and presentation

### What's NOT in This Sprint
- Reviews page (Sprint 3)
- Booking page (Sprint 3)
- Contact page (Sprint 4)
- Form validation (Sprint 4)
- Map API integration (Future enhancement)
- Airbnb calendar embed (Sprint 3)

---

## Support & Questions

If you encounter issues:
1. Check the "Common Issues & Solutions" section
2. Verify all prerequisites are met
3. Review reference documents in `!ai_docs/`
4. Check existing implemented code for patterns
5. Ensure all dependencies are installed
6. Clear browser cache and restart dev server

---

**End of Implementation Plan**

This document provides complete instructions for implementing Sprint 1 & 2 of Phase 3. Follow tasks sequentially, test after each major step, and verify data-driven principles are maintained throughout.

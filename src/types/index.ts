import type { ReactNode } from 'react';

export interface NavLinkItem {
  path: string;
  label: string;
}

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface PageProps extends BaseComponentProps {
  title?: string;
}

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

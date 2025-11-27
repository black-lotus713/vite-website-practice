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

export interface SocialMediaLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'airbnb' | 'vrbo';
  url: string;
  icon?: string;
}

// Host Information
export interface HostInfo {
  name: string;
  status: string;
  isSuperhost?: boolean;
  yearsHosting: number;
  overallRating: number;
  totalReviews: number;
  guestFavorite: boolean;
  responseTime?: string;
  responseRate?: string;
  socialLinks?: SocialMediaLink[];
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
  checkInTime: string;
  checkOutTime: string;
  checkInMethod: string;
  minimumStay: number;
  maximumStay?: number;
  quietHours?: string;
  maxGuests: number;
  petsAllowed: boolean;
  maxPets?: number;
  smokingAllowed: boolean;
  eventsAllowed: boolean;
  childrenAllowed: boolean;
  parking?: string;
  restrictions: string[];
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

// Review Types
export interface Review {
  id: string;
  author: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  stayDetails: string;
  text: string;
  source: string;
}

export interface ReviewStats {
  overallRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
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

// Booking Types
export interface BookingInfo {
  airbnbUrl: string;
  checkInTime: string;
  checkOutTime: string;
  minimumStay?: number;
  maximumStay?: number;
  instantBooking: boolean;
  cancellationPolicy: string;
}

export interface PricingInfo {
  note: string;
  nightlyRate: string;
  cleaningFee: string;
  additionalNote: string;
}

export interface SafetyInfo {
  devices: string[];
  emergencyNumber: string;
}

// Contact & FAQ Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export type FormSubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: 'booking' | 'property' | 'policies' | 'general';
}

export interface ContactConfig {
  recipientEmail: string;
  emailServiceEndpoint?: string;
  maxMessageLength: number;
  requiredFields: Array<keyof ContactFormData>;
}

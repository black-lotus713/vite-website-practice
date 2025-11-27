import type { Amenities, AmenityItem } from '../types';

export const amenities: Amenities = {
  bathroom: [
    { name: 'Bathtub', available: true },
    { name: 'Hair dryer', available: true },
    { name: 'Cleaning products', available: true },
    { name: 'Shampoo', available: true },
    { name: 'Conditioner', available: true },
    { name: 'Body soap', available: true },
    { name: 'Hot water', available: true },
    { name: 'Shower gel', available: true },
  ],
  bedroomAndLaundry: [
    { name: 'Washer', available: true },
    { name: 'Free dryer – In unit', available: true },
    { name: 'Essentials (Towels, bed sheets, soap, and toilet paper)', available: true },
    { name: 'Hangers', available: true },
    { name: 'Bed linens', available: true },
    { name: 'Iron', available: true },
    { name: 'Clothing storage: walk-in closet, closet, and dresser', available: true },
  ],
  entertainment: [
    { name: 'TV', available: true },
    { name: 'Books and reading material', available: true },
  ],
  heatingAndCooling: [
    { name: 'Air conditioning', available: true },
    { name: 'Indoor fireplace', available: true },
    { name: 'Ceiling fan', available: true },
    { name: 'Portable fans', available: true },
    { name: 'Central heating', available: true },
  ],
  homeSafety: [
    { name: 'Smoke alarm', available: true },
    { name: 'Carbon monoxide alarm', available: true },
    { name: 'Fire extinguisher', available: true },
    { name: 'First aid kit', available: true },
  ],
  internetAndOffice: [
    { name: 'Wifi', available: true },
    { name: 'Dedicated workspace', available: true },
  ],
  kitchenAndDining: [
    { name: 'Kitchen', available: true },
    { name: 'Refrigerator', available: true },
    { name: 'Microwave', available: true },
    { name: 'Cooking basics (Pots and pans, oil, salt and pepper)', available: true },
    { name: 'Dishes and silverware', available: true },
    { name: 'Freezer', available: true },
    { name: 'Dishwasher', available: true },
    { name: 'Electric stove', available: true },
    { name: 'Stainless steel single oven', available: true },
    { name: 'Coffee maker (drip coffee maker, Keurig)', available: true },
    { name: 'Wine glasses', available: true },
    { name: 'Toaster', available: true },
    { name: 'Baking sheet', available: true },
    { name: 'Blender', available: true },
    { name: 'Dining table', available: true },
    { name: 'Coffee', available: true },
  ],
  locationFeatures: [{ name: 'Waterfront (Right next to a body of water)', available: true }],
  outdoor: [
    { name: 'Private patio or balcony', available: true },
    { name: 'Outdoor furniture', available: true },
    { name: 'Outdoor dining area', available: true },
    { name: 'BBQ grill', available: true },
    { name: 'Kayak', available: true },
    { name: 'Boat slip', available: true },
  ],
  parkingAndFacilities: [{ name: 'Free parking on premises', available: true }],
  services: [
    { name: 'Pets allowed', available: true },
    { name: 'Long term stays allowed', available: true },
    { name: 'Self check-in (Smart lock)', available: true },
  ],
};

// Helper to get category display name
export const getCategoryDisplayName = (category: string): string => {
  const displayNames: { [key: string]: string } = {
    bathroom: 'Bathroom',
    bedroomAndLaundry: 'Bedroom & Laundry',
    entertainment: 'Entertainment',
    heatingAndCooling: 'Heating & Cooling',
    homeSafety: 'Home Safety',
    internetAndOffice: 'Internet & Office',
    kitchenAndDining: 'Kitchen & Dining',
    locationFeatures: 'Location Features',
    outdoor: 'Outdoor',
    parkingAndFacilities: 'Parking & Facilities',
    services: 'Services',
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

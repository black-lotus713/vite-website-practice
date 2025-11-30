import type { PropertyData } from '../types';

export const propertyData: PropertyData = {
  propertyInfo: {
    title: 'Your Bay-to-Beach Haven on the Texas Coast',
    subtitle: "Pelican's Place",
    location: 'Corpus Christi, Texas, United States',
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
      bathrooms: 3,
    },
  },
  highlights: [
    {
      title: 'Self check-in',
      description: 'Check yourself in with the smartlock.',
      icon: 'FaKey',
    },
    {
      title: 'Extra spacious',
      description: "Guests love this home's spaciousness for a comfortable stay.",
      icon: 'FaHome',
    },
    {
      title: 'Beautiful area',
      description: "Guests love this home's scenic location.",
      icon: 'FaMountain',
    },
  ],
  host: {
    name: 'Gordon',
    status: 'Superhost',
    isSuperhost: true,
    yearsHosting: 4,
    overallRating: 4.88,
    totalReviews: 41,
    guestFavorite: true,
    responseTime: 'Within an hour',
    responseRate: '100%',
    socialLinks: [
      { platform: 'airbnb', url: 'https://www.airbnb.com/h/pelicansplace', icon: 'FaAirbnb' },
      { platform: 'instagram', url: 'https://www.instagram.com/pelicansplacecoast', icon: 'FaInstagram' },
      { platform: 'facebook', url: 'https://www.facebook.com/pelicansplacecoast', icon: 'FaFacebook' },
    ],
  },
  locationDetails: {
    city: 'Corpus Christi',
    state: 'Texas',
    country: 'United States',
    area: 'Laguna Madre Bay waterfront',
    nearbyAttractions: [
      '6 minutes to Whitecap Beach',
      '13 minutes to National Seashore',
      'Less than 30 minutes to Port Aransas or airport',
    ],
  },
  houseRules: {
    checkInTime: 'After 4:00 PM',
    checkOutTime: 'Before 10:00 AM',
    checkInMethod: 'Self check-in with smart lock',
    minimumStay: 2,
    maximumStay: 28,
    quietHours: '10:00 PM - 7:00 AM',
    maxGuests: 8,
    petsAllowed: true,
    maxPets: 2,
    smokingAllowed: false,
    eventsAllowed: false,
    childrenAllowed: true,
    parking:
      'Driveway parking for two vehicles (larger trucks/SUVs may need to stagger when neighbors have guests).',
    restrictions: ['No parties or large events', 'No commercial photography', 'No smoking indoors'],
    additionalRules: [
      'Gather dishes and start dishwasher when you leave',
      'Start a load of towels in washing machine',
      'Put trash in the can outside front door',
      'Clean up after your pets',
      'Do not use fireplace',
      'Leave AC on 75 when you leave',
      "Don't put AC below 68 during stay as it may cause the unit to freeze",
    ],
    beforeYouLeave: ['Gather used towels', 'Throw trash away', 'Lock up'],
    cleaningNote:
      'Severe cleaning jobs that create an unfair amount of work for cleaning crew will cost double the cleaning fee.',
  },
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
  checkIn: propertyData.houseRules.checkInTime,
  checkOut: propertyData.houseRules.checkOutTime,
  method: propertyData.houseRules.checkInMethod,
});
export const getPetPolicy = () => ({
  allowed: propertyData.houseRules.petsAllowed,
  maxPets: propertyData.houseRules.maxPets,
});

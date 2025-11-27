import type { BookingInfo, PricingInfo, SafetyInfo } from '../types';

export const bookingInfo: BookingInfo = {
  airbnbUrl: 'https://www.airbnb.com/h/pelicansplace',
  checkInTime: 'After 4:00 PM',
  checkOutTime: 'Before 10:00 AM',
  minimumStay: 2,
  maximumStay: 28,
  instantBooking: false,
  cancellationPolicy: 'Standard Airbnb cancellation policy applies',
};

export const pricingInfo: PricingInfo = {
  note: 'Pricing varies by date and season',
  nightlyRate: 'Variable - requires date selection',
  cleaningFee: 'Applies per stay',
  additionalNote:
    'Severe cleaning jobs that create an unfair amount of work for cleaning crew will cost double the cleaning fee',
};

export const safetyInfo: SafetyInfo = {
  devices: ['Smoke alarm', 'Carbon monoxide alarm', 'Fire extinguisher', 'First aid kit'],
  emergencyNumber: '911',
};

// Helper selectors
export const getBookingInfo = () => bookingInfo;
export const getPricingInfo = () => pricingInfo;
export const getSafetyInfo = () => safetyInfo;
export const getAirbnbUrlWithDates = (checkIn?: string, checkOut?: string): string => {
  if (!checkIn || !checkOut) {
    return bookingInfo.airbnbUrl;
  }
  return `${bookingInfo.airbnbUrl}?check_in=${checkIn}&check_out=${checkOut}`;
};

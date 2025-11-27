/**
 * Format a date for URL parameters (YYYY-MM-DD)
 */
export const formatDateForUrl = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Format a date for display (e.g., "Monday, Dec 15, 2025")
 */
export const formatDateForDisplay = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Calculate number of nights between two dates
 */
export const calculateNights = (checkIn: Date, checkOut: Date): number => {
  const msPerDay = 24 * 60 * 60 * 1000;
  const timeDiff = checkOut.getTime() - checkIn.getTime();
  return Math.round(timeDiff / msPerDay);
};

/**
 * Check if a date range is valid
 */
export const isValidDateRange = (checkIn: Date | null, checkOut: Date | null): boolean => {
  if (!checkIn || !checkOut) return false;
  return checkOut > checkIn;
};

/**
 * Get minimum checkout date based on check-in date and minimum stay
 */
export const getMinCheckoutDate = (checkIn: Date, minimumStay: number = 2): Date => {
  const minCheckout = new Date(checkIn);
  minCheckout.setDate(minCheckout.getDate() + minimumStay);
  return minCheckout;
};

/**
 * Disable dates before today
 */
export const isDateDisabled = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

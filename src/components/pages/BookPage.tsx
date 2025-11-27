import { useState } from 'react';
import { FaClock, FaDoorOpen, FaDoorClosed, FaPaw, FaBan, FaCheckCircle } from 'react-icons/fa';
import CalendarWidget from '../ui/CalendarWidget';
import HouseRulesCard from '../ui/HouseRulesCard';
import { getBookingInfo, getPricingInfo } from '../../data/bookingData';
import { getHouseRules } from '../../data/propertyData';
import { formatDateForUrl, calculateNights, isValidDateRange } from '../../utils/calendarUtils';
import './BookPage.css';
import './PageStyles.css';

const BookPage = () => {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const bookingInfo = getBookingInfo();
  const pricingInfo = getPricingInfo();
  const houseRules = getHouseRules();

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setCheckIn(dates[0]);
    setCheckOut(dates[1]);
  };

  const handleBookNow = () => {
    let url = bookingInfo.airbnbUrl;

    if (checkIn && checkOut && isValidDateRange(checkIn, checkOut)) {
      const checkInStr = formatDateForUrl(checkIn);
      const checkOutStr = formatDateForUrl(checkOut);
      url = `${url}?check_in=${checkInStr}&check_out=${checkOutStr}`;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;

  return (
    <div className="page">
      <div className="book-page">
        <div className="book-page__header">
          <h1>Book Your Stay</h1>
          <p className="page-description">
            Select your dates and review our house rules before booking
          </p>
        </div>

        <div className="book-page__content">
          <div className="book-page__calendar-section">
            <CalendarWidget
              onDateChange={handleDateChange}
              minimumStay={bookingInfo.minimumStay}
            />

            <div className="book-page__pricing">
              <h3>Pricing Information</h3>
              <p className="book-page__pricing-note">{pricingInfo.note}</p>
              <ul className="book-page__pricing-list">
                <li>
                  <span>Nightly Rate:</span>
                  <span>{pricingInfo.nightlyRate}</span>
                </li>
                <li>
                  <span>Cleaning Fee:</span>
                  <span>{pricingInfo.cleaningFee}</span>
                </li>
              </ul>
              {nights > 0 && (
                <div className="book-page__stay-summary">
                  <strong>Your Stay:</strong> {nights} {nights === 1 ? 'night' : 'nights'}
                </div>
              )}
            </div>

            <button
              className="book-page__cta"
              onClick={handleBookNow}
              aria-label="Book on Airbnb"
            >
              {checkIn && checkOut ? 'Continue to Airbnb' : 'Check Availability on Airbnb'}
            </button>
            <p className="book-page__disclaimer">
              You'll be redirected to Airbnb to complete your booking
            </p>
          </div>

          <div className="book-page__rules-section">
            <h2>House Rules & Important Information</h2>

            <HouseRulesCard
              icon={<FaClock />}
              title="Check-in & Check-out"
              items={[
                `Check-in: ${houseRules.checkInTime}`,
                `Check-out: ${houseRules.checkOutTime}`,
                houseRules.checkInMethod,
              ]}
              variant="info"
            />

            <HouseRulesCard
              icon={<FaDoorOpen />}
              title="During Your Stay"
              items={[
                `Maximum ${houseRules.maxGuests} guests`,
                houseRules.petsAllowed
                  ? houseRules.maxPets
                    ? `Pets allowed (max ${houseRules.maxPets})`
                    : 'Pets allowed'
                  : 'No pets allowed',
                houseRules.quietHours ? `Quiet hours: ${houseRules.quietHours}` : 'Please respect our quiet hours',
              ]}
              variant="success"
            />

            <HouseRulesCard
              icon={<FaBan />}
              title="Restrictions"
              items={houseRules.restrictions}
              variant="danger"
            />

            <HouseRulesCard
              icon={<FaCheckCircle />}
              title="Please Remember"
              items={houseRules.additionalRules}
              variant="warning"
            />

            <HouseRulesCard
              icon={<FaDoorClosed />}
              title="Before You Leave"
              items={houseRules.beforeYouLeave}
              variant="info"
            />

            {houseRules.cleaningNote && (
              <div className="book-page__cleaning-note">
                <FaPaw />
                <p>{houseRules.cleaningNote}</p>
              </div>
            )}

            <div className="book-page__policy">
              <h3>Cancellation Policy</h3>
              <p>{bookingInfo.cancellationPolicy}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;

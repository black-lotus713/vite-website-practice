import { FaAirbnb } from 'react-icons/fa';
import './ContactPage.css';
import ContactForm from '../ui/ContactForm';
import FAQSection from '../ui/FAQSection';
import HostInfoCard from '../ui/HostInfoCard';
import { propertyData } from '../../data/propertyData';
import { getBookingInfo } from '../../data/bookingData';

const ContactPage = () => {
  const { houseRules, propertyInfo } = propertyData;
  const bookingInfo = getBookingInfo();

  const quickFacts = [
    { label: 'Check-in', value: houseRules.checkInTime },
    { label: 'Check-out', value: houseRules.checkOutTime },
    { label: 'Minimum stay', value: `${houseRules.minimumStay} nights` },
    {
      label: 'Maximum stay',
      value: houseRules.maximumStay ? `${houseRules.maximumStay} nights` : 'Contact host',
    },
    { label: 'Max guests', value: `${houseRules.maxGuests}` },
    {
      label: 'Pets',
      value: houseRules.petsAllowed
        ? houseRules.maxPets
          ? `Allowed (up to ${houseRules.maxPets})`
          : 'Allowed'
        : 'Not allowed',
    },
    {
      label: 'Quiet hours',
      value: houseRules.quietHours || 'Please respect our neighbors',
    },
  ];

  return (
    <div className="contact-page">
      <section className="contact-page__hero">
        <div className="contact-page__hero-content">
          <p className="contact-page__eyebrow">Contact</p>
          <h1>Stay at {propertyInfo.subtitle || propertyInfo.title}</h1>
          <p>
            We are happy to answer questions about booking, policies, or planning the perfect waterfront stay.
          </p>
        </div>
      </section>

      <div className="contact-page__body">
        <div className="contact-page__grid">
          <div className="contact-page__form-panel">
            <ContactForm />

            <div className="contact-page__alt-contact">
              <p>Ready to secure your stay?</p>
              <a
                href={bookingInfo.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-page__airbnb-link"
              >
                <FaAirbnb aria-hidden="true" /> View listing on Airbnb
              </a>
            </div>
          </div>

          <aside className="contact-page__sidebar">
            <HostInfoCard />

            <div className="contact-page__quick-info">
              <h3>Quick Facts</h3>
              <ul>
                {quickFacts.map((item) => (
                  <li key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <FAQSection />
      </div>
    </div>
  );
};

export default ContactPage;

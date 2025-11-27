import { propertyData } from '../data/propertyData';
import type { FAQItem, HouseRules } from '../types';

/**
 * Build FAQ entries from the structured house rules data
 */
export const generateFAQsFromHouseRules = (houseRules: HouseRules): FAQItem[] => {
  const faqs: FAQItem[] = [];

  if (houseRules.checkInTime && houseRules.checkOutTime) {
    faqs.push({
      id: 'checkin-checkout',
      question: 'What are the check-in and check-out times?',
      answer: `Check-in is ${houseRules.checkInTime} and check-out is ${houseRules.checkOutTime}.`,
      category: 'booking',
    });
  }

  faqs.push({
    id: 'pets',
    question: 'Are pets allowed?',
    answer: houseRules.petsAllowed
      ? houseRules.maxPets
        ? `Yes, pets are welcome (up to ${houseRules.maxPets}).`
        : 'Yes, pets are welcome at the property.'
      : 'No, pets are not permitted inside the property.',
    category: 'policies',
  });

  if (houseRules.quietHours) {
    faqs.push({
      id: 'quiet-hours',
      question: 'Are there quiet hours?',
      answer: `Quiet hours run from ${houseRules.quietHours}.`,
      category: 'policies',
    });
  }

  faqs.push({
    id: 'smoking',
    question: 'Is smoking allowed?',
    answer: houseRules.smokingAllowed
      ? 'Smoking is allowed outdoors only; please dispose responsibly.'
      : 'Smoking is not allowed inside or on the property.',
    category: 'policies',
  });

  faqs.push({
    id: 'events',
    question: 'Can I host events or parties?',
    answer: houseRules.eventsAllowed
      ? 'Small gatherings are allowed with prior approval.'
      : 'Events, parties, or large gatherings are not permitted.',
    category: 'policies',
  });

  faqs.push({
    id: 'children',
    question: 'Are children allowed?',
    answer: houseRules.childrenAllowed
      ? 'Yes, children of all ages are welcome.'
      : 'This property is limited to adult guests only.',
    category: 'policies',
  });

  if (houseRules.parking) {
    faqs.push({
      id: 'parking',
      question: 'Is parking available on site?',
      answer: houseRules.parking,
      category: 'property',
    });
  }

  if (houseRules.additionalRules?.length) {
    houseRules.additionalRules.forEach((rule, index) => {
      faqs.push({
        id: `additional-rule-${index + 1}`,
        question: `Additional important information ${index + 1}`,
        answer: rule,
        category: 'general',
      });
    });
  }

  return faqs;
};

/**
 * Return FAQs combining house-rule-driven entries with curated extras
 */
export const getAllFAQs = (): FAQItem[] => {
  const houseRuleFaqs = generateFAQsFromHouseRules(propertyData.houseRules);
  const customFaqs: FAQItem[] = [
    {
      id: 'cancellation',
      question: 'What is the cancellation policy?',
      answer:
        'Please review the cancellation policy directly on Airbnb or VRBO when booking, as terms vary by date and platform.',
      category: 'booking',
    },
    {
      id: 'amenities-overview',
      question: 'Which amenities are included?',
      answer: 'High-speed WiFi, a stocked kitchen, kayaks, boat slip, and workspace setups are available. Visit the Amenities page for the full list.',
      category: 'property',
    },
    {
      id: 'minimum-stay',
      question: 'Is there a minimum stay?',
      answer: `Yes, the minimum stay is ${propertyData.houseRules.minimumStay} nights.`,
      category: 'booking',
    },
  ];

  return [...houseRuleFaqs, ...customFaqs];
};

/**
 * Filter FAQ entries by category key
 */
export const filterFAQsByCategory = (
  faqs: FAQItem[],
  category: FAQItem['category']
): FAQItem[] => faqs.filter((faq) => faq.category === category);

/**
 * Simple case-insensitive keyword search across FAQs
 */
export const searchFAQs = (faqs: FAQItem[], keyword: string): FAQItem[] => {
  const lower = keyword.toLowerCase();
  return faqs.filter(
    (faq) => faq.question.toLowerCase().includes(lower) || faq.answer.toLowerCase().includes(lower)
  );
};

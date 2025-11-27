import { useState } from 'react';
import './FAQSection.css';
import { getAllFAQs } from '../../utils/faqUtils';

const FAQSection = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const faqs = getAllFAQs();

  const toggleFAQ = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <section className="faq-section">
      <div className="faq-section__header">
        <h2>Frequently Asked Questions</h2>
        <p>Answers to the most common booking, policy, and property questions.</p>
      </div>

      <div className="faq-section__list">
        {faqs.map((faq) => {
          const isExpanded = expandedId === faq.id;
          return (
            <div key={faq.id} className={`faq-item ${isExpanded ? 'expanded' : ''}`}>
              <button
                className="faq-item__question"
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={isExpanded}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span>{faq.question}</span>
                <span className="faq-item__icon">{isExpanded ? '-' : '+'}</span>
              </button>
              {isExpanded && (
                <div className="faq-item__answer" id={`faq-answer-${faq.id}`}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;

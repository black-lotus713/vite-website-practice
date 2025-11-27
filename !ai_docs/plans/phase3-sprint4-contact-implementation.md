# Phase 3: Sprint 4 - Contact & Forms Implementation Plan

## Document Purpose
This document provides detailed, step-by-step instructions for implementing the **Contact feature** as part of Sprint 4 in the Vite website practice project. This sprint focuses on the contact form, FAQ section, and host information display.

---

## Prerequisites

### Project Status Check
Before starting, verify:
- ✅ Sprint 1 & 2 completed (Home, Gallery, Amenities, Location pages)
- ✅ Sprint 3a completed (Reviews page functional)
- ✅ Sprint 3b completed (Booking page functional)
- ✅ React Router DOM navigation working
- ✅ React Icons installed
- ✅ Layout components operational
- ✅ Development server runs without errors (`npm run dev`)

### Data Source
- Host information from `propertyData.ts` (already implemented)
- House rules from `propertyData.ts` (for FAQ section)
- Contact configuration for email submission to `architect@pulseroi.com`

---

## Sprint 4 Overview: Contact & Forms Feature

**Objective**: Implement a complete Contact page with form validation, FAQ section driven by house rules data, and host information display.

**Components to Create**:
1. Contact form types (`src/types/index.ts` - extend)
2. Contact utilities (`src/utils/contactUtils.ts`)
3. FAQ data utilities (`src/utils/faqUtils.ts`)
4. ContactForm component (`src/components/ui/ContactForm.tsx`)
5. FAQSection component (`src/components/ui/FAQSection.tsx`)
6. HostInfoCard component (`src/components/ui/HostInfoCard.tsx`)
7. ContactPage implementation (`src/components/pages/ContactPage.tsx`)

**Key Principles**: 
- All content driven from structured data - NO hard-coded strings in components
- Email submissions go to `architect@pulseroi.com` but this address is NEVER exposed in the UI
- FAQ content is auto-generated from `propertyData.houseRules`

---

## Step 1: Extend TypeScript Types

**File**: `src/types/index.ts`

**Objective**: Add types for contact form, FAQ, and form validation.

```typescript
// Add to existing types file

/**
 * Contact form field values
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Contact form validation errors
 */
export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

/**
 * Contact form submission status
 */
export type FormSubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * FAQ item structure
 */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: 'booking' | 'property' | 'policies' | 'general';
}

/**
 * Social media link
 */
export interface SocialMediaLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'airbnb' | 'vrbo';
  url: string;
  icon: string; // Icon name from react-icons
}

/**
 * Contact configuration (for internal use only - never expose in UI)
 */
export interface ContactConfig {
  recipientEmail: string; // architect@pulseroi.com
  emailServiceEndpoint?: string;
  maxMessageLength: number;
  requiredFields: Array<keyof ContactFormData>;
}
```

**Verification**:
```bash
npm run dev
```
Ensure no TypeScript errors in console.

---

## Step 2: Create Contact Utilities

**File**: `src/utils/contactUtils.ts`

**Objective**: Create form validation and helper functions.

```typescript
import { ContactFormData, ContactFormErrors } from '../types';

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (optional field, but must be valid if provided)
 */
export const isValidPhone = (phone: string): boolean => {
  if (!phone || phone.trim() === '') return true; // Optional field
  const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Validate individual form field
 */
export const validateField = (
  name: keyof ContactFormData,
  value: string
): string | undefined => {
  switch (name) {
    case 'name':
      if (!value || value.trim().length < 2) {
        return 'Name must be at least 2 characters';
      }
      if (value.trim().length > 50) {
        return 'Name must be less than 50 characters';
      }
      break;

    case 'email':
      if (!value || value.trim() === '') {
        return 'Email is required';
      }
      if (!isValidEmail(value)) {
        return 'Please enter a valid email address';
      }
      break;

    case 'phone':
      if (value && !isValidPhone(value)) {
        return 'Please enter a valid phone number';
      }
      break;

    case 'subject':
      if (!value || value.trim().length < 3) {
        return 'Subject must be at least 3 characters';
      }
      if (value.trim().length > 100) {
        return 'Subject must be less than 100 characters';
      }
      break;

    case 'message':
      if (!value || value.trim().length < 10) {
        return 'Message must be at least 10 characters';
      }
      if (value.trim().length > 1000) {
        return 'Message must be less than 1000 characters';
      }
      break;
  }

  return undefined;
};

/**
 * Validate entire form
 */
export const validateForm = (formData: ContactFormData): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  // Validate each field
  (Object.keys(formData) as Array<keyof ContactFormData>).forEach((key) => {
    const error = validateField(key, formData[key] || '');
    if (error) {
      errors[key] = error;
    }
  });

  return errors;
};

/**
 * Check if form has any errors
 */
export const hasFormErrors = (errors: ContactFormErrors): boolean => {
  return Object.keys(errors).length > 0;
};

/**
 * Format form data for submission
 */
export const formatFormDataForSubmission = (formData: ContactFormData) => {
  return {
    name: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: formData.phone?.trim() || '',
    subject: formData.subject.trim(),
    message: formData.message.trim(),
    timestamp: new Date().toISOString(),
  };
};

/**
 * Sanitize user input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};
```

**Verification**:
Test in browser console or create a simple test component.

---

## Step 3: Create FAQ Utilities

**File**: `src/utils/faqUtils.ts`

**Objective**: Generate FAQ items from house rules data.

```typescript
import { FAQItem, HouseRules } from '../types';
import { propertyData } from '../data/propertyData';

/**
 * Generate FAQ items from house rules data
 */
export const generateFAQsFromHouseRules = (houseRules: HouseRules): FAQItem[] => {
  const faqs: FAQItem[] = [];

  // Check-in/Check-out
  if (houseRules.checkInTime && houseRules.checkOutTime) {
    faqs.push({
      id: 'checkin-checkout',
      question: 'What are the check-in and check-out times?',
      answer: `Check-in is at ${houseRules.checkInTime} and check-out is at ${houseRules.checkOutTime}.`,
      category: 'booking',
    });
  }

  // Pets
  if (houseRules.pets !== undefined) {
    faqs.push({
      id: 'pets',
      question: 'Are pets allowed?',
      answer: houseRules.pets
        ? 'Yes, pets are allowed at this property.'
        : 'No, pets are not allowed at this property.',
      category: 'policies',
    });
  }

  // Quiet hours
  if (houseRules.quietHours) {
    faqs.push({
      id: 'quiet-hours',
      question: 'Are there quiet hours?',
      answer: `Yes, quiet hours are ${houseRules.quietHours}.`,
      category: 'policies',
    });
  }

  // Smoking
  if (houseRules.smoking !== undefined) {
    faqs.push({
      id: 'smoking',
      question: 'Is smoking allowed?',
      answer: houseRules.smoking
        ? 'Smoking is allowed at this property.'
        : 'Smoking is not allowed inside or on the property.',
      category: 'policies',
    });
  }

  // Events
  if (houseRules.events !== undefined) {
    faqs.push({
      id: 'events',
      question: 'Can I host events or parties?',
      answer: houseRules.events
        ? 'Events and gatherings are allowed with prior approval.'
        : 'Events, parties, and large gatherings are not permitted.',
      category: 'policies',
    });
  }

  // Children
  if (houseRules.childrenAllowed !== undefined) {
    faqs.push({
      id: 'children',
      question: 'Are children allowed?',
      answer: houseRules.childrenAllowed
        ? 'Yes, children are welcome at this property.'
        : 'This property is for adults only.',
      category: 'policies',
    });
  }

  // Parking
  if (houseRules.parking) {
    faqs.push({
      id: 'parking',
      question: 'Is parking available?',
      answer: houseRules.parking,
      category: 'property',
    });
  }

  // Additional rules
  if (houseRules.additionalRules && houseRules.additionalRules.length > 0) {
    houseRules.additionalRules.forEach((rule, index) => {
      faqs.push({
        id: `additional-rule-${index}`,
        question: 'Additional Important Information',
        answer: rule,
        category: 'general',
      });
    });
  }

  return faqs;
};

/**
 * Get all FAQs including house rules and custom ones
 */
export const getAllFAQs = (): FAQItem[] => {
  const houseRulesFAQs = generateFAQsFromHouseRules(propertyData.houseRules);

  // Add custom FAQs not covered by house rules
  const customFAQs: FAQItem[] = [
    {
      id: 'cancellation',
      question: 'What is the cancellation policy?',
      answer:
        'Please refer to the booking platform (Airbnb or VRBO) for the current cancellation policy. Policies may vary by season and booking type.',
      category: 'booking',
    },
    {
      id: 'amenities',
      question: 'What amenities are included?',
      answer:
        'The property includes a full kitchen, WiFi, air conditioning, heating, kayaks, a boat slip, and much more. Visit our Amenities page for a complete list.',
      category: 'property',
    },
    {
      id: 'cleaning',
      question: 'Is there a cleaning fee?',
      answer:
        'Cleaning fees are included in the total price shown on the booking platform. There are no additional surprise fees.',
      category: 'booking',
    },
    {
      id: 'minimum-stay',
      question: 'Is there a minimum stay requirement?',
      answer: `Yes, the minimum stay is ${propertyData.houseRules.minimumStay || 2} nights.`,
      category: 'booking',
    },
  ];

  return [...houseRulesFAQs, ...customFAQs];
};

/**
 * Filter FAQs by category
 */
export const filterFAQsByCategory = (
  faqs: FAQItem[],
  category: FAQItem['category']
): FAQItem[] => {
  return faqs.filter((faq) => faq.category === category);
};

/**
 * Search FAQs by keyword
 */
export const searchFAQs = (faqs: FAQItem[], keyword: string): FAQItem[] => {
  const lowerKeyword = keyword.toLowerCase();
  return faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(lowerKeyword) ||
      faq.answer.toLowerCase().includes(lowerKeyword)
  );
};
```

**Verification**:
```typescript
// Test in browser console
import { getAllFAQs } from './utils/faqUtils';
console.log(getAllFAQs());
```

---

## Step 4: Create ContactForm Component

**File**: `src/components/ui/ContactForm.tsx`

**Objective**: Build a fully functional contact form with validation.

```typescript
import React, { useState, ChangeEvent, FormEvent } from 'react';
import './ContactForm.css';
import {
  ContactFormData,
  ContactFormErrors,
  FormSubmissionStatus,
} from '../../types';
import {
  validateForm,
  hasFormErrors,
  formatFormDataForSubmission,
} from '../../utils/contactUtils';

const ContactForm: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Validation errors
  const [errors, setErrors] = useState<ContactFormErrors>({});

  // Submission status
  const [status, setStatus] = useState<FormSubmissionStatus>('idle');

  // Touched fields (to show errors only after user interaction)
  const [touched, setTouched] = useState<Set<keyof ContactFormData>>(new Set());

  /**
   * Handle input change
   */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if it exists
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /**
   * Handle field blur (mark as touched)
   */
  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => new Set(prev).add(name as keyof ContactFormData));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched(
      new Set(['name', 'email', 'phone', 'subject', 'message'] as Array<
        keyof ContactFormData
      >)
    );

    // Validate form
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (hasFormErrors(validationErrors)) {
      return;
    }

    // Prepare submission
    setStatus('submitting');

    try {
      // Format data
      const submissionData = formatFormDataForSubmission(formData);

      // TODO: Replace with actual email service integration
      // For now, simulate API call
      console.log('Form submission data:', submissionData);
      console.log('This would be sent to: architect@pulseroi.com');

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setTouched(new Set());
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  /**
   * Show error for field only if touched
   */
  const showError = (field: keyof ContactFormData): boolean => {
    return touched.has(field) && !!errors[field];
  };

  return (
    <div className="contact-form">
      <div className="contact-form__header">
        <h2>Send Us a Message</h2>
        <p>
          Have questions about the property or your stay? Fill out the form below
          and we'll get back to you as soon as possible.
        </p>
      </div>

      {status === 'success' && (
        <div className="contact-form__success">
          <p>
            ✓ Thank you for your message! We'll get back to you within 24 hours.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="contact-form__error">
          <p>
            ✗ There was an error sending your message. Please try again or contact
            us directly through Airbnb.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name Field */}
        <div className="contact-form__field">
          <label htmlFor="name">
            Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={showError('name') ? 'error' : ''}
            disabled={status === 'submitting'}
            required
          />
          {showError('name') && (
            <span className="contact-form__field-error">{errors.name}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="contact-form__field">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={showError('email') ? 'error' : ''}
            disabled={status === 'submitting'}
            required
          />
          {showError('email') && (
            <span className="contact-form__field-error">{errors.email}</span>
          )}
        </div>

        {/* Phone Field (Optional) */}
        <div className="contact-form__field">
          <label htmlFor="phone">Phone (Optional)</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={showError('phone') ? 'error' : ''}
            disabled={status === 'submitting'}
          />
          {showError('phone') && (
            <span className="contact-form__field-error">{errors.phone}</span>
          )}
        </div>

        {/* Subject Field */}
        <div className="contact-form__field">
          <label htmlFor="subject">
            Subject <span className="required">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            className={showError('subject') ? 'error' : ''}
            disabled={status === 'submitting'}
            required
          />
          {showError('subject') && (
            <span className="contact-form__field-error">{errors.subject}</span>
          )}
        </div>

        {/* Message Field */}
        <div className="contact-form__field">
          <label htmlFor="message">
            Message <span className="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={showError('message') ? 'error' : ''}
            disabled={status === 'submitting'}
            rows={6}
            required
          />
          {showError('message') && (
            <span className="contact-form__field-error">{errors.message}</span>
          )}
          <span className="contact-form__char-count">
            {formData.message.length} / 1000
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="contact-form__submit"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
```

**File**: `src/components/ui/ContactForm.css`

```css
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.contact-form__header {
  margin-bottom: 2rem;
  text-align: center;
}

.contact-form__header h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.contact-form__header p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Success/Error Messages */
.contact-form__success,
.contact-form__error {
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.contact-form__success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.contact-form__error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Form Fields */
.contact-form__field {
  margin-bottom: 1.5rem;
}

.contact-form__field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  font-size: 0.95rem;
}

.contact-form__field .required {
  color: #dc3545;
}

.contact-form__field input,
.contact-form__field textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.contact-form__field input:focus,
.contact-form__field textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.contact-form__field input.error,
.contact-form__field textarea.error {
  border-color: #dc3545;
}

.contact-form__field input:disabled,
.contact-form__field textarea:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.7;
}

.contact-form__field textarea {
  resize: vertical;
  min-height: 120px;
}

/* Field Errors */
.contact-form__field-error {
  display: block;
  margin-top: 0.25rem;
  color: #dc3545;
  font-size: 0.85rem;
}

/* Character Count */
.contact-form__char-count {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: #666;
  text-align: right;
}

/* Submit Button */
.contact-form__submit {
  width: 100%;
  padding: 0.875rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.contact-form__submit:hover:not(:disabled) {
  background: #0056b3;
}

.contact-form__submit:active:not(:disabled) {
  transform: translateY(1px);
}

.contact-form__submit:disabled {
  background: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-form {
    padding: 1.5rem;
  }

  .contact-form__header h2 {
    font-size: 1.5rem;
  }
}
```

---

## Step 5: Create FAQSection Component

**File**: `src/components/ui/FAQSection.tsx`

```typescript
import React, { useState } from 'react';
import './FAQSection.css';
import { FAQItem } from '../../types';
import { getAllFAQs } from '../../utils/faqUtils';

const FAQSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const faqs = getAllFAQs();

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="faq-section">
      <div className="faq-section__header">
        <h2>Frequently Asked Questions</h2>
        <p>Find answers to common questions about the property and your stay.</p>
      </div>

      <div className="faq-section__list">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className={`faq-item ${expandedId === faq.id ? 'expanded' : ''}`}
          >
            <button
              className="faq-item__question"
              onClick={() => toggleFAQ(faq.id)}
              aria-expanded={expandedId === faq.id}
            >
              <span>{faq.question}</span>
              <span className="faq-item__icon">
                {expandedId === faq.id ? '−' : '+'}
              </span>
            </button>
            {expandedId === faq.id && (
              <div className="faq-item__answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
```

**File**: `src/components/ui/FAQSection.css`

```css
.faq-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.faq-section__header {
  text-align: center;
  margin-bottom: 2rem;
}

.faq-section__header h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.faq-section__header p {
  color: #666;
  font-size: 0.95rem;
}

.faq-section__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* FAQ Item */
.faq-item {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.faq-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.faq-item.expanded {
  border-color: #007bff;
}

/* Question Button */
.faq-item__question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  transition: background 0.2s;
}

.faq-item__question:hover {
  background: #f8f9fa;
}

.faq-item.expanded .faq-item__question {
  color: #007bff;
}

/* Icon */
.faq-item__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-left: 1rem;
  font-size: 1.5rem;
  font-weight: 300;
  color: #007bff;
}

/* Answer */
.faq-item__answer {
  padding: 0 1.5rem 1.25rem;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .faq-section {
    padding: 1.5rem 0;
  }

  .faq-section__header h2 {
    font-size: 1.5rem;
  }

  .faq-item__question {
    padding: 1rem;
    font-size: 0.95rem;
  }

  .faq-item__answer {
    padding: 0 1rem 1rem;
  }
}
```

---

## Step 6: Create HostInfoCard Component

**File**: `src/components/ui/HostInfoCard.tsx`

```typescript
import React from 'react';
import './HostInfoCard.css';
import { FaStar, FaAward } from 'react-icons/fa';
import { propertyData } from '../../data/propertyData';

const HostInfoCard: React.FC = () => {
  const { host } = propertyData;

  if (!host) return null;

  return (
    <div className="host-info-card">
      <div className="host-info-card__header">
        <h3>Your Host</h3>
      </div>

      <div className="host-info-card__content">
        <div className="host-info-card__name-badge">
          <h4>{host.name}</h4>
          {host.isSuperhost && (
            <span className="host-info-card__superhost">
              <FaAward /> Superhost
            </span>
          )}
        </div>

        {host.yearsHosting && (
          <p className="host-info-card__experience">
            Hosting since {new Date().getFullYear() - host.yearsHosting}
          </p>
        )}

        <div className="host-info-card__stats">
          {host.rating && (
            <div className="host-info-card__stat">
              <FaStar className="host-info-card__star" />
              <span>
                <strong>{host.rating.toFixed(2)}</strong> Rating
              </span>
            </div>
          )}

          {host.reviewCount && (
            <div className="host-info-card__stat">
              <span>
                <strong>{host.reviewCount}</strong> Reviews
              </span>
            </div>
          )}
        </div>

        {host.responseTime && (
          <p className="host-info-card__detail">
            Response time: <strong>{host.responseTime}</strong>
          </p>
        )}

        {host.responseRate && (
          <p className="host-info-card__detail">
            Response rate: <strong>{host.responseRate}</strong>
          </p>
        )}
      </div>

      <div className="host-info-card__footer">
        <p>
          For the fastest response, please message us directly through your
          booking platform.
        </p>
      </div>
    </div>
  );
};

export default HostInfoCard;
```

**File**: `src/components/ui/HostInfoCard.css`

```css
.host-info-card {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.host-info-card__header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.host-info-card__content {
  padding: 0.5rem 0;
}

.host-info-card__name-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.host-info-card__name-badge h4 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.host-info-card__superhost {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: #ff385c;
  color: #fff;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.host-info-card__experience {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.host-info-card__stats {
  display: flex;
  gap: 1.5rem;
  margin: 1rem 0;
  padding: 1rem 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}

.host-info-card__stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #555;
}

.host-info-card__star {
  color: #ffc107;
  font-size: 1rem;
}

.host-info-card__detail {
  color: #555;
  font-size: 0.95rem;
  margin: 0.5rem 0;
}

.host-info-card__detail strong {
  color: #333;
  font-weight: 500;
}

.host-info-card__footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.host-info-card__footer p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 768px) {
  .host-info-card {
    padding: 1.25rem;
  }

  .host-info-card__stats {
    flex-direction: column;
    gap: 0.75rem;
  }
}
```

---

## Step 7: Create ContactPage

**File**: `src/components/pages/ContactPage.tsx`

```typescript
import React from 'react';
import './ContactPage.css';
import ContactForm from '../ui/ContactForm';
import FAQSection from '../ui/FAQSection';
import HostInfoCard from '../ui/HostInfoCard';
import { FaAirbnb } from 'react-icons/fa';
import { propertyData } from '../../data/propertyData';

const ContactPage: React.FC = () => {
  const airbnbListingUrl = propertyData.bookingInfo?.airbnbUrl || '#';

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-page__hero">
        <div className="contact-page__hero-content">
          <h1>Get in Touch</h1>
          <p>
            Have questions about the property or your stay? We're here to help!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="contact-page__content">
        <div className="contact-page__grid">
          {/* Contact Form */}
          <div className="contact-page__form-section">
            <ContactForm />

            {/* Alternative Contact */}
            <div className="contact-page__alternative">
              <p>Prefer to book directly?</p>
              <a
                href={airbnbListingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-page__airbnb-link"
              >
                <FaAirbnb /> View on Airbnb
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="contact-page__sidebar">
            <HostInfoCard />

            {/* Quick Info */}
            <div className="contact-page__quick-info">
              <h3>Quick Information</h3>
              <ul>
                <li>
                  <strong>Check-in:</strong> {propertyData.houseRules.checkInTime}
                </li>
                <li>
                  <strong>Check-out:</strong>{' '}
                  {propertyData.houseRules.checkOutTime}
                </li>
                <li>
                  <strong>Min Stay:</strong>{' '}
                  {propertyData.houseRules.minimumStay} nights
                </li>
                <li>
                  <strong>Max Guests:</strong> {propertyData.propertyInfo.guests}
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* FAQ Section */}
        <section className="contact-page__faq">
          <FAQSection />
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
```

**File**: `src/components/pages/ContactPage.css`

```css
.contact-page {
  min-height: 100vh;
}

/* Hero Section */
.contact-page__hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  padding: 4rem 2rem;
  text-align: center;
}

.contact-page__hero-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.contact-page__hero-content p {
  font-size: 1.1rem;
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto;
}

/* Main Content */
.contact-page__content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

/* Grid Layout */
.contact-page__grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 3rem;
  margin-bottom: 3rem;
}

/* Form Section */
.contact-page__form-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Alternative Contact */
.contact-page__alternative {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.contact-page__alternative p {
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.95rem;
}

.contact-page__airbnb-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #ff385c;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 1rem;
  transition: background 0.2s, transform 0.1s;
}

.contact-page__airbnb-link:hover {
  background: #e31c5f;
  transform: translateY(-2px);
}

.contact-page__airbnb-link svg {
  font-size: 1.5rem;
}

/* Sidebar */
.contact-page__sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Quick Info */
.contact-page__quick-info {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.contact-page__quick-info h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.contact-page__quick-info ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-page__quick-info li {
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  color: #555;
  font-size: 0.95rem;
}

.contact-page__quick-info li:last-child {
  border-bottom: none;
}

.contact-page__quick-info strong {
  color: #333;
  font-weight: 500;
}

/* FAQ Section */
.contact-page__faq {
  padding-top: 2rem;
  border-top: 2px solid #e0e0e0;
}

/* Responsive */
@media (max-width: 968px) {
  .contact-page__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-page__sidebar {
    order: -1;
  }
}

@media (max-width: 768px) {
  .contact-page__hero {
    padding: 3rem 1.5rem;
  }

  .contact-page__hero-content h1 {
    font-size: 2rem;
  }

  .contact-page__hero-content p {
    font-size: 1rem;
  }

  .contact-page__content {
    padding: 2rem 1rem;
  }
}
```

---

## Step 8: Update ContactPage in Routing

**File**: `src/components/pages/ContactPage.tsx` (if not already created)

Ensure `ContactPage` is imported and used in your routing:

**File**: `src/routes/AppRoutes.tsx` or `src/App.tsx`

```typescript
import ContactPage from './components/pages/ContactPage';

// In your routes:
<Route path="/contact" element={<ContactPage />} />
```

---

## Step 9: Testing Checklist

### Visual Testing
- [ ] Contact form displays correctly on all screen sizes
- [ ] Form fields are properly aligned and styled
- [ ] Error messages appear in the correct position
- [ ] Success/error notifications are visible
- [ ] FAQ accordion expands/collapses smoothly
- [ ] Host info card displays all information
- [ ] Quick info sidebar shows house rules data

### Functional Testing
- [ ] Form validation works for all fields
- [ ] Required fields cannot be submitted empty
- [ ] Email validation works correctly
- [ ] Phone validation allows optional input
- [ ] Character counter updates in real-time
- [ ] Form can be submitted successfully
- [ ] Form resets after successful submission
- [ ] FAQ items expand and collapse correctly
- [ ] Host information pulls from propertyData
- [ ] Quick info pulls from houseRules

### Data Integrity Testing
- [ ] All FAQ items are generated from house rules
- [ ] Host information matches propertyData
- [ ] No hard-coded strings in components
- [ ] Email is never exposed in UI
- [ ] All text is sourced from data modules

### Accessibility Testing
- [ ] All form fields have proper labels
- [ ] Error messages are announced to screen readers
- [ ] Keyboard navigation works throughout form
- [ ] Focus states are visible
- [ ] FAQ buttons have proper aria-expanded attributes
- [ ] Color contrast meets WCAG standards

### Responsive Testing
- [ ] Layout adapts from 320px to 1920px
- [ ] Form is usable on mobile devices
- [ ] FAQ accordion works on touch devices
- [ ] Grid switches to single column on mobile
- [ ] All content is readable on small screens

---

## Step 10: Email Service Integration (Future)

**Note**: Currently, the form logs data to console. For production, integrate with:

### Option 1: EmailJS
```bash
npm install @emailjs/browser
```

### Option 2: Netlify Forms
Add `netlify` attribute to form tag.

### Option 3: Custom Backend API
Create an API endpoint that sends emails to `architect@pulseroi.com`.

**Security Note**: NEVER expose `architect@pulseroi.com` in:
- Client-side code
- HTML markup
- JavaScript variables
- Network requests visible in DevTools

---

## Completion Checklist

- [ ] All TypeScript types extended in `src/types/index.ts`
- [ ] `contactUtils.ts` created with validation functions
- [ ] `faqUtils.ts` created with FAQ generation logic
- [ ] `ContactForm` component implemented with full validation
- [ ] `FAQSection` component implemented with accordion
- [ ] `HostInfoCard` component implemented
- [ ] `ContactPage` assembled with all components
- [ ] CSS styles completed for all components
- [ ] ContactPage added to routing
- [ ] All components tested on multiple screen sizes
- [ ] Form validation tested with various inputs
- [ ] FAQ data confirmed to pull from house rules
- [ ] Host info confirmed to pull from propertyData
- [ ] No console errors or warnings
- [ ] Code reviewed for data-driven approach
- [ ] Email address confirmed NOT exposed in UI

---

## Success Criteria

✅ **Contact form is fully functional** with validation  
✅ **FAQ section auto-generates** from house rules data  
✅ **Host information displays** from propertyData  
✅ **No hard-coded content** - all from data modules  
✅ **Email address is hidden** from public view  
✅ **Responsive design** works on all devices  
✅ **Accessibility standards** met (WCAG AA)  
✅ **Form submission** prepared for email service integration

---

## Next Steps (Sprint 5 Preview)

After completing Sprint 4, the next phase will focus on:
- Polish & optimization
- Performance improvements
- Accessibility audit
- Cross-browser testing
- SEO optimization
- Final deployment preparation

---

## Notes & Tips

1. **Data-First Approach**: Always pull from data modules, never hard-code
2. **Validation UX**: Show errors only after user interaction (touched fields)
3. **Accessibility**: Use semantic HTML and proper ARIA attributes
4. **Performance**: FAQ component only renders expanded answers when needed
5. **Security**: Keep email address server-side only
6. **Future**: Prepare structure for easy email service integration

---

**Sprint 4 Status**: Ready to implement  
**Estimated Time**: 6-8 hours  
**Dependencies**: Sprint 3 complete, propertyData.ts available

import { contactConfig } from '../data/contactConfig';
import type { ContactFormData, ContactFormErrors } from '../types';

/**
 * Validate email format using a simple regex
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (optional) allowing digits and basic separators
 */
export const isValidPhone = (phone: string): boolean => {
  if (!phone || phone.trim() === '') return true;
  const phoneRegex = /^[-\d\s()+.]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Sanitize user input to limit XSS vectors
 */
export const sanitizeInput = (input: string): string =>
  input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

/**
 * Validate an individual field and return the error string (if any)
 */
export const validateField = (
  name: keyof ContactFormData,
  value: string
): string | undefined => {
  const trimmed = value?.trim() ?? '';
  switch (name) {
    case 'name':
      if (!trimmed || trimmed.length < 2) return 'Name must be at least 2 characters';
      if (trimmed.length > 50) return 'Name must be less than 50 characters';
      break;
    case 'email':
      if (!trimmed) return 'Email is required';
      if (!isValidEmail(trimmed)) return 'Please enter a valid email address';
      break;
    case 'phone':
      if (trimmed && !isValidPhone(trimmed)) return 'Please enter a valid phone number';
      break;
    case 'subject':
      if (!trimmed || trimmed.length < 3) return 'Subject must be at least 3 characters';
      if (trimmed.length > 100) return 'Subject must be less than 100 characters';
      break;
    case 'message':
      if (!trimmed || trimmed.length < 10) return 'Message must be at least 10 characters';
      if (trimmed.length > contactConfig.maxMessageLength) {
        return `Message must be less than ${contactConfig.maxMessageLength} characters`;
      }
      break;
    default:
      break;
  }
  return undefined;
};

/**
 * Validate the entire form object
 */
export const validateForm = (formData: ContactFormData): ContactFormErrors => {
  const errors: ContactFormErrors = {};
  (Object.keys(formData) as Array<keyof ContactFormData>).forEach((key) => {
    const error = validateField(key, formData[key] || '');
    if (error) {
      errors[key] = error;
    }
  });
  return errors;
};

/**
 * Simple helper to know if errors object has any entries
 */
export const hasFormErrors = (errors: ContactFormErrors): boolean =>
  Object.keys(errors).length > 0;

/**
 * Trim and sanitize user data for submission
 */
export const formatFormDataForSubmission = (formData: ContactFormData) => ({
  name: sanitizeInput(formData.name.trim()),
  email: sanitizeInput(formData.email.trim().toLowerCase()),
  phone: formData.phone ? sanitizeInput(formData.phone.trim()) : '',
  subject: sanitizeInput(formData.subject.trim()),
  message: sanitizeInput(formData.message.trim()),
  timestamp: new Date().toISOString(),
  recipient: contactConfig.recipientEmail,
});

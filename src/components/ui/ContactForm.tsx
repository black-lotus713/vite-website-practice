import { useState, type ChangeEvent, type FormEvent } from 'react';
import './ContactForm.css';
import type {
  ContactFormData,
  ContactFormErrors,
  FormSubmissionStatus,
} from '../../types';
import {
  validateForm,
  hasFormErrors,
  formatFormDataForSubmission,
  validateField,
} from '../../utils/contactUtils';
import { contactConfig } from '../../data/contactConfig';

const fieldOrder: Array<keyof ContactFormData> = ['name', 'email', 'phone', 'subject', 'message'];
const requiredFields = new Set(contactConfig.requiredFields);

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Set<keyof ContactFormData>>(new Set());
  const [status, setStatus] = useState<FormSubmissionStatus>('idle');

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof ContactFormData;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (touched.has(fieldName)) {
      const fieldError = validateField(fieldName, value);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: fieldError,
      }));
    }
  };

  const handleBlur = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = event.target.name as keyof ContactFormData;
    setTouched((prev) => {
      const updated = new Set(prev);
      updated.add(fieldName);
      return updated;
    });

    const fieldError = validateField(fieldName, formData[fieldName] || '');
    setErrors((prev) => ({
      ...prev,
      [fieldName]: fieldError,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTouched(new Set(fieldOrder));
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (hasFormErrors(validationErrors)) {
      return;
    }

    setStatus('submitting');

    try {
      const submissionPayload = formatFormDataForSubmission(formData);
      // Placeholder for real API integration
      console.info('Contact form submitted', {
        subject: submissionPayload.subject,
        timestamp: submissionPayload.timestamp,
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
      setTouched(new Set());
    } catch (error) {
      console.error('Contact form submission failed', error);
      setStatus('error');
    }
  };

  const showError = (field: keyof ContactFormData) => touched.has(field) && !!errors[field];

  const getAriaLiveStatus = () => (status === 'success' || status === 'error' ? 'polite' : 'off');

  return (
    <div className="contact-form" aria-live={getAriaLiveStatus()}>
      <div className="contact-form__header">
        <h2>Send Us a Message</h2>
        <p>
          Have questions about availability, policies, or planning your stay? Let us know how we can help.
        </p>
      </div>

      {status === 'success' && (
        <div className="contact-form__success">
          <p>Success: Thank you for your message! We typically reply within 24 hours.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="contact-form__error">
          <p>Error: Something went wrong sending your message. Please try again shortly.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {fieldOrder.map((field) => {
          const isTextarea = field === 'message';
          const isRequired = requiredFields.has(field);
          const fieldValue = formData[field] ?? '';
          const labelMap: Record<keyof ContactFormData, string> = {
            name: 'Name',
            email: 'Email',
            phone: 'Phone (optional)',
            subject: 'Subject',
            message: 'Message',
          };

          return (
            <div className="contact-form__field" key={field}>
              <label htmlFor={field}>
                {labelMap[field]} {isRequired && <span className="required">*</span>}
              </label>
              {isTextarea ? (
                <textarea
                  id={field}
                  name={field}
                  value={fieldValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={showError(field) ? 'error' : ''}
                  disabled={status === 'submitting'}
                  rows={6}
                  maxLength={contactConfig.maxMessageLength}
                  required={isRequired}
                />
              ) : (
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  id={field}
                  name={field}
                  value={fieldValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={showError(field) ? 'error' : ''}
                  disabled={status === 'submitting'}
                  required={isRequired}
                />
              )}
              {field === 'message' && (
                <span className="contact-form__char-count">
                  {formData.message.length} / {contactConfig.maxMessageLength}
                </span>
              )}
              {showError(field) && (
                <span className="contact-form__field-error">{errors[field]}</span>
              )}
            </div>
          );
        })}

        <button type="submit" className="contact-form__submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

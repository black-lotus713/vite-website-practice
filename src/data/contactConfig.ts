import type { ContactConfig } from '../types';

export const contactConfig: ContactConfig = {
  recipientEmail: 'architect@pulseroi.com',
  emailServiceEndpoint: '',
  maxMessageLength: 1000,
  requiredFields: ['name', 'email', 'subject', 'message'],
};

export const getContactConfig = () => contactConfig;

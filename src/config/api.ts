// API Configuration for Cravebuster
// This file helps manage API keys and configuration

export const API_CONFIG = {
  // Groq AI API Configuration
  GROQ: {
    API_KEY: process.env.EXPO_PUBLIC_GROQ_API_KEY,
    BASE_URL: 'https://api.groq.com',
    MODEL: 'llama-3.3-70b-versatile'
  },
  
  // Check if API is properly configured
  isConfigured: () => {
    return !!process.env.EXPO_PUBLIC_GROQ_API_KEY;
  },
  
  // Get API key with validation
  getApiKey: () => {
    const key = process.env.EXPO_PUBLIC_GROQ_API_KEY;
    if (!key) {
      throw new Error('Groq API key not configured. Please set EXPO_PUBLIC_GROQ_API_KEY in your .env file.');
    }
    return key;
  },
};

// Helper function to validate API configuration
export const validateApiConfig = () => {
  if (!API_CONFIG.isConfigured()) {
    console.warn('⚠️ Groq API key not configured. AI features will use fallback recipes.');
    return false;
  }
  return true;
};

// Error messages for common API issues
export const API_ERRORS = {
  NO_API_KEY: 'API key not configured. Please set up your Groq API key.',
  INVALID_API_KEY: 'Invalid API key. Please check your Groq API key.',
  RATE_LIMIT: 'Rate limit exceeded. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
}; 
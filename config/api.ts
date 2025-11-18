// Detect if we're on Replit by checking for REPL_ID environment variable
const isReplit = typeof process !== 'undefined' && process.env.REPL_ID;

// Determine base URL based on environment
function getBaseURL() {
  // If NEXT_PUBLIC_BASE_URL is explicitly set, use it
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  
  // For server-side rendering
  if (typeof window === 'undefined') {
    // On Replit, use port 5000
    if (isReplit) {
      return 'http://127.0.0.1:5000';
    }
    // Locally, use port 3000
    return 'http://localhost:3000';
  }
  
  // For client-side, use relative URLs (empty string means relative to current domain)
  return '';
}

const BASE_URL = getBaseURL();

// API URL - for client side it will be '/api/', for server side it will be full URL
export const API_URL = BASE_URL ? `${BASE_URL}/api/` : '/api/';

// Legacy exports for backward compatibility
export const URL = BASE_URL || (typeof window === 'undefined' ? 'http://localhost:3000' : '');
export const PROD_URL = "https://www.sringeri.net/";
export const IMAGE_PATH = "https://files.sringeri.net/";
export const NEXT_PUBLIC_BASE_URL = BASE_URL;

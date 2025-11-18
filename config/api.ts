// Base URL from environment variable
// For Replit: Set NEXT_PUBLIC_BASE_URL to your Replit URL (e.g., https://yourproject.replit.dev)
// For Local: Set NEXT_PUBLIC_BASE_URL to http://localhost:3000
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const PROD_URL = "https://www.sringeri.net/";
export const API_URL = `${BASE_URL}/api/`;
export const IMAGE_PATH = "https://files.sringeri.net/";

// Export BASE_URL for components that need it
export const NEXT_PUBLIC_BASE_URL = BASE_URL;

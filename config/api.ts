export const PROD_URL = "https://www.sringeri.net/";
export const DEV_URL = "http://127.0.0.1:5000/";
export const URL = process.env.NODE_ENV === "production" ? PROD_URL : DEV_URL;
export const PROD_API_URL = "https://www.sringeri.net/api/";
export const DEV_API_URL = "http://127.0.0.1:5000/api/";
export const API_URL = process.env.NODE_ENV === "production" ? PROD_API_URL : DEV_API_URL;

export const CLIENT_API_URL = process.env.NODE_ENV === "production" ? PROD_API_URL : "/api/";
export const IMAGE_PATH = "https://files.sringeri.net/";

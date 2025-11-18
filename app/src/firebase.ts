import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
// Uses environment variables on Replit, falls back to hardcoded values for local development
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBwCwACmbHrrKKBbT9sq5Qy6RcToolGqbo",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "sspwebsite-39f01.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "sspwebsite-39f01",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "sspwebsite-39f01.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "867097391950",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:867097391950:web:bf5e79e90fe42e3000a41f"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
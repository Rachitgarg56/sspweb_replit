import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwCwACmbHrrKKBbT9sq5Qy6RcToolGqbo",
  authDomain: "sspwebsite-39f01.firebaseapp.com",
  projectId: "sspwebsite-39f01",
  storageBucket: "sspwebsite-39f01.firebasestorage.app",
  messagingSenderId: "867097391950",
  appId: "1:867097391950:web:bf5e79e90fe42e3000a41f"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
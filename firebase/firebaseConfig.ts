// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDIAavLPwP5aEDAMjIhFZmgrd17tsQRhFc",
    authDomain: "zoop-5bd80.firebaseapp.com",
    projectId: "zoop-5bd80",
    storageBucket: "zoop-5bd80.firebasestorage.app",
    messagingSenderId: "213881238863",
    appId: "1:213881238863:web:e70d7eee74a87553d1013a",
    measurementId: "G-NBQRYJDNPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser)
let analytics;
try {
    if (typeof window !== 'undefined') {
        analytics = getAnalytics(app);
    }
} catch (error) {
    console.log('Analytics not available:', error);
}

// Get a reference to the Firestore service with explicit settings
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

console.log('🔥 Firebase initialized successfully');
console.log('📄 Firestore database region: us-central1 (default)');
console.log('🔐 Auth domain:', firebaseConfig.authDomain);

export { auth, db }; // Export the Auth and Firestore instances for use throughout your app

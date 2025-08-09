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
    apiKey: "AIzaSyDXOIquSPskMpY7r12X92PAmu3YSDFhrLI",
    authDomain: "zoop-5bd80.firebaseapp.com",
    projectId: "zoop-5bd80",
    storageBucket: "zoop-5bd80.firebasestorage.app",
    messagingSenderId: "213881238863",
    appId: "1:213881238863:web:e70d7eee74a87553d1013a",
    measurementId: "G-NBQRYJDNPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the Firestore service
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db }; // Export the Auth and Firestore instances for use throughout your app

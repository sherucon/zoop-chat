// // firebaseConfig.js (or wherever you initialize Firebase and export 'db')
// // import { initializeApp } from 'firebase/app';
// // import { getFirestore } from 'firebase/firestore';
// // const app = initializeApp(firebaseConfig);
// // export const db = getFirestore(app);

// // In your user management service or component file:
// import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
// import { db } from './firebaseConfig'; // Assuming 'db' is exported from your Firebase initialization file

// /**
//  * Adds a user document to the 'users' collection if a document with the given UID does not already exist.
//  * Uses the user's UID as the document ID and ensures default fields are always set for new users.
//  *
//  * @param {string} uid The Firebase Authentication User ID (UID) of the user.
//  * @param {object} initialUserData An optional object containing any other initial user data.
//  * @returns {Promise<boolean>} A promise that resolves to true if the user was added, false if they already existed or an error occurred.
//  */
// async function addUserIfNotExists(uid: string, initialUserData = {}) {
//     if (!uid) {
//         console.error("addUserIfNotExists: UID is required.");
//         return false;
//     }

//     // Define the required default fields for a new user
//     const defaultNewUserFields = {
//         username: "Zooper",
//         age: 0,
//         gender: "male",
//         lookingFor: "both",
//         // createdAt will be added with serverTimestamp()
//     };

//     // Create a reference to the specific user document using their UID as the document ID
//     const userDocRef = doc(db, "users", uid);

//     try {
//         // Attempt to get the document to check if it already exists
//         const userDocSnap = await getDoc(userDocRef);

//         if (userDocSnap.exists()) {
//             // User document already exists, no need to add a new one
//             console.log(`User with UID: ${uid} already exists. Not adding new document.`);
//             return false;
//         } else {
//             // User document does not exist, proceed to create it with default and provided data
//             console.log(`User with UID: ${uid} does not exist. Adding new document.`);

//             const newUserDocument = {
//                 uid: uid, // Always explicitly set UID within the document for easier querying
//                 ...initialUserData, // Spread any additional data passed in
//                 ...defaultNewUserFields, // Apply default fields, overriding any from initialUserData if conflict
//                 createdAt: serverTimestamp(), // Add a timestamp for when the user was created
//             };

//             await setDoc(userDocRef, newUserDocument);

//             console.log(`User with UID: ${uid} successfully added to Firestore.`);
//             return true;
//         }
//     } catch (error) {
//         console.error("Error adding user to Firestore:", error);
//         return false; // Return false on error
//     }
// }

// export default addUserIfNotExists;

// // --- How to use this updated function ---

// /*
// // Example usage, typically after a successful Firebase Authentication sign-up or login:
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// const auth = getAuth();

// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     // User is signed in.
//     // You can pass any *additional* data you might have from the auth process.
//     // For example, if you want to also store their email or display name from Firebase Auth:
//     const additionalAuthData = {
//       email: user.email,
//       displayName: user.displayName,
//       photoURL: user.photoURL,
//     };

//     const added = await addUserIfNotExists(user.uid, additionalAuthData);

//     if (added) {
//       console.log("New user profile created in Firestore with default values!");
//     } else {
//       console.log("Welcome back! User profile already exists.");
//       // If the user already exists, you might want to update a 'lastLogin' timestamp, for example.
//       // Or fetch their existing profile data to load it into your app state.
//     }
//   } else {
//     // User is signed out
//     console.log("No user signed in.");
//   }
// });
// */

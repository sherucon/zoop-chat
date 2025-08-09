// Utility functions for user data management in Firestore
import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Function to create a new user document if one doesn't exist
const createUserIfNotExists = async (user: User) => {
    try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            // User document doesn't exist, create it with default values
            const userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || 'Zooper',
                photoURL: user.photoURL || null,
                username: user.displayName || 'Zooper',
                age: 0,
                gender: 'male',
                lookingFor: 'both',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            await setDoc(userDocRef, userData);
            console.log('New user document created for:', user.email);
            return { created: true, userData };
        } else {
            console.log('User document already exists for:', user.email);
            return { created: false, userData: userDoc.data() };
        }
    } catch (error) {
        console.error('Error creating user document:', error);
        throw error;
    }
};

// Legacy function for manual user data addition (updated to use setDoc instead of addDoc)
const addUserData = async (user: User, customData?: any) => {
    try {
        const userDocRef = doc(db, 'users', user.uid);
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || 'Zooper',
            username: customData?.username || user.displayName || 'Zooper',
            age: customData?.age || 0,
            gender: customData?.gender || 'male',
            lookingFor: customData?.lookingFor || 'both',
            createdAt: new Date(),
            updatedAt: new Date(),
            ...customData, // Allow additional custom fields
        };

        await setDoc(userDocRef, userData, { merge: true }); // Use merge to avoid overwriting existing data
        console.log('User document created/updated for:', user.email);
        return userData;
    } catch (error) {
        console.error('Error adding/updating user document:', error);
        throw error;
    }
};

export { addUserData, createUserIfNotExists };


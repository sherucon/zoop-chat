import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';

// Initialize Firebase (add your config)
const firebaseConfig = {
    // Your Firebase config object
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export interface UserProfile {
    uid: string;
    username: string;
    age: number;
    gender: 'male' | 'female';
    lookingFor: 'male' | 'female' | 'both';
    createdAt: Date;
    updatedAt: Date;
}

const USERS_COLLECTION = 'users';

// Create user profile
export const createUserProfile = async (
    user: FirebaseAuthTypes.User,
    profileData: Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>
): Promise<void> => {
    try {
        const userProfile: UserProfile = {
            uid: user.uid,
            ...profileData,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await setDoc(doc(db, 'users', user.uid), userProfile);

        console.log('User profile created successfully');
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
    }
};

// Get user profile
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
        const docSnap = await getDoc(doc(db, 'users', uid));

        if (docSnap.exists()) {
            return docSnap.data() as UserProfile;
        } else {
            console.log('No user profile found');
            return null;
        }
    } catch (error) {
        console.error('Error getting user profile:', error);
        throw error;
    }
};

// Update user profile
export const updateUserProfile = async (
    uid: string,
    updates: Partial<Omit<UserProfile, 'uid' | 'createdAt'>>
): Promise<void> => {
    try {
        await setDoc(doc(db, 'users', uid), {
            ...updates,
            updatedAt: new Date(),
        }, { merge: true });

        console.log('User profile updated successfully');
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

// Delete user profile
export const deleteUserProfile = async (uid: string): Promise<void> => {
    try {
        await setDoc(doc(db, 'users', uid), {}, { merge: true });

        console.log('User profile deleted successfully');
    } catch (error) {
        console.error('Error deleting user profile:', error);
        throw error;
    }
};

// Get users by criteria (for matching/searching)
export const getUsersByCriteria = async (
    gender?: string,
    minAge?: number,
    maxAge?: number
): Promise<UserProfile[]> => {
    try {
        let q = query(collection(db, 'users'));

        if (gender) {
            q = query(q, where('gender', '==', gender));
        }
        if (minAge) {
            q = query(q, where('age', '>=', minAge));
        }
        if (maxAge) {
            q = query(q, where('age', '<=', maxAge));
        }

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => doc.data() as UserProfile);
    } catch (error) {
        console.error('Error getting users by criteria:', error);
        throw error;
    }
};

// Example usage - collection as a function, not a property
export const getUsersCollection = () => {
    return collection(db, 'users'); // collection(firestoreInstance, collectionPath)
};

export const getUserDoc = (userId: string) => {
    return doc(db, 'users', userId); // doc(firestoreInstance, collectionPath, documentId)
};

// Example: Add a document
export const addUser = async (userId: string, userData: any) => {
    const userDoc = doc(db, 'users', userId);
    await setDoc(userDoc, userData);
};

// Example: Get all users
export const getAllUsers = async () => {
    const usersCollection = collection(db, 'users');
    const snapshot = await getDocs(usersCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Example: Query users
export const getUsersByAge = async (age: number) => {
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('age', '==', age));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export { db };

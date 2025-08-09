import { doc, updateDoc } from 'firebase/firestore';
import { UserProfile } from '../app/components/AuthContext';
import { db } from './firebaseConfig';

// Function to update user profile data in Firestore
export const updateUserProfile = async (
    userId: string,
    updates: Partial<UserProfile>
): Promise<boolean> => {
    try {
        const userDocRef = doc(db, 'users', userId);

        // Add updated timestamp
        const updateData = {
            ...updates,
            updatedAt: new Date(),
        };

        await updateDoc(userDocRef, updateData);
        console.log(' User profile updated successfully');
        return true;
    } catch (error) {
        console.error('❌ Error updating user profile:', error);
        return false;
    }
};

// Specific update functions for convenience
export const updateUserAge = async (userId: string, age: number) => {
    return updateUserProfile(userId, { age });
};

export const updateUserGender = async (userId: string, gender: string) => {
    return updateUserProfile(userId, { gender });
};

export const updateUserLookingFor = async (userId: string, lookingFor: string) => {
    return updateUserProfile(userId, { lookingFor });
};

export const updateUserUsername = async (userId: string, username: string) => {
    return updateUserProfile(userId, { username });
};

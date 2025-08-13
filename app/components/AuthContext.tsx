import { User, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../../firebase/firebaseConfig';
import React = require('react');

// Define the user profile data structure
export interface UserProfile {
    uid: string;
    email: string | null;
    photoURL: string | null;
    username: string;
    age: number;
    gender: string;
    lookingFor: string;
    createdAt: Date;
    updatedAt: Date;
}

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    profileLoading: boolean;
    signOut: () => Promise<void>;
    refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
    profileLoading: true,
    signOut: async () => { },
    refreshUserProfile: async () => { },
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Test function to verify Firestore connectivity
export const testFirestoreConnection = async () => {
    console.log('🧪 Testing Firestore connection...');
    try {
        const testDocRef = doc(db, 'test', 'connection');
        await setDoc(testDocRef, {
            timestamp: new Date(),
            message: 'Test connection successful'
        });
        console.log(' Firestore connection test successful!');
        return true;
    } catch (error) {
        console.error('❌ Firestore connection test failed:', error);
        return false;
    }
};

// Function to create user document in Firestore if it doesn't exist
const createUserIfNotExists = async (user: User) => {
    console.log('🔄 Starting createUserIfNotExists for user:', user.email, 'UID:', user.uid);
    console.log('🔄 Database instance:', db ? 'Available' : 'Not available');
    console.log('🔄 Project ID:', db.app.options.projectId);

    try {
        const userDocRef = doc(db, 'users', user.uid);
        console.log('📄 Document reference created, path:', `users/${user.uid}`);
        console.log('📄 Checking if user document exists...');

        const userDoc = await getDoc(userDocRef);
        console.log('📄 getDoc completed successfully');

        if (!userDoc.exists()) {
            console.log('✨ User document does not exist, creating new document...');
            const userData = {
                uid: user.uid,
                email: user.email,
                // displayName: user.displayName || 'Zooper',
                photoURL: user.photoURL || null,
                username: 'Zooper',
                age: 0,
                gender: 'male',
                lookingFor: 'both',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            console.log('📊 About to save user data:', userData);
            await setDoc(userDocRef, userData);
            console.log('✅ New user document created successfully for:', user.email);
        } else {
            console.log('ℹ️ User document already exists for:', user.email);
            console.log('📊 Existing data:', userDoc.data());
        }
    } catch (error) {
        console.error('❌ Error creating user document:', error);

        if (error instanceof Error) {
            console.error('❌ Error name:', error.name);
            console.error('❌ Error message:', error.message);
            console.error('❌ Error stack:', error.stack);

            // Check for specific Firestore errors
            if (error.message.includes('permission-denied')) {
                console.error('🚫 PERMISSION DENIED: Check your Firestore security rules!');
                console.error('🔧 Suggested fix: Update Firestore rules to allow authenticated users to read/write');
            }

            if (error.message.includes('unavailable')) {
                console.error('🌐 SERVICE UNAVAILABLE: Firestore service might be down or unreachable');
            }

            if (error.message.includes('not-found')) {
                console.error('🔍 NOT FOUND: Database or collection might not exist');
            }
        }

        // Re-throw the error so calling code knows it failed
        throw error;
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(true);

    // Function to fetch user profile data from Firestore
    const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
        try {
            const userDocRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const data = userDoc.data();
                return {
                    uid: data.uid,
                    email: data.email,
                    photoURL: data.photoURL,
                    username: data.username,
                    age: data.age,
                    gender: data.gender,
                    lookingFor: data.lookingFor,
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date(),
                } as UserProfile;
            }
            return null;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    };

    // Function to refresh user profile data
    const refreshUserProfile = async () => {
        if (user) {
            setProfileLoading(true);
            const profile = await fetchUserProfile(user.uid);
            setUserProfile(profile);
            setProfileLoading(false);
        }
    };

    useEffect(() => {
        console.log('🔄 Setting up auth state listener...');
        const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
            console.log('🔄 Auth state changed:', user ? `User: ${user.email}, UID: ${user.uid}` : 'No user');

            if (user) {
                console.log('👤 User is signed in, creating user document if needed...');

                // Set user immediately for redirect to work
                setUser(user);
                setLoading(false);

                // Handle user document creation and profile fetching in background
                try {
                    await createUserIfNotExists(user);

                    // Fetch user profile data
                    setProfileLoading(true);
                    const profile = await fetchUserProfile(user.uid);
                    setUserProfile(profile);
                    setProfileLoading(false);

                    // Set up real-time listener for user profile updates
                    const userDocRef = doc(db, 'users', user.uid);
                    const unsubscribeProfile = onSnapshot(userDocRef, (doc) => {
                        if (doc.exists()) {
                            const data = doc.data();
                            setUserProfile({
                                uid: data.uid,
                                email: data.email,
                                photoURL: data.photoURL,
                                username: data.username,
                                age: data.age,
                                gender: data.gender,
                                lookingFor: data.lookingFor,
                                createdAt: data.createdAt?.toDate() || new Date(),
                                updatedAt: data.updatedAt?.toDate() || new Date(),
                            } as UserProfile);
                        }
                    });

                    // Return cleanup function for profile listener
                    return unsubscribeProfile;
                } catch (error) {
                    console.error('❌ Error in background user setup:', error);
                    console.error('❌ User registration/profile loading failed, but auth still works');
                    setProfileLoading(false);
                }
            } else {
                console.log('👤 No user signed in');
                setUser(null);
                setUserProfile(null);
                setLoading(false);
                setProfileLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            setUserProfile(null);
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            userProfile,
            loading,
            profileLoading,
            signOut,
            refreshUserProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


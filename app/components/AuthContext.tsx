import React, { createContext, useContext, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthContextType {
    user: FirebaseAuthTypes.User | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => { },
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            console.log('Auth state changed:', user ? `User: ${user.email}` : 'No user');
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signOut = async () => {
        try {
            await auth().signOut();
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

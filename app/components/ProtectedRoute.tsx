import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from './AuthContext';
import { Redirect } from 'expo-router';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();

    console.log('ProtectedRoute - Loading:', loading, 'User:', user ? user.email : 'No user');

    if (loading) {
        console.log('ProtectedRoute - Showing loading screen');
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!user) {
        console.log('ProtectedRoute - No user, redirecting to signin');
        return <Redirect href="/SignIn" />;
    }

    console.log('ProtectedRoute - User authenticated, showing protected content');
    return <>{children}</>;
};

export default ProtectedRoute;

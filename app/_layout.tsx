import { Stack } from 'expo-router';
import { AuthProvider } from './components/AuthContext';

export default function RootLayout() {
    console.log('Root layout rendering');

    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SignIn" />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </AuthProvider>
    );
}


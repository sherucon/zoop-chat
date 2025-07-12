import { Stack } from "expo-router";
import { Platform } from 'react-native';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false, }} />
        </Stack>
    );
}

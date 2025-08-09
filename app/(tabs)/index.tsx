import { Button, Text, View } from 'react-native';

import { useAuth } from '../components/AuthContext';

export default function HomeScreen() {
    const { signOut } = useAuth();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen</Text>
            <Button title="Sign Out (Test)" onPress={signOut} />
        </View>
    );
}

import { View, Text, Button } from 'react-native';

import { useAuth } from '../components/AuthContext';

export default function HomeScreen() {
    const { signOut } = useAuth();

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', top: 500 }}>
            <Text>Home Screen</Text>
            <Button title="Sign Out (Test)" onPress={signOut} />
        </View>
    );
}

import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import ProtectedRoute from '../components/ProtectedRoute';

export default function TabsLayout() {
    console.log('Tabs layout rendering');

    return (
        <ProtectedRoute>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#C0C0C0',
                    headerShown: true,
                    headerTitleStyle: { color: "#C0C0C0", },
                    headerStyle: { backgroundColor: '#2E2E2E', },
                    tabBarStyle: { backgroundColor: "#2E2E2E" }
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Chats',
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={24} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </ProtectedRoute>
    );
}

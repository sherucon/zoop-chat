// import React from 'react';
// import { Alert, View } from 'react-native';
// import { createUserIfNotExists } from '../../firebase/addUserData';
// import { testFirestoreConnection, useAuth } from './AuthContext';
// import PressableButton from './PressableButton';

// export default function DebugFirestore() {
//     const { user } = useAuth();

//     const handleTestConnection = async () => {
//         const result = await testFirestoreConnection();
//         Alert.alert('Test Result', result ? 'Connection successful!' : 'Connection failed!');
//     };

//     const handleManualCreateUser = async () => {
//         if (user) {
//             try {
//                 const result = await createUserIfNotExists(user);
//                 Alert.alert('Manual User Creation', result.created ? 'User created!' : 'User already exists!');
//             } catch (error) {
//                 const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//                 Alert.alert('Error', 'Failed to create user: ' + errorMessage);
//             }
//         } else {
//             Alert.alert('No User', 'Please sign in first');
//         }
//     };

//     if (!__DEV__) {
//         return null; // Only show in development
//     }

//     return (
//         <View style={{ position: 'absolute', bottom: 100, right: 20, gap: 10 }}>
//             <PressableButton
//                 label="Test Firestore"
//                 onPress={handleTestConnection}
//                 style={{ backgroundColor: '#ff6b6b', padding: 8 }}
//             />
//             <PressableButton
//                 label="Manual Create User"
//                 onPress={handleManualCreateUser}
//                 style={{ backgroundColor: '#4ecdc4', padding: 8 }}
//             />
//         </View>
//     );
// }

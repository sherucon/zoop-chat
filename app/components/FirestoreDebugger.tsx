// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import React, { useState } from 'react';
// import { Alert, Text, View } from 'react-native';
// import { db } from '../../firebase/firebaseConfig';
// import { useAuth } from './AuthContext';
// import PressableButton from './PressableButton';

// const FirestoreDebugger = () => {
//     const { user } = useAuth();
//     const [testing, setTesting] = useState(false);

//     const testFirestoreConnection = async () => {
//         setTesting(true);
//         console.log('🧪 Starting comprehensive Firestore test...');

//         try {
//             // Test 1: Basic write to test collection
//             console.log('🧪 Test 1: Basic write test...');
//             const testDoc = doc(db, 'test', 'connection-test');
//             await setDoc(testDoc, {
//                 timestamp: new Date(),
//                 message: 'Test write successful',
//                 userId: user?.uid || 'anonymous'
//             });
//             console.log('✅ Test 1 passed: Basic write successful');

//             // Test 2: Read the document back
//             console.log('🧪 Test 2: Basic read test...');
//             const readDoc = await getDoc(testDoc);
//             if (readDoc.exists()) {
//                 console.log('✅ Test 2 passed: Read successful, data:', readDoc.data());
//             } else {
//                 console.log('❌ Test 2 failed: Document not found after write');
//             }

//             // Test 3: Write to users collection
//             if (user) {
//                 console.log('🧪 Test 3: Write to users collection...');
//                 const userDoc = doc(db, 'users', `test-${user.uid}`);
//                 await setDoc(userDoc, {
//                     uid: user.uid,
//                     email: user.email,
//                     testDocument: true,
//                     timestamp: new Date()
//                 });
//                 console.log('✅ Test 3 passed: Users collection write successful');

//                 // Test 4: Read from users collection
//                 console.log('🧪 Test 4: Read from users collection...');
//                 const userRead = await getDoc(userDoc);
//                 if (userRead.exists()) {
//                     console.log('✅ Test 4 passed: Users collection read successful');
//                 } else {
//                     console.log('❌ Test 4 failed: Could not read from users collection');
//                 }
//             }

//             Alert.alert('Success!', 'All Firestore tests passed. Check console for details.');

//         } catch (error) {
//             console.error('❌ Firestore test failed:', error);

//             let errorMessage = 'Unknown error';
//             if (error instanceof Error) {
//                 errorMessage = error.message;

//                 if (error.message.includes('permission-denied')) {
//                     errorMessage = 'Permission denied - Check Firestore security rules';
//                 } else if (error.message.includes('unavailable')) {
//                     errorMessage = 'Service unavailable - Check internet connection';
//                 } else if (error.message.includes('not-found')) {
//                     errorMessage = 'Database not found - Check project configuration';
//                 }
//             }

//             Alert.alert('Firestore Test Failed', errorMessage);
//         }

//         setTesting(false);
//     };

//     if (!__DEV__) {
//         return null; // Only show in development
//     }

//     return (
//         <View style={{
//             position: 'absolute',
//             bottom: 50,
//             left: 20,
//             right: 20,
//             backgroundColor: 'rgba(0,0,0,0.8)',
//             padding: 15,
//             borderRadius: 10
//         }}>
//             <Text style={{ color: 'white', fontSize: 16, marginBottom: 10 }}>
//                 Firestore Debug Tools
//             </Text>
//             <PressableButton
//                 label={testing ? "Testing..." : "Test Firestore Connection"}
//                 onPress={testing ? () => { } : testFirestoreConnection}
//                 style={{
//                     backgroundColor: testing ? '#666' : '#007AFF',
//                     padding: 12
//                 }}
//             />
//             <Text style={{ color: '#999', fontSize: 12, marginTop: 5 }}>
//                 Check console for detailed logs
//             </Text>
//         </View>
//     );
// };

// export default FirestoreDebugger;

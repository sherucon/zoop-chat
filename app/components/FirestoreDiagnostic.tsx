// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import React, { useEffect, useState } from 'react';
// import { Alert, ScrollView, Text, View } from 'react-native';
// import { auth, db } from '../../firebase/firebaseConfig';
// import { useAuth } from './AuthContext';
// import PressableButton from './PressableButton';

// const FirestoreDiagnostic = () => {
//     const { user, loading } = useAuth();
//     const [testing, setTesting] = useState(false);
//     const [diagnosticInfo, setDiagnosticInfo] = useState<string[]>([]);

//     const addLog = (message: string) => {
//         console.log(message);
//         setDiagnosticInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
//     };

//     useEffect(() => {
//         addLog(`🔄 Auth loading: ${loading}`);
//         addLog(`👤 User exists: ${!!user}`);
//         if (user) {
//             addLog(`📧 User email: ${user.email}`);
//             addLog(`🔑 User UID: ${user.uid}`);
//         }
//     }, [user, loading]);

//     const runDiagnostics = async () => {
//         setTesting(true);
//         setDiagnosticInfo([]);

//         try {
//             // Step 1: Check Firebase Auth state
//             addLog('🔍 Step 1: Checking Firebase Auth');
//             addLog(`Auth instance: ${!!auth}`);
//             addLog(`Current user: ${!!auth.currentUser}`);
//             addLog(`Auth currentUser email: ${auth.currentUser?.email || 'None'}`);
//             addLog(`Auth currentUser UID: ${auth.currentUser?.uid || 'None'}`);

//             // Step 2: Check if user is properly authenticated
//             if (!user || !auth.currentUser) {
//                 addLog('❌ No authenticated user found');
//                 Alert.alert('Error', 'Please sign in first');
//                 setTesting(false);
//                 return;
//             }

//             // Step 3: Get ID Token to verify authentication
//             addLog('🔍 Step 2: Verifying authentication token');
//             try {
//                 const idToken = await auth.currentUser.getIdToken();
//                 addLog(`✅ ID Token obtained (length: ${idToken.length})`);
//             } catch (tokenError) {
//                 addLog(`❌ Failed to get ID token: ${tokenError}`);
//                 Alert.alert('Auth Error', 'Authentication token is invalid');
//                 setTesting(false);
//                 return;
//             }

//             // Step 4: Test basic Firestore connection
//             addLog('🔍 Step 3: Testing Firestore connection');
//             addLog(`Database instance: ${!!db}`);
//             addLog(`Project ID: ${db.app.options.projectId}`);

//             // Step 5: Try a simple write operation
//             addLog('🔍 Step 4: Attempting write to test collection');
//             const testDocRef = doc(db, 'test', `auth-test-${Date.now()}`);

//             await setDoc(testDocRef, {
//                 timestamp: new Date(),
//                 userId: user.uid,
//                 userEmail: user.email,
//                 test: 'permission-test'
//             });

//             addLog('✅ Write to test collection successful');

//             // Step 6: Try reading back
//             addLog('🔍 Step 5: Reading back from test collection');
//             const readDoc = await getDoc(testDocRef);
//             if (readDoc.exists()) {
//                 addLog('✅ Read from test collection successful');
//                 addLog(`Data: ${JSON.stringify(readDoc.data())}`);
//             } else {
//                 addLog('❌ Could not read document back');
//             }

//             // Step 7: Test users collection
//             addLog('🔍 Step 6: Testing users collection access');
//             const userDocRef = doc(db, 'users', user.uid);

//             await setDoc(userDocRef, {
//                 uid: user.uid,
//                 email: user.email,
//                 timestamp: new Date(),
//                 testAccess: true
//             });

//             addLog('✅ Write to users collection successful');
//             addLog('🎉 All diagnostics passed!');

//             Alert.alert('Success!', 'All Firestore operations successful. User registration should work now.');

//         } catch (error) {
//             addLog(`❌ Diagnostic failed: ${error}`);

//             if (error instanceof Error) {
//                 addLog(`Error name: ${error.name}`);
//                 addLog(`Error message: ${error.message}`);

//                 // Specific error handling
//                 if (error.message.includes('permission-denied')) {
//                     addLog('🚫 PERMISSION DENIED - This is a Firestore Rules issue');
//                     Alert.alert(
//                         'Permission Denied',
//                         'Your Firestore security rules are blocking access. Please check the Firebase Console and update your rules.',
//                         [
//                             { text: 'OK' },
//                             {
//                                 text: 'Show Rules',
//                                 onPress: () => Alert.alert(
//                                     'Firestore Rules Needed',
//                                     `Go to Firebase Console > Firestore > Rules and use:\n\nrules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /{document=**} {\n      allow read, write: if request.auth != null;\n    }\n  }\n}`
//                                 )
//                             }
//                         ]
//                     );
//                 } else if (error.message.includes('unauthenticated')) {
//                     addLog('🔐 UNAUTHENTICATED - User is not properly signed in');
//                     Alert.alert('Authentication Error', 'Please sign out and sign in again.');
//                 } else {
//                     Alert.alert('Unknown Error', error.message);
//                 }
//             }
//         }

//         setTesting(false);
//     };

//     if (!__DEV__) {
//         return null;
//     }

//     return (
//         <View style={{
//             position: 'absolute',
//             bottom: 20,
//             left: 10,
//             right: 10,
//             maxHeight: 300,
//             backgroundColor: 'rgba(0,0,0,0.9)',
//             padding: 15,
//             borderRadius: 10
//         }}>
//             <Text style={{ color: 'white', fontSize: 16, marginBottom: 10 }}>
//                 🔧 Firestore Diagnostic Tool
//             </Text>

//             <PressableButton
//                 label={testing ? "Running Diagnostics..." : "Run Full Diagnostic"}
//                 onPress={testing ? () => { } : runDiagnostics}
//                 style={{
//                     backgroundColor: testing ? '#666' : '#FF6B6B',
//                     padding: 12,
//                     marginBottom: 10
//                 }}
//             />

//             {diagnosticInfo.length > 0 && (
//                 <ScrollView style={{ maxHeight: 150 }}>
//                     {diagnosticInfo.map((log, index) => (
//                         <Text key={index} style={{
//                             color: log.includes('❌') ? '#ff6b6b' :
//                                 log.includes('✅') ? '#4ecdc4' : '#fff',
//                             fontSize: 10,
//                             marginBottom: 2
//                         }}>
//                             {log}
//                         </Text>
//                     ))}
//                 </ScrollView>
//             )}
//         </View>
//     );
// };

// export default FirestoreDiagnostic;

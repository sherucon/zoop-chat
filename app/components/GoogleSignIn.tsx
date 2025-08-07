import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { View } from "react-native";
import PressableButton from "./PressableButton";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
    webClientId: "213881238863-qc1k110d02g8p4kjg5arkibbl4saq4lt.apps.googleusercontent.com",
});

async function onGoogleButtonPress() {
    try {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        // Get the users ID token
        const userInfo = await GoogleSignin.signIn();

        // Check if sign-in was cancelled
        if (!userInfo || userInfo.type === 'cancelled') {
            alert("Sign In Cancelled");
            throw new Error('Google Sign-In was cancelled');
        }

        // Now we know userInfo is of type User, so we can safely access idToken
        const idToken = userInfo.data.idToken;

        if (!idToken) {
            throw new Error('No ID token found');
        }

        // Create a Google credential with the idToken
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        throw error;
    }
}


const clearAuth = async () => {
    try {
        await auth().signOut();
        await GoogleSignin.signOut();
        console.log('Successfully signed out');
    } catch (error) {
        console.error('Sign out error:', error);
    }
};

export default function GoogleSignIn() {
    const handleGoogleSignIn = async () => {
        try {
            await onGoogleButtonPress();
            console.log('Signed in with Google!');
        } catch (error) {
            console.error('Sign-in failed:', error);
        }
    };

    return (
        <View style={{ width: '90%', alignItems: 'center' }}>
            <PressableButton
                label='Login with Google'
                onPress={handleGoogleSignIn}
                icon={<FontAwesome name="google" size={24} color="#2E2E2E" />}
            />
        </View>
    );
}

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
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        const userInfo = await GoogleSignin.signIn();

        // Handle both new and old response structures
        const { idToken } = userInfo.data || userInfo;

        if (!idToken) {
            throw new Error('No ID token found');
        }

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        throw error;
    }
}

export default function GoogleSignIn() {
    const handleGoogleSignIn = async () => {
        try {
            await onGoogleButtonPress();
            console.log('Signed in with Google!');
        } catch (error) {
            console.error('Sign-in failed:', error);
            // Handle error appropriately (show alert, toast, etc.)
        }
    };

    return (
        <View>
            <PressableButton
                label='Login with Google'
                onPress={handleGoogleSignIn}
                icon={<FontAwesome name="google" size={24} color="#2E2E2E" />}
            />
        </View>
    );
}

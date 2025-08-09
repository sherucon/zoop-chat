import { Redirect } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, Modal, StyleSheet, View, } from "react-native";
import { useAuth } from "./components/AuthContext";
// import DebugFirestore from "./components/DebugFirestore";
import GoogleSignIn from "./components/GoogleSignIn";
import PressableButton from "./components/PressableButton";
import TermsAndConditions from "./components/TnC";
import TNCButton from "./components/TNCButton";


const Spacer = ({ size = 20 }) => <View style={{ height: size }} />;

const logo = require('@/assets/images/zoop-trans-logo.png');


export default function SignIn() {
    const { user, loading } = useAuth();
    let [TNCShown, setShowTNC] = useState<boolean>(false);

    console.log(' SignIn - Loading:', loading, 'User:', user ? user.email : 'No user');
    console.log(' SignIn - Should redirect:', !loading && user ? 'YES' : 'NO');

    // If user is authenticated, redirect to main app
    if (!loading && user) {
        console.log(' SignIn - User authenticated, redirecting to main app');
        return <Redirect href="/(tabs)" />;
    }

    console.log(' SignIn - Showing login screen');

    return (
        <View style={styles.Container}>
            <View>
                <Image source={logo} style={styles.HeroLogo} />
            </View>

            <Spacer size={270} />

            <GoogleSignIn />
            <TNCButton label='Terms and Conditions' onPress={() => setShowTNC(true)} />

            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Modal visible={TNCShown} transparent={true} animationType='slide'>
                    <View style={styles.ModalContainer}>
                        <TermsAndConditions />
                        <View style={{ padding: 10, }}>
                            <PressableButton style={{ width: '100%' }} label='Close' onPress={() => setShowTNC(false)} />
                        </View>
                    </View>
                </Modal>
            </View>
            {/* <DebugFirestore /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#2e2e2e',
        alignItems: 'center',
    },
    ModalContainer: {
        flex: 0,
        backgroundColor: '#2E2E2E',
        marginLeft: '5%',
        marginTop: '15%',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%',
        width: '90%',
        borderColor: "black",
        borderWidth: 2
    },
    HeroLogo: {
        top: 80,
        aspectRatio: 1,
        height: 0.45 * Dimensions.get('window').height,
    },
    TNCModal: {
        backgroundColor: '#C0C0C0',
        width: 0.8 * Dimensions.get('window').width,
        maxWidth: 300,
    },
    TNCButton: {
        padding: 10,
        backgroundColor: 'red',
    }
})

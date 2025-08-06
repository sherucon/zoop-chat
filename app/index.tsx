import { View, Text, StyleSheet, Dimensions, Image, Modal, Pressable } from "react-native";
import PressableButton from "./components/PressableButton";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from "react";


const Spacer = ({ size = 20 }) => <View style={{ height: size }} />;

const logo = require('@/assets/images/zoop-trans-logo.png');


export default function Index() {
    let [TNCShown, setShowTNC] = useState<boolean>(false);
    return (
        <View style={styles.Container}>
            <View>
                <Image source={logo} style={styles.HeroLogo} />
            </View>
            <Spacer size={270} />
            <PressableButton label='Login with Google'
                icon={<FontAwesome name="google" size={24} color="black" />} />
            <Modal visible={TNCShown} transparent={true} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.TNCModal}>
                    <Text>Nigga</Text>
                </View>
            </Modal>
            <Pressable style={styles.TNCButton} onPress={() => setShowTNC(true)}><Text>Terms and Conditions</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#2e2e2e',
        alignItems: 'center'
    },
    HeroLogo: {
        top: 80,
        aspectRatio: 1,
        height: 0.45 * Dimensions.get('window').height,
    },
    TNCModal: {
        backgroundColor: '#C0C0C0',
        width: 0.8 * Dimensions.get('window').width,
    },
    TNCButton: {
        padding: 10,
    }
})

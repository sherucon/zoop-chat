import { Text, View, StyleSheet, Dimensions, Image, Button, Alert } from "react-native";
import { Link } from 'expo-router';


const Spacer = ({ size = 20 }) => <View style={{ height: size }} />;


export default function Index() {
    return (
        <View style={styles.Container}>

            <Image style={{
                width: 0.25 * (Dimensions.get('window').width),
                height: 0.127 * (Dimensions.get('window').width),
            }} source={require('../assets/images/zoop-thin.png')} />
            <Text style={styles.GlowText}>anonymous random chat</Text>

            <Spacer size={40} />

            <Button title="Press Me" style={styles.Button} onPress={() => Alert.alert("Nigga")} />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#2e2e2e',
        alignItems: 'center',
        justifyContent: 'center',
    },

    Button: {
        color: 'white',
        backgroundColor: "#C0C0C0"
    },
    GlowText: {
        fontSize: 32,
        color: '#C0C0C0', // Silver color
        fontWeight: 'bold',
        textShadowColor: '#C0C0C0',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10, // Larger radius for more glow
    },
})

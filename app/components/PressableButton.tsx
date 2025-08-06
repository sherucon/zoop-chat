import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';

type Props = {
    label: string,
    onPress?: () => void,
    icon: React.ReactElement,
}

const Spacer = ({ size = 20 }) => <View style={{ width: size }} />;

export default function PressableButton({ label, onPress, icon }: Props) {
    return (
        <View style={styles.Container}>
            <Pressable onPress={onPress} style={styles.Pressable}>
                {icon}
                <Spacer size={10} />
                <Text style={{ color: '#2e2e2e' }}>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#C0C0C0",
        width: 0.9 * Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    Pressable: {
        borderRadius: 10,
        backgroundColor: "#C0C0C0",
        width: 0.9 * Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

})

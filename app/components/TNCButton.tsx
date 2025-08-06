import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';

type Props = {
    label: string,
    onPress?: () => void,
}


export default function TNCButton({ label, onPress, }: Props) {
    return (
        <View style={styles.Container}>
            <Pressable onPress={onPress} style={styles.Pressable}>
                <Text style={{ color: '#C0C0C0' }}>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#2e2e2e",
        width: 0.9 * Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    Pressable: {
        borderRadius: 10,
        backgroundColor: "#2e2e2e",
        width: 0.9 * Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

})

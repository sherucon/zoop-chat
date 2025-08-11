import { View, Text, Pressable, StyleSheet, } from 'react-native';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Props = {
    label: string,
    onPress?: () => void,
    icon?: React.ReactElement,
    style?: ViewStyle,
}

const Spacer = ({ size = 20 }) => <View style={{ width: size }} />;

export default function PressableButton({ label, onPress, icon, style }: Props) {
    return (
        <View style={styles.Container}>
            <Pressable onPress={onPress} style={[styles.Pressable, style]}>
                {icon}
                <Spacer size={10} />
                <Text style={{ color: '#2e2e2e', fontWeight: 'bold' }}>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        borderRadius: 15,
        maxWidth: 400,
        backgroundColor: "#C0C0C0",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    Pressable: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 15,
        backgroundColor: "#C0C0C0",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

})

import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '../components/AuthContext';


const placeholderpfp = require('@/assets/images/default_pfp.png');

const Spacer = ({ size = 20 }) => <View style={{ height: size }} />;

export default function profile() {

    const { user } = useAuth();

    let [pfp, setPfp] = useState<string | undefined>(undefined);

    return (
        <View style={styles.Container}>
            <Spacer size={40} />
            <Image source={pfp || placeholderpfp} style={{ height: 170, aspectRatio: 1 }} />
            <Spacer size={40} />
            <Text>{user?.displayName}</Text>
            <Spacer size={20} />
            <View></View>
        </View>
    )
}



const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#2E2E2E',
        alignItems: 'center'
    }
})

import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../components/AuthContext';
import PressableButton from '../components/PressableButton';
import SmallSelector from '../components/SmallSelector';
import { useUserProfile } from '../components/useUserProfile';


const placeholderpfp = require('@/assets/images/default_pfp.png');

const Spacer = ({ size = 20 }) => <View style={{ height: size }} />;

export default function profile() {

    const { signOut } = useAuth();

    const { user } = useAuth();
    const {
        userProfile,
        profileLoading,
        age,
        gender,
        lookingFor,
        username,
        updateAge,
        updateGender,
        updateLookingFor,
        updateUsername
    } = useUserProfile();

    console.log('User:', user);
    console.log('User Profile:', userProfile);

    let [pfp, setPfp] = useState<string | undefined>(undefined);
    const [localAge, setLocalAge] = useState<string>('');
    const [localUsername, setLocalUsername] = useState<string>(username || '');
    const abc = useRef<TextInput>(null);

    // Update local state when userProfile changes
    useEffect(() => {
        if (userProfile) {
            setLocalAge(age.toString());
            setLocalUsername(userProfile.username);
        }
    }, [age, username]);

    // Handle age update
    const handleAgeUpdate = async () => {
        const numAge = parseInt(localAge);
        if (!isNaN(numAge) && numAge > 0) {
            await updateAge(numAge);
        }
    };
    // Handle username update
    const handleUsernameUpdate = async () => {
        const trimmedUsername = localUsername.trim();
        if (trimmedUsername && trimmedUsername.length > 0) {
            await updateUsername(trimmedUsername);
        }
    };

    // Show loading indicator while profile is loading
    if (profileLoading) {
        return (
            <View style={[styles.Container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color="#C0C0C0" />
                <Text style={styles.Text}>Loading profile...</Text>
            </View>
        );
    }

    return (
        <View style={styles.Container}>
            <Spacer size={40} />
            <Image source={user?.photoURL ? { uri: user.photoURL } : placeholderpfp} style={{ height: 170, aspectRatio: 1, borderRadius: 85 }} />
            <Spacer size={10} />
            <Pressable style={{ padding: 5, flexDirection: 'row', gap: 4, alignItems: 'center' }} onPress={() => { abc.current?.focus(); }}>
                <TextInput
                    ref={abc}
                    style={styles.Text}
                    editable={true}
                    value={localUsername}
                    onChangeText={setLocalUsername}
                    onEndEditing={handleUsernameUpdate}
                    placeholder="Enter username"
                    placeholderTextColor="#808080"
                    autoCapitalize="none"
                />
                <Ionicons name="pencil" size={16} color="#C0C0C0" />
            </Pressable>
            <Spacer size={20} />
            <View style={styles.InputArea}>
                <View style={styles.InputField}>
                    <Text style={{ fontSize: 16, color: '#C0C0C0' }}>Age</Text>
                    <TextInput
                        editable={true}
                        value={localAge}
                        onChangeText={setLocalAge}
                        onEndEditing={handleAgeUpdate}
                        placeholder="Enter age"
                        placeholderTextColor="#808080"
                        keyboardType="numeric"
                        style={{ color: '#C0C0C0', fontSize: 16, minWidth: 60, textAlign: 'right', padding: 0 }}
                    />
                </View>
                <View style={styles.InputField}>
                    <Text style={{ fontSize: 16, color: '#C0C0C0' }}>I am</Text>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <SmallSelector
                            onPress={() => updateGender('male')}
                            icon={<Ionicons
                                name="male"
                                size={25}
                                color={gender === 'male' ? '#4A9EFF' : '#C0C0C0'}
                            />}
                        />
                        <SmallSelector
                            onPress={() => updateGender('female')}
                            icon={<Ionicons
                                name="female"
                                size={25}
                                color={gender === 'female' ? '#4A9EFF' : '#C0C0C0'}
                            />}
                        />
                    </View>
                </View>
                <View style={styles.InputField}>
                    <Text style={{ fontSize: 16, color: '#C0C0C0' }}>Looking for</Text>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <SmallSelector
                            onPress={() => updateLookingFor('male')}
                            icon={<Ionicons
                                name="male"
                                size={25}
                                color={lookingFor === 'male' ? '#4A9EFF' : '#C0C0C0'}
                            />}
                        />
                        <SmallSelector
                            onPress={() => updateLookingFor('female')}
                            icon={<Ionicons
                                name="female"
                                size={25}
                                color={lookingFor === 'female' ? '#4A9EFF' : '#C0C0C0'}
                            />}
                        />
                        <SmallSelector
                            onPress={() => updateLookingFor('both')}
                            icon={<Ionicons
                                name="male-female"
                                size={25}
                                color={lookingFor === 'both' ? '#4A9EFF' : '#C0C0C0'}
                            />}
                        />
                    </View>
                </View>

                {/* Display current values for debugging */}


            </View>
            <View style={{ flex: 1 / 2 }}>
                <Spacer size={40} />
                <PressableButton label="Sign out" onPress={signOut} style={{ width: '90%', alignSelf: 'center', borderRadius: 15 }}></PressableButton>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#2E2E2E',
        alignItems: 'center'
    },
    Text: {
        color: "#C0C0C0",
        fontSize: 20,
        padding: 0
    },
    InputArea: {
        flex: 1 / 2,
        width: '90%',

    },
    InputField: {
        flex: 1 / 3,
        flexDirection: 'row',
        backgroundColor: '#3E3E3E',
        padding: 15,
        borderRadius: 15,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between'

    }
})

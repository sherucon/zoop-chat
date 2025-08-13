import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../components/AuthContext';
import SmallSelector from '../components/SmallSelector';
import { useUserProfile } from '../components/useUserProfile';

const Spacer = ({ size = 20 }) => <View style={{ height: size }} />;

export default function profile() {
    const { user, signOut } = useAuth();
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
        updateUsername,
        updateUserPfp
    } = useUserProfile();


    const handleAgeUpdate = async () => {
        const numAge = parseInt(localAge);
        if (!isNaN(numAge) && numAge > 0 && numAge < 100) {
            await updateAge(numAge);
        }
    };
    const handleUsernameUpdate = async () => {
        const trimmedUsername = localUsername.trim();
        if (trimmedUsername && trimmedUsername.length > 0) {
            await updateUsername(trimmedUsername);
        }
    };


    const [pfp, setPfp] = useState<string | undefined>(undefined);
    const [localAge, setLocalAge] = useState<string>('');
    const [localUsername, setLocalUsername] = useState<string>(username || '');
    const usernameInputRef = useRef<TextInput>(null);




    const pickImageAsync = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Permission to access camera roll is required!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.5,
            aspect: [1, 1]
        });
        if (!result.canceled) {
            const selectedImageUri = result.assets[0].uri;

            try {
                // Upload to server
                const filename = selectedImageUri.split('/').pop() || 'upload.jpg';
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : 'image/jpeg';
                const formData = new FormData();
                formData.append('uuid', user?.uid || '');
                formData.append('pfp', {
                    uri: selectedImageUri,
                    name: filename,
                    type: type,
                } as any);
                const response = await fetch('https://sherucon.tech/uploadPfp', {
                    method: 'POST',
                    body: formData,
                });
                const text = await response.text();
                let data;
                try {
                    data = JSON.parse(text);
                } catch {
                    throw new Error('Server did not return valid JSON');
                }
                if (data.success) {
                    alert('Upload successful!');
                } else {
                    alert('Upload failed: ' + (data.error || 'Unknown error'));
                }
                // After successful upload, update Firestore with the hosted URL, not the local file path
                if (user?.uid) {
                    await updateUserPfp(`https://sherucon.tech/pfps/${user.uid}.webp`);
                }
            } catch (error) {
                alert('Upload error. Check console for details.');
            }

            setPfp(selectedImageUri);
        }
    };

    // Sync local state with userProfile
    useEffect(() => {
        if (userProfile) {
            setLocalAge(age.toString());
            setLocalUsername(userProfile.username);
            setPfp(`https://sherucon.tech/pfps/${userProfile.uid}.webp?t=${Date.now()}`);
        }
    }, [age, username, userProfile]);


    if (profileLoading) {
        return (
            <View style={[styles.Container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color="#C0C0C0" />
            </View>
        );
    }

    return (
        <View style={styles.Container}>
            <Spacer size={40} />
            <Pressable onPress={pickImageAsync}>
                <Image
                    source={{ uri: pfp }}
                    style={{
                        height: 170,
                        aspectRatio: 1,
                        borderRadius: 85,
                        borderWidth: 3,
                        borderColor: '#C0C0C0'
                    }}
                />
                <View style={{
                    position: 'absolute',
                    bottom: 5,
                    right: 5,
                    backgroundColor: '#C0C0C0',
                    borderRadius: 15,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <MaterialCommunityIcons name="account-edit" size={16} color="#2E2E2E" />
                </View>
            </Pressable>
            <Spacer size={10} />
            <Pressable style={{ padding: 5, flexDirection: 'row', gap: 4, alignItems: 'center' }} onPress={() => { usernameInputRef.current?.focus(); }}>
                <TextInput
                    ref={usernameInputRef}
                    style={styles.Text}
                    editable={true}
                    value={localUsername}
                    onChangeText={setLocalUsername}
                    onEndEditing={handleUsernameUpdate}
                    placeholder="Enter username"
                    placeholderTextColor="#808080"
                    autoCapitalize="none"
                />
            </Pressable>
            <Text style={{ fontSize: 10, color: '#C0C0C0' }}>{user?.email}</Text>

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
            </View>

        </View>
    );
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
        padding: 0,
        textDecorationLine: 'underline',
        textDecorationColor: '#5B5B5B'
    },
    InputArea: {
        flex: 1 / 2,
        width: '90%',

    },
    InputField: {
        flex: 1 / 3,
        flexDirection: 'row',
        backgroundColor: '#3E3E3E',
        paddingHorizontal: 15,
        borderRadius: 15,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

import { updateUserAge, updateUserGender, updateUserLookingFor, updateUserPfp, updateUserUsername } from '../../firebase/updateUserProfile';
import { useAuth } from './AuthContext';

// Custom hook to manage user profile data and updates
export const useUserProfile = () => {
    const { user, userProfile, profileLoading, refreshUserProfile } = useAuth();

    // Helper functions to update profile data
    const updateAge = async (age: number) => {
        if (!user) return false;
        const success = await updateUserAge(user.uid, age);
        if (success) {
            await refreshUserProfile();
        }
        return success;
    };

    const updateGender = async (gender: string) => {
        if (!user) return false;
        const success = await updateUserGender(user.uid, gender);
        if (success) {
            await refreshUserProfile();
        }
        return success;
    };

    const updateLookingFor = async (lookingFor: string) => {
        if (!user) return false;
        const success = await updateUserLookingFor(user.uid, lookingFor);
        if (success) {
            await refreshUserProfile();
        }
        return success;
    };

    const updateUsername = async (username: string) => {
        if (!user) return false;
        const success = await updateUserUsername(user.uid, username);
        if (success) {
            await refreshUserProfile();
        }
        return success;
    };

    const updateProfilePicture = async (photoURL: string): Promise<boolean> => {
        if (!user) return false;
        const success = await updateUserPfp(user.uid, photoURL);
        if (success) {
            await refreshUserProfile();
        }
        return success;

    }

    return {
        // Profile data
        userProfile,
        profileLoading,

        // Convenience getters
        age: userProfile?.age || 0,
        gender: userProfile?.gender || 'male',
        lookingFor: userProfile?.lookingFor || 'both',
        username: userProfile?.username || 'Zooper',

        // Update functions
        updateAge,
        updateGender,
        updateLookingFor,
        updateUsername,
        updateUserPfp: updateProfilePicture,
        refreshProfile: refreshUserProfile,
    };
};

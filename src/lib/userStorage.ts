import {storage} from "./storage.ts";
import axios from "axios";
import {IUserProfile} from "../types/profile.ts";
import {BASE_URL} from "../utils/axios.ts";

export const fetchUserProfile = async () => {
    axios.get(`${BASE_URL}/users/profile`)
        .then(res => {
            console.log("User profile fetched:", res.data.data);
            setUserProfile(res.data.data);
            return res.data.data;
        })
        .catch(error => {
            console.error("Error fetching user profile:", error.message);
            throw error;
        });
}

export const setUserProfile = (userProfile: IUserProfile) => {
    storage.set('userProfile', JSON.stringify(userProfile));
}

export const getUserProfile = () => {
    const userProfile = storage.getString('userProfile');
    return userProfile ? JSON.parse(userProfile) : null;
}

export const clearUserProfile = () => {
    storage.delete('userProfile');
};

export const resetForLogout = () => {
    storage.set('authToken', '');
    storage.set('profile_completed', false)
    clearUserProfile();
}

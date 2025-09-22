import {storage} from "./storage.ts";
import axios from "axios";
import {BASE_URL} from "../../test";
import {IUserProfile} from "../types/profile.ts";

export const fetchUserProfile = async () => {
    axios.get(`${BASE_URL}/users/profile`)
        .then(res => {
            console.log("User profile fetched:", res.data.data);
            setUserProfile(res.data.data);
            return res.data.data;
        })
        .catch(error => {
            console.error("Error fetching user profile:", error);
            throw error;
        });
}

export const setUserProfile = (userProfile: IUserProfile) => {
    storage.set('userProfile', JSON.stringify(userProfile));
}

export const getUserProfile = async () => {
    const userProfile = await storage.getString('userProfile');
    return userProfile ? JSON.parse(userProfile) : null;
}

export const clearUserProfile = () => {
    storage.delete('userProfile');
};

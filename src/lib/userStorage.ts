import {storage} from "./storage.ts";
import {IStudent} from "../types/type_student.ts";
import {studentService} from "../services/studentService.ts";
import Toast from "react-native-toast-message";

export const fetchUserProfile = async (id?: string) => {
    const userId = id ? id : JSON.parse(storage.getString('userProfile') || '')?.id

    studentService.getById(userId)
        .then(data=>{
            storage.set('userProfile', JSON.stringify(data));
        })
        .catch(error=>{
            Toast.show({
                type: "error",
                position: "top",
                text1: "Error fetching user profile",
                text2: error.message
            })
        })
}

export const getUserProfile = () => {
    const userProfile = storage.getString('userProfile');
    return userProfile ? JSON.parse(userProfile) : null as IStudent;
}

export const setUserProfile = (userProfile: IStudent) => {
    storage.set('userProfile', JSON.stringify(userProfile));
}

export const clearUserProfile = () => {
    storage.delete('userProfile');
};

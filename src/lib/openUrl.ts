import {Linking} from "react-native";
import Toast from "react-native-toast-message";

export const openURL = async (url) => {
    try {
        await Linking.openURL(url);
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Failed to open URL',
            text2: error.message || '',
            position: "top"
        })
    }
};

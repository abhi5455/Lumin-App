import axios from "axios";
import {storage} from "../lib/storage.ts";
import Toast from "react-native-toast-message";
import { BASE_URL as API_BASE_URL } from '@env';

export const BASE_URL = API_BASE_URL;

export default function AxiosInterceptor() {
    axios.interceptors.request.use(
        async (config) => {
            const token = storage.getString("authToken");
            if (token) {
                config.headers["Authorization"] = "Bearer " + token;
            }
            config.baseURL = BASE_URL;
            return config;
        },
        (error) => {
            console.log("error", error);
            Toast.show({ type: 'error', text1: error.message });
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async function (error) {
            if (error.response.status === 401) {
                storage.set('authToken', '');
                Toast.show({ type: 'error', text1: 'Session expired. Please login again.' });
                return Promise.reject(error);
            } else if (error.response.status === 503) {
                storage.set('authToken', '');
                Toast.show({ type: 'error', text1: error.message });
            }
            Toast.show({ type: 'error', text1: error.message });
            return Promise.reject(error);
        }
    );
}

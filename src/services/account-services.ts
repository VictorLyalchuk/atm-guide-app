import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ILogin } from '../types/auth';
import { APP_ENV } from "../env/config";

const apiUrl = APP_ENV.API_URL;

const instance = axios.create({
    baseURL: `${apiUrl}/api/AccountControllers`,
    headers: {
        "Content-Type": "application/json"
    }
});

export async function getToken() {
    const token = await AsyncStorage.getItem('token');
    return token;
}

export async function setToken(token: string) {
    await AsyncStorage.setItem("token", token);
}

export async function removeTokens() {
    await AsyncStorage.removeItem("token");
}

export async function refreshToken() {
    try {
        const localToken = await getToken();
        if (localToken) {
            const response = await instance.put("/refresh-token", {
                token: await getToken(),
            });
            const token = response.data;
            setToken(response.data);
            return token;
        }
    } catch (error) {
        console.error("Failed to refresh token:", error);
        throw error;
    }
}

export async function login(_user: ILogin) {
    try {
        const res = await instance.post(`Login`, _user);
        const { token } = res.data;
        await setToken(token);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Login request failed:', error.response?.data?.message || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}
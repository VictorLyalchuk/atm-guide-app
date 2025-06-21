import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ILogin } from '../types/auth';
import { APP_ENV } from "../env/config";

const apiUrl = APP_ENV.API_URL;

const instance = axios.create({
    baseURL: `${apiUrl}/api/Account`,
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
        if (axios.isAxiosError(error)) {
            const serverMessage = error.response?.data?.message;
            let userMessage = 'Сталася помилка';

            if (!error.response) {
                userMessage = 'Помилка мережі. Перевірте підключення до Інтернету.';
            } else {
                switch (error.response.status) {
                    case 400:
                        userMessage = serverMessage || 'Неправильний запит.';
                        break;
                    case 401:
                        userMessage = serverMessage || "Невірний логін або пароль.";
                        break;
                    case 500:
                        userMessage = 'Внутрішня помилка сервера.';
                        break;
                    default:
                        userMessage = serverMessage || `Помилка сервера: ${error.response.status}`;
                }
            }
            // Логування для дебагу
            // console.error('Failed to refresh token:', userMessage);
            // Проброс локалізованої помилки
            throw new Error(userMessage);
        } else {
            // console.error('Unexpected error:', error);
            throw new Error('Сталася непередбачена помилка');
        }
    }
}

export async function login(_user: ILogin) {
    try {
        const res = await instance.post(`Login`, _user);
        const { token } = res.data;
        await setToken(token);
        return token;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverMessage = error.response?.data?.message;
            let userMessage = 'Сталася помилка';

            if (!error.response) {
                userMessage = 'Помилка мережі. Перевірте підключення до Інтернету.';
            } else {
                switch (error.response.status) {
                    case 400:
                        userMessage = serverMessage || 'Неправильний запит.';
                        break;
                    case 401:
                        userMessage = serverMessage || "Невірний логін або пароль.";
                        break;
                    case 500:
                        userMessage = 'Внутрішня помилка сервера.';
                        break;
                    default:
                        userMessage = serverMessage || `Помилка сервера: ${error.response.status}`;
                }
            }
            // Логування для дебагу
            // console.error('Login request failed:', userMessage);
            // Проброс локалізованої помилки
            throw new Error(userMessage);
        } else {
            // console.error('Unexpected error:', error);
            throw new Error('Сталася непередбачена помилка');
        }
    }
}
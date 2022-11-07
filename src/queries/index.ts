import axios, {AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const axiosInstance = axios.create({
    baseURL: 'https://chalkak.shop',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});
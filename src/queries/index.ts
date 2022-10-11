import axios, {AxiosRequestConfig} from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://chalkak-env-1.eba-rbm59tk3.ap-northeast-2.elasticbeanstalk.com/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});
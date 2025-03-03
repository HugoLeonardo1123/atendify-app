import axios, { AxiosInstance } from 'axios';
import { CALENDLY_TOKEN } from '@env';


const calendlyAPI: AxiosInstance = axios.create({
    baseURL: 'https://api.calendly.com',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CALENDLY_TOKEN}`
    }
});

calendlyAPI.interceptors.request.use(
    config => {
        console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
        console.log('Using headers:', {
            ...config.headers,
            Authorization: config.headers.Authorization
                ? 'Bearer ***censored***'
                : 'No authorization header'
        });
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

calendlyAPI.interceptors.response.use(
    response => response,
    error => {
        console.log('Error details:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            url: error.config?.url,
            method: error.config?.method,
            headers: {
                ...error.config?.headers,
                Authorization: 'Bearer ***censored***'
            }
        });
        return Promise.reject(error);
    }
);

export default calendlyAPI;
import axios from 'axios';
import { BASE_URL, TIMEOUT } from './Constants';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': 'Bearer Token',
    }
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) =>{ 
        return Promise.reject(
            (error.response && error.response.data) || 'There is an error!'
        )
    }
);

/*

const http = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? 'Bearer ' + localStorage.getItem('access_token')
            : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});


http.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (typeof error.response === 'undefined') {
            alert('Error de conexión.');
            return Promise.reject(error);
        }

        if (error.response.status === 401 && originalRequest.url === baseURL + 'token/refresh/') {
            window.location.href = '/login/';
            return Promise.reject(error);
        }

        if (error.response.data.code === 'token_not_valid' && error.response.status === 401 && error.response.statusText === 'Unauthorized') {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
                const now = Math.ceil(Date.now() / 1000);
                console.log(tokenParts.exp);
                if (tokenParts.exp > now) {
                    return http
                        .post('/token/refresh/', { refresh: refreshToken })
                        .then((response) => {
                            localStorage.setItem('access_token', response.data.token.access);
                            localStorage.setItem('refresh_token', response.data.token.refresh);
                            http.defaults.headers['Authorization'] =
                                'Bearer ' + response.data.token.access;
                            originalRequest.headers['Authorization'] =
                                'Bearer ' + response.data.token.access;
                            return http(originalRequest);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    console.log('El token de refresco expiró.', tokenParts.exp, now);
                    window.location.href = '/login/';
                }
            } else {
                console.log('El token de refresco no está disponible.');
                window.location.href = '/login/';
            }
        }
        return Promise.reject(error);
    }
);

*/

export default axiosInstance;
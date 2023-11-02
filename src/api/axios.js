import axios from 'axios';
//const BASE_URL = 'http://localhost:5157/graphql';
const BASE_URL = 'https://gps-api-7.azurewebsites.net/graphql/';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
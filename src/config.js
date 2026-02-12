import axios from 'axios';

export const API_URL = 'http://localhost:8000/api';

export const ApiRequest = axios.create({
    baseURL: API_URL
})
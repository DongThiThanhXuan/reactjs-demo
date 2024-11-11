import axios from 'axios';
import { API_PORT } from './config';

const axiosClient = axios.create({
    baseURL: API_PORT,  // Cấu hình baseURL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;
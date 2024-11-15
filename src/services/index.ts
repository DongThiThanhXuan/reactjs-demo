import axios from 'axios';
import { API_PORT, TIMEOUT_REQUEST_MESSAGE, TIMEOUT_REQUEST_SERVER } from './config';

const axiosClient = axios.create({
    headers: { 'content-type': 'application/json' },
    timeout: TIMEOUT_REQUEST_SERVER,
    timeoutErrorMessage: TIMEOUT_REQUEST_MESSAGE,
    withCredentials: false,
    baseURL: API_PORT,
});

export default axiosClient;
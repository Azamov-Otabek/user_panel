import axios from "axios";
import Cookies from "js-cookie";

const https = axios.create({
    baseURL: "http://45.138.158.252:3000"
})

https.interceptors.request.use((config) => {
    let token = Cookies.get('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default https
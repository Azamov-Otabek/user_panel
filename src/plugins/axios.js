import axios from "axios";


const https = axios.create({
    baseURL: "http://45.138.158.252:3000"
})

https.interceptors.request.use((config) => {
    let token = localStorage.getItem("token");
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default https
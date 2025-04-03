'use strict'
import axios from 'axios'


const API = axios.create({
    baseURL: 'http://localhost:3056/v1/api',
    headers: { "Content-Type": "application/json" }
})

// Add Token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token) {
        config.headers["authorization"] = token
        config.headers["x-client-id"] = userId
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Handle Response Error
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response){
            console.error("API Error:", error.response.data);
            if (error.response.status === 401) {
                localStorage.removeItem("token");  // Xóa token nếu hết hạn
                window.location.href = "/login";   // Chuyển về trang đăng nhập
            }
        }
        return Promise.reject(error);
    }
)

export default API
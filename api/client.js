import axios from "axios";
import * as SecureStore from "expo-secure-store";


const api = axios.create({
    baseURL: "http://10.19.9.85:3000",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
})

// Attach token automatically

api.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync("accessToken")
        // console.log("➡️ REQUEST:", config.method?.toUpperCase(), config.url);
        // console.log("Headers:", config.headers);
        console.log("Body:", config.data);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;

    },
    (error) => Promise.reject(error)
)


// Global error handling

api.interceptors.response.use(

    (response) => response,
    (error) => {

        if (error.response?.status === 401) {
            // Optional: logout or refresh token
            console.log("Unauthorized — maybe token expired");
        }

        return Promise.reject(error);

    }
)


export default api;

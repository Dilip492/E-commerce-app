import api from "./client";

export const loginApi = (data) => {
    return api.post("/api/login", data);
}

export const registerApi = (data) => {
    return api.post("/api/register" , data)
}
export const verifyotp = (data) => {
    return api.post("/api/verify-otp" , data)
}

export const resendotp = (data) => {
    return api.post("/api/resend-otp" , data)
}
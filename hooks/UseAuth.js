import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { loginApi, registerApi, resendotp, verifyotp } from "../api/auth.api";


export const UseLogin = () => {
    const queryclient = useQueryClient();

    return useMutation({
        mutationFn: loginApi,
        onSuccess: () => {
            queryclient.invalidateQueries(['Login']);
        }

    })
}

export const UseRegister = () => {

    const queryclient = useQueryClient();

    return useMutation({
        mutationFn: registerApi,
        onSuccess: () => {
            queryclient.invalidateQueries(['Register']);
        }
    })
}


export const UseVerifyOtp = () => {

    const queryclient = useQueryClient();

    return useMutation({
        mutationFn: verifyotp,
        onSuccess: () => {
            queryclient.invalidateQueries(['Verifyotp']);
        }
    })

}

export const UseResendOtp = () => {
    const queryclient = useQueryClient();
    return useMutation({
        mutationFn: resendotp,
        onSuccess: () => {
            queryclient.invalidateQueries(['Resendotp']);
        }
    })
}


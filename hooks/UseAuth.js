import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { loginApi, registerApi } from "../api/auth.api";


export const UseLogin = () => {
    const queryclient = useQueryClient();

    return useMutation({
        mutationFn: loginApi,
        onSuccess: () => {
            queryclient.invalidateQueries(['Login']);
        }

    })
}


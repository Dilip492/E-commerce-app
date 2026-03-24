import api from './client'

export const getUser = () => {
    return api.get("/api/user/me")
}
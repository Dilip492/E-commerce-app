import api from './client'


export const addTowishlist = (productId) => {
    return api.post("/api/user/wishlist", { productId: productId })
}

export const getwishlist = () => {
    return api.get("/api/user/wishlist")
}


export const removewishlist = (id) => {
    return api.delete(`/api/user/wishlist/${id}`)
}
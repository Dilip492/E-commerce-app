import api from './client';


export const addTowishlist = (productId) => {
    console.log("API FUNCTION CALLED");
    console.log("Sending:", productId);
    return api.post("/api/user/wishlist", { productId })
}

export const getwishlist = () => {
    return api.get("/api/user/wishlist")
}

export const removewishlist = (productId) => {
    return api.delete(`/api/user/wishlist/${productId}`)
}
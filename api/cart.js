import api from "./client";


export const getCart = async () => {
    const res = await api.get("/api/cart")
    return res.data;
}

export const addTocart = (data) => {
    console.log("SENDING DATA:", data); // debug
    return api.post("/api/cart/add", data)
}

export const removeTocart = (id) => {
    return api.delete(`/api/cart/remove/${id}`)
}

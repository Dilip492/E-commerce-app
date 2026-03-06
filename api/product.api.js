import api from "./client"

export const productFetch = () =>{
   return api.get("/api/admin/Products")
} 

export const productDetailFetch = (id)=>{
   return api.get(`/api/admin/Products/${id}`)
}
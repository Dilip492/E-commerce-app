import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addTocart, getCart, removeTocart } from "../api/cart";


export const useCart = () => {
   
    return useQuery({
        queryKey: ['cart'],
        queryFn: getCart
    })
}


export const useAddCart = () => {
    const queryclient = useQueryClient();

    return useMutation({
        mutationFn: addTocart,
        onSuccess: () => {
            queryclient.invalidateQueries(['cart'])
        }

    })
}


export const useRemoveCart = () => {
    const queryclient = useQueryClient();
    return useMutation({
        mutationFn: (id) => removeTocart(id),
        onSuccess: () => {
            queryclient.invalidateQueries(['cart'])
        }
    })
}
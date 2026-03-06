import { useEffect, useState } from "react";
import { productDetailFetch } from "../api/product.api";



export function useProduct(id) {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        productDetailFetch(id)
            .then(res => setProduct(res.data))
            .finally(() => setLoading(false));
    }, []);

    return { product, loading };
}
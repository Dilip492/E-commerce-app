import { useEffect, useState } from "react";
import { productFetch } from "../api/product.api";


export function useProducts() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        productFetch()
            .then(res => setProduct(res.data))
            .finally(() => setLoading(false));
    }, []);

    return { product, loading };
}
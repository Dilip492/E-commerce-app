import { useEffect, useState } from "react";
import { addTowishlist, removewishlist, wishlistfetch } from '../api/wishlist';

export default function UseWishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState();

    const getwishlist = async () => {
        try {
            const res = await wishlistfetch();
            setWishlist(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const addtowishlist = async (productId) => {
        try {
            const res = await addTowishlist(productId);
            setWishlist((prev) => [...prev, res.data]);
        } catch (error) {
            console.log("error from ", error);
        }
    }

    // DELETE remove from wishlist
    const removeFromWishlist = async (id) => {
        try {
            await removewishlist(id);
            setWishlist((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getwishlist();
    }, []);

    return {
        wishlist,
        setWishlist,
        loading,
        getwishlist,
        addtowishlist,
        removeFromWishlist,
    };


}


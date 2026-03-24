import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTowishlist, getwishlist, removewishlist } from "../api/wishlist";

export default function useWishlist() {
  const queryClient = useQueryClient();

  // ✅ GET wishlist
  const { data, isLoading, error } = useQuery({

    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await getwishlist();
      return res?.data || [];
    },
  });

  // ✅ ADD to wishlist
  const addMutation = useMutation({
    mutationFn: async (productId) => {
      const res = await addTowishlist(productId);
      // console.log("API Response:", res);
      return res;
    },

    // 🔥 Optimistic update (instant UI update)
    onMutate: async (productId) => {
      await queryClient.cancelQueries(["wishlist"]);

      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old = []) => [
        ...old,
        productId, // just store id if backend stores only id
      ]);

      return { previousWishlist };
    },

    onError: (err, productId, context) => {
      queryClient.setQueryData(["wishlist"], context.previousWishlist);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  // ✅ REMOVE from wishlist
  const removeMutation = useMutation({
    mutationFn: (id) => removewishlist(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries(["wishlist"]);

      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old = []) =>
        old.filter((item) =>
          (item._id || item) !== id // ✅ handles object + string
        )
      );

      return { previousWishlist };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["wishlist"], context.previousWishlist);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  return {
    wishlist: data || [],
    loading: isLoading,
    error,
    addtowishlist: addMutation.mutate,
    removeFromWishlist: removeMutation.mutate,
  };
}
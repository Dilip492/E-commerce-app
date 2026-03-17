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
    mutationFn: (productId) => addTowishlist(productId),

    // 🔥 Optimistic update (instant UI update)
    onMutate: async (productId) => {
      await queryClient.cancelQueries(["wishlist"]);

      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old = []) => [
        ...old,
        { _id: productId }, // keep structure consistent
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
        old.filter((item) => item._id !== id)
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
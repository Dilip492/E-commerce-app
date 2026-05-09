import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTowishlist, getwishlist, removewishlist } from "../api/wishlist";

export default function useWishlist() {
  const queryClient = useQueryClient();

  // ✅ GET wishlist
  const { data, isLoading, error } = useQuery({

    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await getwishlist();
      // console.log("REAL WISHLIST FROM BACKEND:", res);
      return res?.data || [];
    },
  });

  // ✅ ADD to wishlist
  const addMutation = useMutation({
    mutationFn: async (productId) => {
      // console.log("ADD MUTATION RUNNING");
      // console.log("ADDING:", productId);
      // console.log("ADD API CALL:", productId);
      const res = await addTowishlist(productId);
      // console.log("ADD RESPONSE:", res.data);

      // console.log("API Response:", res);
      return res;
    },

    // 🔥 Optimistic update (instant UI update)
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old = []) => [
        ...old,
        productId,
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
    mutationFn: async (productId) => {
      return await removewishlist(productId);
    },

    onMutate: async (productId) => {
      await queryClient.cancelQueries({
        queryKey: ["wishlist"],
      });

      const previousWishlist =
        queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(
        ["wishlist"],
        (old = []) =>
          old.filter((item) => {
            const currentId =
              item?._id?.toString() ||
              item?.toString();

            return currentId !== productId.toString();
          })
      );

      return { previousWishlist };
    },

    onError: (err, productId, context) => {
      queryClient.setQueryData(
        ["wishlist"],
        context.previousWishlist
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
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
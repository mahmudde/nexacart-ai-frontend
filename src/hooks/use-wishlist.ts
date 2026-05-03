import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { wishlistService } from "@/services/wishlist.service";
import { queryKeys } from "@/lib/query-keys";
import { getApiErrorMessage } from "@/lib/api-client";

export const useWishlist = (query: { page?: number; limit?: number } = {}) => {
  return useQuery({
    queryKey: queryKeys.wishlist.me(query),
    queryFn: () => wishlistService.getWishlist(query),
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wishlistService.addToWishlist,
    onSuccess: (response) => {
      toast.success(response.message || "Product added to wishlist");

      queryClient.invalidateQueries({
        queryKey: queryKeys.wishlist.me({ page: 1, limit: 12 }),
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wishlistService.removeFromWishlist,
    onSuccess: (response) => {
      toast.success(response.message || "Product removed from wishlist");

      queryClient.invalidateQueries({
        queryKey: queryKeys.wishlist.me({ page: 1, limit: 12 }),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.wishlist.me({ page: 1, limit: 20 }),
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
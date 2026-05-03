import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { WishlistItem } from "@/types";
import { createQueryString } from "@/utils/create-query-string";

export const wishlistService = {
  getWishlist: async (query: { page?: number; limit?: number } = {}) => {
    const queryString = createQueryString(query);

    const { data } = await apiClient.get<ApiResponse<WishlistItem[]>>(
      `/wishlist${queryString ? `?${queryString}` : ""}`
    );

    return data;
  },

  addToWishlist: async (productId: string) => {
    const { data } = await apiClient.post<ApiResponse<WishlistItem>>(
      `/wishlist/${productId}`
    );

    return data;
  },

  removeFromWishlist: async (productId: string) => {
    const { data } = await apiClient.delete<ApiResponse<null>>(
      `/wishlist/${productId}`
    );

    return data;
  },
};
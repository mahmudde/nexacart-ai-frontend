import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { Cart } from "@/types";

export const cartService = {
  getCart: async () => {
    const { data } = await apiClient.get<ApiResponse<Cart>>("/cart");
    return data;
  },

  addItem: async (payload: { productId: string; quantity: number }) => {
    const { data } = await apiClient.post<ApiResponse<Cart>>(
      "/cart/items",
      payload
    );

    return data;
  },

  updateItem: async (itemId: string, payload: { quantity: number }) => {
    const { data } = await apiClient.patch<ApiResponse<Cart>>(
      `/cart/items/${itemId}`,
      payload
    );

    return data;
  },

  removeItem: async (itemId: string) => {
    const { data } = await apiClient.delete<ApiResponse<Cart>>(
      `/cart/items/${itemId}`
    );

    return data;
  },

  clearCart: async () => {
    const { data } = await apiClient.delete<ApiResponse<Cart>>("/cart");
    return data;
  },
};
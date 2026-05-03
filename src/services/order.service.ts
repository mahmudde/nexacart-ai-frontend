import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { Order } from "@/types";
import { createQueryString } from "@/utils/create-query-string";

export type CreateOrderPayload = {
  shippingName: string;
  shippingPhone: string;
  shippingStreet: string;
  shippingCity: string;
  shippingCountry: string;
  shippingPostalCode: string;
};

export type MyOrdersQuery = {
  status?: string;
  paymentStatus?: string;
  page?: number;
  limit?: number;
};

export type AdminOrdersQuery = {
  status?: string;
  paymentStatus?: string;
  page?: number;
  limit?: number;
};

export const orderService = {
  createOrder: async (payload: CreateOrderPayload) => {
    const { data } = await apiClient.post<ApiResponse<Order>>(
      "/orders",
      payload
    );

    return data;
  },

  getMyOrders: async (query: MyOrdersQuery = {}) => {
    const queryString = createQueryString(query);

    const { data } = await apiClient.get<ApiResponse<Order[]>>(
      `/orders/my-orders${queryString ? `?${queryString}` : ""}`
    );

    return data;
  },

  getOrderById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`);

    return data;
  },

  getOrders: async (query: AdminOrdersQuery = {}) => {
    const queryString = createQueryString(query);

    const { data } = await apiClient.get<ApiResponse<Order[]>>(
      `/orders${queryString ? `?${queryString}` : ""}`
    );

    return data;
  },

  updateOrderStatus: async (id: string, status: string) => {
    const { data } = await apiClient.patch<ApiResponse<Order>>(
      `/orders/${id}/status`,
      { status }
    );

    return data;
  },
};
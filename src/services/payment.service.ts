import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";

export type CheckoutSessionResponse = {
  sessionId: string;
  url: string;
};

export const paymentService = {
  createCheckoutSession: async (orderId: string) => {
    const { data } = await apiClient.post<ApiResponse<CheckoutSessionResponse>>(
      "/payments/create-checkout-session",
      {
        orderId,
      }
    );

    return data;
  },
};

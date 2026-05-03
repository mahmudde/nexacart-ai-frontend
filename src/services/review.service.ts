import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { Review } from "@/types";
import { createQueryString } from "@/utils/create-query-string";

export type ReviewQuery = {
  page?: number;
  limit?: number;
};

export type CreateReviewPayload = {
  productId: string;
  rating: number;
  comment: string;
};

export type UpdateReviewPayload = {
  rating?: number;
  comment?: string;
};

export const reviewService = {
  getProductReviews: async (productId: string, query: ReviewQuery = {}) => {
    const queryString = createQueryString(query);

    const { data } = await apiClient.get<ApiResponse<Review[]>>(
      `/reviews/product/${productId}${queryString ? `?${queryString}` : ""}`
    );

    return data;
  },

  createReview: async (payload: CreateReviewPayload) => {
    const { data } = await apiClient.post<ApiResponse<Review>>(
      `/reviews/${payload.productId}`,
      {
        rating: payload.rating,
        comment: payload.comment,
      }
    );

    return data;
  },

  updateReview: async (id: string, payload: UpdateReviewPayload) => {
    const { data } = await apiClient.patch<ApiResponse<Review>>(
      `/reviews/${id}`,
      payload
    );

    return data;
  },

  deleteReview: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse<null>>(
      `/reviews/${id}`
    );

    return data;
  },
};

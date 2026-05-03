import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { NewsletterSubscriber } from "@/types";
import { createQueryString } from "@/utils/create-query-string";

export type NewsletterQuery = {
  search?: string;
  page?: number;
  limit?: number;
};

export const newsletterService = {
  subscribe: async (email: string) => {
    const { data } = await apiClient.post<ApiResponse<NewsletterSubscriber>>(
      "/newsletter/subscribe",
      { email }
    );

    return data;
  },

  getSubscribers: async (query: NewsletterQuery = {}) => {
    const queryString = createQueryString(query);

    const { data } = await apiClient.get<ApiResponse<NewsletterSubscriber[]>>(
      `/newsletter/subscribers${queryString ? `?${queryString}` : ""}`
    );

    return data;
  },

  deleteSubscriber: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse<null>>(
      `/newsletter/subscribers/${id}`
    );

    return data;
  },
};
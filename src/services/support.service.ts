import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { SupportMessage } from "@/types";
import { createQueryString } from "@/utils/create-query-string";

export type SupportMessagesQuery = {
  search?: string;
  isResolved?: string;
  page?: number;
  limit?: number;
};

export const supportService = {
  getMessages: async (query: SupportMessagesQuery = {}) => {
    const queryString = createQueryString(query);

    const { data } = await apiClient.get<ApiResponse<SupportMessage[]>>(
      `/support/messages${queryString ? `?${queryString}` : ""}`
    );

    return data;
  },

  markResolved: async (id: string) => {
    const { data } = await apiClient.patch<ApiResponse<SupportMessage>>(
      `/support/messages/${id}/resolve`
    );

    return data;
  },

  deleteMessage: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse<null>>(
      `/support/messages/${id}`
    );

    return data;
  },
};
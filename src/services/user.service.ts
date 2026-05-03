import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { User, UserRole, UserStatus } from "@/types";
import { createQueryString } from "@/utils/create-query-string";

export type UsersQuery = {
  search?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
};

export const userService = {
  getUsers: async (query: UsersQuery = {}) => {
    const queryString = createQueryString(query);

    const { data } = await apiClient.get<ApiResponse<User[]>>(
      `/users${queryString ? `?${queryString}` : ""}`
    );

    return data;
  },

  updateUserRole: async (id: string, role: UserRole) => {
    const { data } = await apiClient.patch<ApiResponse<User>>(
      `/users/${id}/role`,
      { role }
    );

    return data;
  },

  updateUserStatus: async (id: string, status: UserStatus) => {
    const { data } = await apiClient.patch<ApiResponse<User>>(
      `/users/${id}/status`,
      { status }
    );

    return data;
  },
};

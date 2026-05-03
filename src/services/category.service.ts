import { apiClient, publicApiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { Category } from "@/types";
import { createQueryString } from "@/utils/create-query-string";

export type CategoryQuery = {
  search?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
};

export type CreateCategoryPayload = {
  name: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
};

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;

export const categoryService = {
  getCategories: async (query: CategoryQuery = {}) => {
    const queryString = createQueryString(query);

    const { data } = await publicApiClient.get<ApiResponse<Category[]>>(
      `/categories${queryString ? `?${queryString}` : ""}`
    );

    return data;
  },

  getCategoryById: async (id: string) => {
    const { data } = await publicApiClient.get<ApiResponse<Category>>(
      `/categories/${id}`
    );

    return data;
  },

  createCategory: async (payload: CreateCategoryPayload) => {
    const { data } = await apiClient.post<ApiResponse<Category>>(
      "/categories",
      payload
    );

    return data;
  },

  updateCategory: async (id: string, payload: UpdateCategoryPayload) => {
    const { data } = await apiClient.patch<ApiResponse<Category>>(
      `/categories/${id}`,
      payload
    );

    return data;
  },

  deleteCategory: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse<null>>(
      `/categories/${id}`
    );

    return data;
  },
};
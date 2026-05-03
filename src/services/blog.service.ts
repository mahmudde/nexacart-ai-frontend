import { apiClient, publicApiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { Blog } from "@/types";
import { createQueryString } from "@/utils/create-query-string";

export type BlogQuery = {
  search?: string;
  isPublished?: boolean;
  page?: number;
  limit?: number;
};

export type CreateBlogPayload = {
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  isPublished?: boolean;
};

export type UpdateBlogPayload = Partial<CreateBlogPayload>;

export const blogService = {
  getBlogs: async (query: BlogQuery = {}) => {
    const queryString = createQueryString(query);

    const { data } = await publicApiClient.get<ApiResponse<Blog[]>>(
      `/blogs${queryString ? `?${queryString}` : ""}`
    );

    return data;
  },

  getBlogBySlug: async (slug: string) => {
    const { data } = await publicApiClient.get<ApiResponse<Blog>>(
      `/blogs/${slug}`
    );

    return data;
  },

  createBlog: async (payload: CreateBlogPayload) => {
    const { data } = await apiClient.post<ApiResponse<Blog>>("/blogs", payload);

    return data;
  },

  updateBlog: async (id: string, payload: UpdateBlogPayload) => {
    const { data } = await apiClient.patch<ApiResponse<Blog>>(
      `/blogs/${id}`,
      payload
    );

    return data;
  },

  deleteBlog: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse<null>>(`/blogs/${id}`);

    return data;
  },
};
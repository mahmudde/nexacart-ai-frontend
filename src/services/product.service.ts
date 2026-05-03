import { apiClient, publicApiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { Product } from "@/types";
import { createQueryString } from "@/utils/create-query-string";

export type ProductQuery = {
  search?: string;
  categoryId?: string;
  brand?: string;
  minPrice?: number | string;
  maxPrice?: number | string;
  minRating?: number | string;
  status?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

export type ProductImagePayload = {
  url: string;
  publicId: string;
  altText?: string | null;
};

export type ProductSpecificationPayload = {
  name: string;
  value: string;
};

export type CreateProductPayload = {
  name: string;
  shortDescription: string;
  description: string;
  brand: string;
  price: number;
  discountPrice?: number;
  stock: number;
  categoryId: string;
  tags: string[];
  images: ProductImagePayload[];
  specifications: ProductSpecificationPayload[];
  status: "ACTIVE" | "DRAFT" | "ARCHIVED";
};

export type UpdateProductPayload = Partial<CreateProductPayload>;

export const productService = {
  getProducts: async (query: ProductQuery = {}) => {
    const queryString = createQueryString(query);

    const { data } = await publicApiClient.get<ApiResponse<Product[]>>(
      `/products${queryString ? `?${queryString}` : ""}`
    );

    return data;
  },

  getTrendingProducts: async () => {
    const { data } = await publicApiClient.get<ApiResponse<Product[]>>(
      "/products/trending"
    );

    return data;
  },

  getProductBySlug: async (slug: string) => {
    const { data } = await publicApiClient.get<ApiResponse<Product>>(
      `/products/${slug}`
    );

    return data;
  },

  getRelatedProducts: async (id: string) => {
    const { data } = await publicApiClient.get<ApiResponse<Product[]>>(
      `/products/${id}/related`
    );

    return data;
  },

  createProduct: async (payload: CreateProductPayload) => {
    const { data } = await apiClient.post<ApiResponse<Product>>(
      "/products",
      payload
    );

    return data;
  },

  updateProduct: async (id: string, payload: UpdateProductPayload) => {
    const { data } = await apiClient.patch<ApiResponse<Product>>(
      `/products/${id}`,
      payload
    );

    return data;
  },

  deleteProduct: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse<null>>(
      `/products/${id}`
    );

    return data;
  },
};
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api-client";
import {
  productService,
  type ProductQuery,
  type CreateProductPayload,
  type UpdateProductPayload,
} from "@/services/product.service";
import { queryKeys } from "@/lib/query-keys";

export const useProducts = (query: ProductQuery = {}) => {
  return useQuery({
    queryKey: queryKeys.products.list(query),
    queryFn: () => productService.getProducts(query),
  });
};

export const useTrendingProducts = () => {
  return useQuery({
    queryKey: queryKeys.products.trending,
    queryFn: productService.getTrendingProducts,
  });
};

export const useProductDetails = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.products.detail(slug),
    queryFn: () => productService.getProductBySlug(slug),
    enabled: Boolean(slug),
  });
};

export const useRelatedProducts = (id: string) => {
  return useQuery({
    queryKey: queryKeys.products.related(id),
    queryFn: () => productService.getRelatedProducts(id),
    enabled: Boolean(id),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProductPayload) =>
      productService.createProduct(payload),
    onSuccess: (response) => {
      toast.success(response.message || "Product created successfully");

      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateProductPayload;
    }) => productService.updateProduct(id, payload),
    onSuccess: (response) => {
      toast.success(response.message || "Product updated successfully");

      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: (response) => {
      toast.success(response.message || "Product deleted successfully");

      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

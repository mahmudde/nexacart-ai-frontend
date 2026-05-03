import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  categoryService,
  type CategoryQuery,
  type CreateCategoryPayload,
  type UpdateCategoryPayload,
} from "@/services/category.service";
import { queryKeys } from "@/lib/query-keys";
import { getApiErrorMessage } from "@/lib/api-client";

export const useCategories = (query: CategoryQuery = {}) => {
  return useQuery({
    queryKey: queryKeys.categories.list(query),
    queryFn: () => categoryService.getCategories(query),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) =>
      categoryService.createCategory(payload),

    onSuccess: (response) => {
      toast.success(response.message || "Category created successfully");

      queryClient.invalidateQueries({
        queryKey: queryKeys.categories.all,
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateCategoryPayload;
    }) => categoryService.updateCategory(id, payload),

    onSuccess: (response) => {
      toast.success(response.message || "Category updated successfully");

      queryClient.invalidateQueries({
        queryKey: queryKeys.categories.all,
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.deleteCategory,

    onSuccess: (response) => {
      toast.success(response.message || "Category deleted successfully");

      queryClient.invalidateQueries({
        queryKey: queryKeys.categories.all,
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

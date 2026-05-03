import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  reviewService,
  type CreateReviewPayload,
  type ReviewQuery,
  type UpdateReviewPayload,
} from "@/services/review.service";
import { queryKeys } from "@/lib/query-keys";
import { getApiErrorMessage } from "@/lib/api-client";

export const useProductReviews = (
  productId: string,
  query: ReviewQuery = {}
) => {
  return useQuery({
    queryKey: queryKeys.reviews.product(productId, query),
    queryFn: () => reviewService.getProductReviews(productId, query),
    enabled: Boolean(productId),
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReviewPayload) =>
      reviewService.createReview(payload),

    onSuccess: (response, variables) => {
      toast.success(response.message || "Review submitted successfully");

      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.product(variables.productId, {
          page: 1,
          limit: 10,
        }),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateReviewPayload;
    }) => reviewService.updateReview(id, payload),

    onSuccess: (response) => {
      toast.success(response.message || "Review updated successfully");

      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewService.deleteReview,

    onSuccess: (response) => {
      toast.success(response.message || "Review deleted successfully");

      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

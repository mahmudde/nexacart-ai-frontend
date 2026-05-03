import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  newsletterService,
  type NewsletterQuery,
} from "@/services/newsletter.service";
import { queryKeys } from "@/lib/query-keys";
import { getApiErrorMessage } from "@/lib/api-client";

export const useNewsletterSubscribers = (query: NewsletterQuery = {}) => {
  return useQuery({
    queryKey: queryKeys.newsletter.subscribers(query),
    queryFn: () => newsletterService.getSubscribers(query),
  });
};

export const useDeleteNewsletterSubscriber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: newsletterService.deleteSubscriber,

    onSuccess: (response) => {
      toast.success(response.message || "Subscriber deleted");

      queryClient.invalidateQueries({
        queryKey: ["newsletter"],
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

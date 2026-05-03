import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  supportService,
  type SupportMessagesQuery,
} from "@/services/support.service";
import { queryKeys } from "@/lib/query-keys";
import { getApiErrorMessage } from "@/lib/api-client";

export const useSupportMessages = (query: SupportMessagesQuery = {}) => {
  return useQuery({
    queryKey: queryKeys.support.messages(query),
    queryFn: () => supportService.getMessages(query),
  });
};

export const useResolveSupportMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: supportService.markResolved,

    onSuccess: (response) => {
      toast.success(response.message || "Message marked as resolved");

      queryClient.invalidateQueries({
        queryKey: ["support"],
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useDeleteSupportMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: supportService.deleteMessage,

    onSuccess: (response) => {
      toast.success(response.message || "Message deleted");

      queryClient.invalidateQueries({
        queryKey: ["support"],
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

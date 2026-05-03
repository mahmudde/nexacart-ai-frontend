import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  aiService,
  type AiProductSuggestionPayload,
} from "@/services/ai.service";
import { getApiErrorMessage } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";

export const useGenerateProductSuggestions = () => {
  return useMutation({
    mutationFn: (payload: AiProductSuggestionPayload) =>
      aiService.generateProductSuggestions(payload),
    onSuccess: (response) => {
      toast.success(response.message || "AI suggestions generated");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useAiChat = () => {
  return useMutation({
    mutationFn: aiService.chat,
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useAdminAiInsights = () => {
  return useQuery({
    queryKey: queryKeys.ai.adminInsights,
    queryFn: aiService.getAdminInsights,
  });
};
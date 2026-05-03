import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { Product } from "@/types";

export type AiProductSuggestionPayload = {
  rawIdea: string;
  category?: string;
  targetAudience?: string;
  qualityLevel?: "budget" | "mid-range" | "premium";
};

export type AiProductSuggestion = {
  suggestedName: string;
  shortDescription: string;
  description: string;
  suggestedPrice: number;
  tags: string[];
  specifications: {
    name: string;
    value: string;
  }[];
  seoKeywords?: string[];
  note?: string;
};

export type AiChatResponse = {
  intent: string;
  answer: string;
  products: Product[];
};

export type AdminAiInsight = {
  summary: string;
  highlights: string[];
  risks: string[];
  recommendations: string[];
};

export const aiService = {
  generateProductSuggestions: async (payload: AiProductSuggestionPayload) => {
    const { data } = await apiClient.post<ApiResponse<AiProductSuggestion>>(
      "/ai/product-suggestions",
      payload
    );

    return data;
  },

  chat: async (message: string) => {
    const { data } = await apiClient.post<ApiResponse<AiChatResponse>>(
      "/ai/chat",
      {
        message,
      }
    );

    return data;
  },

  getAdminInsights: async () => {
    const { data } = await apiClient.get<ApiResponse<AdminAiInsight>>(
      "/ai/admin-insights"
    );

    return data;
  },
};
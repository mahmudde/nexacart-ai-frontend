import axios, { AxiosError } from "axios";
import { siteConfig } from "@/config/site";
import type { ApiErrorResponse } from "@/types/api.types";

export const publicApiClient = axios.create({
  baseURL: siteConfig.apiBaseUrl,
});

export const apiClient = axios.create({
  baseURL: siteConfig.apiBaseUrl,
  withCredentials: true,
});

export const getApiErrorMessage = (error: unknown) => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const responseData = error.response?.data;

    if (responseData?.errors && typeof responseData.errors === "object") {
      const firstErrorValue = Object.values(
        responseData.errors as Record<string, unknown>
      )[0];

      if (Array.isArray(firstErrorValue) && firstErrorValue[0]) {
        return String(firstErrorValue[0]);
      }

      if (typeof firstErrorValue === "string") {
        return firstErrorValue;
      }
    }

    return (
      responseData?.message ||
      error.message ||
      "Something went wrong. Please try again."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};

export type ApiAxiosError = AxiosError<ApiErrorResponse>;

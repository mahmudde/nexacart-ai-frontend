import { apiClient } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import type { ApiResponse } from "@/types/api.types";
import type { User } from "@/types";

export type UpdateProfilePayload = {
  name?: string;
  phone?: string;
  image?: string;
  street?: string;
  city?: string;
  country?: string;
  postalCode?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export const authService = {
  login: async (payload: LoginPayload) => {
    const { data } = await apiClient.post("/auth/sign-in/email", payload);
    return data;
  },

  register: async (payload: RegisterPayload) => {
    const { data } = await apiClient.post("/auth/sign-up/email", payload);
    return data;
  },

  socialLogin: async (provider: "google" | "facebook") => {
    const callbackURL =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback`
        : "/auth/callback";

    const errorCallbackURL =
      typeof window !== "undefined"
        ? `${window.location.origin}/login`
        : "/login";

    return authClient.signIn.social({
      provider,
      callbackURL,
      errorCallbackURL,
    });
  },

  getMe: async () => {
    const { data } = await apiClient.get<ApiResponse<User>>("/users/me");
    return data;
  },

  logout: async () => {
    const { data } = await apiClient.post("/auth/sign-out");
    return data;
  },

  updateProfile: async (payload: UpdateProfilePayload) => {
    const { data } = await apiClient.patch<ApiResponse<User>>(
      "/users/me",
      payload
    );

    return data;
  },
};
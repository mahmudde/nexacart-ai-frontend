import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  authService,
  type LoginPayload,
  type RegisterPayload,
} from "@/services/auth.service";
import { queryKeys } from "@/lib/query-keys";
import { getApiErrorMessage } from "@/lib/api-client";
import { getDashboardPath } from "@/utils/get-dashboard-path";

export const useMe = () => {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authService.getMe,
    retry: false,
  });
};

export const useAuthUser = () => {
  const query = useMe();

  return {
    user: query.data?.data,
    isLoading: query.isLoading,
    isAuthenticated: Boolean(query.data?.data),
    refetch: query.refetch,
  };
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: async () => {
      toast.success("Logged in successfully");

      const userResponse = await queryClient.fetchQuery({
        queryKey: queryKeys.auth.me,
        queryFn: authService.getMe,
      });

      const role = userResponse.data?.role;
      window.location.replace(getDashboardPath(role));
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: async () => {
      toast.success("Account created successfully");

      const userResponse = await queryClient.fetchQuery({
        queryKey: queryKeys.auth.me,
        queryFn: authService.getMe,
      });

      const role = userResponse.data?.role;
      window.location.replace(getDashboardPath(role));
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: async () => {
      await queryClient.clear();
      toast.success("Logged out successfully");
      window.location.replace("/");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (response) => {
      toast.success(response.message || "Profile updated successfully");

      queryClient.invalidateQueries({
        queryKey: queryKeys.auth.me,
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

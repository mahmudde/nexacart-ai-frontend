import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  userService,
  type UsersQuery,
} from "@/services/user.service";
import { queryKeys } from "@/lib/query-keys";
import { getApiErrorMessage } from "@/lib/api-client";
import type { UserRole, UserStatus } from "@/types";

export const useUsers = (query: UsersQuery = {}) => {
  return useQuery({
    queryKey: queryKeys.users.list(query),
    queryFn: () => userService.getUsers(query),
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      userService.updateUserRole(id, role),

    onSuccess: (response) => {
      toast.success(response.message || "User role updated");

      queryClient.invalidateQueries({
        queryKey: queryKeys.users.lists(),
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: UserStatus }) =>
      userService.updateUserStatus(id, status),

    onSuccess: (response) => {
      toast.success(response.message || "User status updated");

      queryClient.invalidateQueries({
        queryKey: queryKeys.users.lists(),
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
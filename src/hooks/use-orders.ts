import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  orderService,
  type AdminOrdersQuery,
  type CreateOrderPayload,
  type MyOrdersQuery,
} from "@/services/order.service";
import { queryKeys } from "@/lib/query-keys";
import { getApiErrorMessage } from "@/lib/api-client";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => orderService.createOrder(payload),
    onSuccess: (response) => {
      toast.success(response.message || "Order created successfully");

      queryClient.invalidateQueries({
        queryKey: queryKeys.cart.me,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.all,
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useMyOrders = (query: MyOrdersQuery = {}) => {
  return useQuery({
    queryKey: queryKeys.orders.mine(query),
    queryFn: () => orderService.getMyOrders(query),
  });
};

export const useOrderDetails = (id: string) => {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => orderService.getOrderById(id),
    enabled: Boolean(id),
  });
};

export const useOrders = (query: AdminOrdersQuery = {}) => {
  return useQuery({
    queryKey: queryKeys.orders.list(query),
    queryFn: () => orderService.getOrders(query),
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      orderService.updateOrderStatus(id, status),

    onSuccess: (response) => {
      toast.success(response.message || "Order status updated");

      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.all,
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
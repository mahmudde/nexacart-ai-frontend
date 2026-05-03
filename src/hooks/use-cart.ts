import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cartService } from "@/services/cart.service";
import { queryKeys } from "@/lib/query-keys";
import { getApiErrorMessage } from "@/lib/api-client";
import { useCartDrawerStore } from "@/store/cart-drawer-store";

export const useCart = () => {
  return useQuery({
    queryKey: queryKeys.cart.me,
    queryFn: cartService.getCart,
    retry: false,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const openCart = useCartDrawerStore((state: { openCart: () => void }) => state.openCart);

  return useMutation({
    mutationFn: cartService.addItem,
    onSuccess: (response) => {
      toast.success(response.message || "Item added to cart");

      queryClient.invalidateQueries({
        queryKey: queryKeys.cart.me,
      });

      openCart();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      quantity,
    }: {
      itemId: string;
      quantity: number;
    }) => cartService.updateItem(itemId, { quantity }),

    onSuccess: (response) => {
      toast.success(response.message || "Cart updated");

      queryClient.invalidateQueries({
        queryKey: queryKeys.cart.me,
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.removeItem,

    onSuccess: (response) => {
      toast.success(response.message || "Item removed from cart");

      queryClient.invalidateQueries({
        queryKey: queryKeys.cart.me,
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.clearCart,

    onSuccess: (response) => {
      toast.success(response.message || "Cart cleared");

      queryClient.invalidateQueries({
        queryKey: queryKeys.cart.me,
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
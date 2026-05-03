import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { paymentService } from "@/services/payment.service";
import { getApiErrorMessage } from "@/lib/api-client";

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: paymentService.createCheckoutSession,
    onSuccess: (response) => {
      const checkoutUrl = response.data?.url;

      if (!checkoutUrl) {
        toast.error("Stripe checkout URL was not returned");
        return;
      }

      window.location.href = checkoutUrl;
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

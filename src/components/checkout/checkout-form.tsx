"use client";

import { z } from "zod";
import { Loader2, MapPin, CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOrder } from "@/hooks/use-orders";
import { useCreateCheckoutSession } from "@/hooks/use-payment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api-client";

const checkoutSchema = z.object({
  shippingName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100),
  shippingPhone: z
    .string()
    .min(6, "Phone must be at least 6 characters")
    .max(30),
  shippingStreet: z
    .string()
    .min(3, "Street address must be at least 3 characters")
    .max(200),
  shippingCity: z.string().min(2, "City is required").max(80),
  shippingCountry: z.string().min(2, "Country is required").max(80),
  shippingPostalCode: z
    .string()
    .min(3, "Postal code must be at least 3 characters")
    .max(20),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const createOrderMutation = useCreateOrder();
  const checkoutSessionMutation = useCreateCheckoutSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingName: "",
      shippingPhone: "",
      shippingStreet: "",
      shippingCity: "",
      shippingCountry: "",
      shippingPostalCode: "",
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    try {
      const orderResponse = await createOrderMutation.mutateAsync(values);
      const orderId = orderResponse.data?.id;

      if (!orderId) {
        toast.error("Order was created but order id was not returned");
        return;
      }

      await checkoutSessionMutation.mutateAsync(orderId);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  const isSubmitting =
    createOrderMutation.isPending || checkoutSessionMutation.isPending;

  const fillDemoAddress = () => {
    form.reset({
      shippingName: "Mahmud Rahman",
      shippingPhone: "+8801712345678",
      shippingStreet: "House 12, Road 5, Uttara",
      shippingCity: "Dhaka",
      shippingCountry: "Bangladesh",
      shippingPostalCode: "1230",
    });
  };

  return (
    <div className="glass rounded-[2.5rem] p-6 md:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Shipping details
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Complete your order
          </h1>
          <p className="mt-3 text-muted-foreground">
            Enter your shipping information before continuing to payment.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="rounded-full bg-background/50"
          onClick={fillDemoAddress}
        >
          Fill demo address
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="shippingName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 rounded-full bg-background/60 px-5"
                      placeholder="Mahmud Rahman"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 rounded-full bg-background/60 px-5"
                      placeholder="+8801712345678"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="shippingStreet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-12 rounded-full bg-background/60 px-5"
                    placeholder="House 12, Road 5, Uttara"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-5 md:grid-cols-3">
            <FormField
              control={form.control}
              name="shippingCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 rounded-full bg-background/60 px-5"
                      placeholder="Dhaka"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 rounded-full bg-background/60 px-5"
                      placeholder="Bangladesh"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingPostalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 rounded-full bg-background/60 px-5"
                      placeholder="1230"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-3 h-12 rounded-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CreditCard className="mr-2 h-4 w-4" />
            )}
            {isSubmitting ? "Preparing Checkout..." : "Place Order & Pay"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
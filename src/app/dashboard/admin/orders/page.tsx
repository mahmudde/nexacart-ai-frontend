"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell";
import { useOrders, useUpdateOrderStatus } from "@/hooks/use-orders";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminOrdersPage() {
  const [status, setStatus] = useState("all");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [page, setPage] = useState(1);

  const ordersQuery = useOrders({
    status,
    paymentStatus,
    page,
    limit: 10,
  });

  const updateStatusMutation = useUpdateOrderStatus();

  const orders = ordersQuery.data?.data ?? [];
  const meta = ordersQuery.data?.meta;

  return (
    <AdminDashboardShell>
      <div className="space-y-6">
        <div className="glass rounded-[2.5rem] p-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
            <ShoppingCart className="h-4 w-4" />
            Order management
          </p>

          <h1 className="text-4xl font-semibold">Orders</h1>

          <p className="mt-3 text-muted-foreground">
            Track payment status, fulfillment progress, and customer orders.
          </p>
        </div>

        <div className="glass rounded-[2rem] p-5">
          <div className="mb-5 grid gap-3 md:grid-cols-2">
            <Select
              value={status}
              onValueChange={(value) => {
                setStatus(value || "all");
                setPage(1);
              }}
            >
              <SelectTrigger className="h-12 rounded-full bg-background/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All order statuses</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="PROCESSING">Processing</SelectItem>
                <SelectItem value="SHIPPED">Shipped</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={paymentStatus}
              onValueChange={(value) => {
                setPaymentStatus(value || "all");
                setPage(1);
              }}
            >
              <SelectTrigger className="h-12 rounded-full bg-background/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All payment statuses</SelectItem>
                <SelectItem value="UNPAID">Unpaid</SelectItem>
                <SelectItem value="PAID">Paid</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
                <SelectItem value="REFUNDED">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {ordersQuery.isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="h-24 rounded-[1.5rem]" />
              ))}
            </div>
          )}

          {!ordersQuery.isLoading && orders.length === 0 && (
            <div className="rounded-[1.5rem] border border-border bg-background/50 p-8 text-center">
              <p className="font-medium">No orders found</p>
            </div>
          )}

          {!ordersQuery.isLoading && orders.length > 0 && (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="grid gap-4 rounded-[1.5rem] border border-border bg-background/50 p-4 xl:grid-cols-[1fr_190px]"
                >
                  <div>
                    <p className="font-semibold">{order.orderNumber}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {order.user?.name || "Customer"} · {order.user?.email}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-muted px-3 py-1">
                        Payment: {order.paymentStatus}
                      </span>
                      <span className="rounded-full bg-primary px-3 py-1 text-primary-foreground">
                        ${Number(order.total).toFixed(2)}
                      </span>
                      <span className="rounded-full bg-muted px-3 py-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      updateStatusMutation.mutate({
                        id: order.id,
                        status: value as string,
                      })
                    }
                  >
                    <SelectTrigger className="h-11 rounded-full bg-background/60">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="PROCESSING">Processing</SelectItem>
                      <SelectItem value="SHIPPED">Shipped</SelectItem>
                      <SelectItem value="DELIVERED">Delivered</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          )}

          {meta?.totalPages && meta.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Page {meta.page} of {meta.totalPages}
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={page >= (meta.totalPages ?? 1)}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminDashboardShell>
  );
}
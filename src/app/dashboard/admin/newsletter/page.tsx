"use client";

import { useState } from "react";
import { Mail, Trash2 } from "lucide-react";
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell";
import {
  useDeleteNewsletterSubscriber,
  useNewsletterSubscribers,
} from "@/hooks/use-newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminNewsletterPage() {
  const [search, setSearch] = useState("");

  const subscribersQuery = useNewsletterSubscribers({
    search,
    page: 1,
    limit: 30,
  });

  const deleteMutation = useDeleteNewsletterSubscriber();

  const subscribers = subscribersQuery.data?.data ?? [];

  return (
    <AdminDashboardShell>
      <div className="space-y-6">
        <div className="glass rounded-[2.5rem] p-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            Newsletter
          </p>

          <h1 className="text-4xl font-semibold">Subscribers</h1>

          <p className="mt-3 text-muted-foreground">
            Manage users who subscribed to marketplace updates and smart deals.
          </p>
        </div>

        <div className="glass rounded-[2rem] p-5">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search subscribers..."
            className="mb-5 h-12 rounded-full bg-background/60 px-5"
          />

          {subscribersQuery.isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="h-16 rounded-[1.5rem]" />
              ))}
            </div>
          )}

          {!subscribersQuery.isLoading && subscribers.length === 0 && (
            <div className="rounded-[1.5rem] border border-border bg-background/50 p-8 text-center">
              <p className="font-medium">No subscribers found</p>
            </div>
          )}

          {!subscribersQuery.isLoading && subscribers.length > 0 && (
            <div className="space-y-3">
              {subscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="flex flex-col justify-between gap-4 rounded-[1.5rem] border border-border bg-background/50 p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="font-semibold">{subscriber.email}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Subscribed{" "}
                      {new Date(subscriber.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full bg-background/50 text-destructive"
                    disabled={deleteMutation.isPending}
                    onClick={() => deleteMutation.mutate(subscriber.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminDashboardShell>
  );
}

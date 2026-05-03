"use client";

import { useState } from "react";
import { CheckCircle2, MessageSquareText, Trash2 } from "lucide-react";
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell";
import {
  useDeleteSupportMessage,
  useResolveSupportMessage,
  useSupportMessages,
} from "@/hooks/use-support";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminSupportPage() {
  const [search, setSearch] = useState("");
  const [isResolved, setIsResolved] = useState("all");

  const messagesQuery = useSupportMessages({
    search,
    isResolved,
    page: 1,
    limit: 20,
  });

  const resolveMutation = useResolveSupportMessage();
  const deleteMutation = useDeleteSupportMessage();

  const messages = messagesQuery.data?.data ?? [];

  return (
    <AdminDashboardShell>
      <div className="space-y-6">
        <div className="glass rounded-[2.5rem] p-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
            <MessageSquareText className="h-4 w-4" />
            Support center
          </p>

          <h1 className="text-4xl font-semibold">Support Messages</h1>

          <p className="mt-3 text-muted-foreground">
            Review customer questions and mark support messages as resolved.
          </p>
        </div>

        <div className="glass rounded-[2rem] p-5">
          <div className="mb-5 grid gap-3 md:grid-cols-[1fr_200px]">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search messages..."
              className="h-12 rounded-full bg-background/60 px-5"
            />

            <Select
              value={isResolved}
              onValueChange={(value) => setIsResolved(value || "all")}
            >
              <SelectTrigger className="h-12 rounded-full bg-background/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All messages</SelectItem>
                <SelectItem value="true">Resolved</SelectItem>
                <SelectItem value="false">Unresolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {messagesQuery.isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-32 rounded-[1.5rem]" />
              ))}
            </div>
          )}

          {!messagesQuery.isLoading && messages.length === 0 && (
            <div className="rounded-[1.5rem] border border-border bg-background/50 p-8 text-center">
              <p className="font-medium">No support messages found</p>
            </div>
          )}

          {!messagesQuery.isLoading && messages.length > 0 && (
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="rounded-[1.5rem] border border-border bg-background/50 p-4"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                      <p className="font-semibold">{message.subject}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {message.name} · {message.email}
                      </p>
                      <p className="mt-4 leading-7 text-muted-foreground">
                        {message.message}
                      </p>
                      <p className="mt-3 text-xs text-muted-foreground">
                        {message.isResolved ? "Resolved" : "Unresolved"} ·{" "}
                        {new Date(message.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      {!message.isResolved && (
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-full bg-background/50"
                          disabled={resolveMutation.isPending}
                          onClick={() => resolveMutation.mutate(message.id)}
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Resolve
                        </Button>
                      )}

                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-full bg-background/50 text-destructive"
                        disabled={deleteMutation.isPending}
                        onClick={() => deleteMutation.mutate(message.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminDashboardShell>
  );
}

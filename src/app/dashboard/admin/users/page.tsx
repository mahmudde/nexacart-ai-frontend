"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell";
import { useUpdateUserRole, useUpdateUserStatus, useUsers } from "@/hooks/use-users";
import type { UserRole, UserStatus } from "@/types";
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

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const usersQuery = useUsers({
    search,
    role,
    status,
    page,
    limit: 10,
  });

  const updateRoleMutation = useUpdateUserRole();
  const updateStatusMutation = useUpdateUserStatus();

  const users = usersQuery.data?.data ?? [];
  const meta = usersQuery.data?.meta;

  return (
    <AdminDashboardShell>
      <div className="space-y-6">
        <div className="glass rounded-[2.5rem] p-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            User management
          </p>

          <h1 className="text-4xl font-semibold">Users</h1>

          <p className="mt-3 text-muted-foreground">
            Manage user roles, account status, and marketplace access.
          </p>
        </div>

        <div className="glass rounded-[2rem] p-5">
          <div className="mb-5 grid gap-3 md:grid-cols-[1fr_180px_180px]">
            <Input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search users..."
              className="h-12 rounded-full bg-background/60 px-5"
            />

            <Select
              value={role}
              onValueChange={(value) => {
                setRole(value || "all");
                setPage(1);
              }}
            >
              <SelectTrigger className="h-12 rounded-full bg-background/60">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="MANAGER">Manager</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={status}
              onValueChange={(value) => {
                setStatus(value || "all");
                setPage(1);
              }}
            >
              <SelectTrigger className="h-12 rounded-full bg-background/60">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="BLOCKED">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {usersQuery.isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="h-20 rounded-[1.5rem]" />
              ))}
            </div>
          )}

          {!usersQuery.isLoading && users.length === 0 && (
            <div className="rounded-[1.5rem] border border-border bg-background/50 p-8 text-center">
              <p className="font-medium">No users found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try changing search or filters.
              </p>
            </div>
          )}

          {!usersQuery.isLoading && users.length > 0 && (
            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="grid gap-4 rounded-[1.5rem] border border-border bg-background/50 p-4 lg:grid-cols-[1fr_160px_160px]"
                >
                  <div className="min-w-0">
                    <p className="font-semibold">{user.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {user.email}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <Select
                    value={user.role}
                    onValueChange={(value) =>
                      updateRoleMutation.mutate({
                        id: user.id,
                        role: value as UserRole,
                      })
                    }
                  >
                    <SelectTrigger className="h-11 rounded-full bg-background/60">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="MANAGER">Manager</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={user.status}
                    onValueChange={(value) =>
                      updateStatusMutation.mutate({
                        id: user.id,
                        status: value as UserStatus,
                      })
                    }
                  >
                    <SelectTrigger className="h-11 rounded-full bg-background/60">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="BLOCKED">Blocked</SelectItem>
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
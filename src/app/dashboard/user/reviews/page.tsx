"use client";

import { Star } from "lucide-react";
import { UserDashboardShell } from "@/components/dashboard/user/user-dashboard-shell";
import { EmptyState } from "@/components/shared/empty-state";

export default function UserReviewsPage() {
  return (
    <UserDashboardShell>
      <div className="space-y-6">
        <div className="glass rounded-[2.5rem] p-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4" />
            Product feedback
          </p>
          <h1 className="text-4xl font-semibold">My Reviews</h1>
          <p className="mt-3 text-muted-foreground">
            Manage your submitted product reviews.
          </p>
        </div>

        <EmptyState
          title="Review management coming next"
          description="We will connect this page after adding a dedicated user reviews endpoint or by expanding review APIs."
        />
      </div>
    </UserDashboardShell>
  );
}
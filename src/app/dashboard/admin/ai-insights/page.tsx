"use client";

import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  Lightbulb,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell";
import { useAdminAiInsights } from "@/hooks/use-ai";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminAiInsightsPage() {
  const insightsQuery = useAdminAiInsights();

  const insights = insightsQuery.data?.data;

  return (
    <AdminDashboardShell>
      <div className="space-y-6">
        <div className="glass flex flex-col justify-between gap-5 rounded-[2.5rem] p-8 md:flex-row md:items-center">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
              <Bot className="h-4 w-4" />
              AI-assisted analytics
            </p>

            <h1 className="text-gradient text-4xl font-semibold tracking-tight md:text-5xl">
              Admin AI Insights
            </h1>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Review AI-generated marketplace insights, risk signals, and
              operational recommendations.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="rounded-full bg-background/50"
            onClick={() => insightsQuery.refetch()}
            disabled={insightsQuery.isFetching}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {insightsQuery.isLoading && (
          <div className="grid gap-6 xl:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-72 rounded-[2rem]" />
            ))}
          </div>
        )}

        {!insightsQuery.isLoading && !insights && (
          <div className="glass rounded-[2rem] p-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Sparkles className="h-8 w-8 text-muted-foreground" />
            </div>

            <h2 className="text-2xl font-semibold">
              No AI insights available
            </h2>

            <p className="mt-2 text-muted-foreground">
              Add more products, orders, reviews, and sales activity to generate
              meaningful insights.
            </p>
          </div>
        )}

        {insights && (
          <>
            <div className="glass rounded-[2rem] p-8">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-amber-400" />
                Marketplace summary
              </p>

              <h2 className="text-3xl font-semibold">
                AI-generated business overview
              </h2>

              <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">
                {insights.summary}
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              <div className="glass rounded-[2rem] p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                <h2 className="text-2xl font-semibold">Highlights</h2>

                <div className="mt-5 space-y-3">
                  {insights.highlights?.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-[1.5rem] border border-border bg-background/50 p-4 text-sm leading-6 text-muted-foreground"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-[2rem] p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-500">
                  <AlertTriangle className="h-6 w-6" />
                </div>

                <h2 className="text-2xl font-semibold">Risks</h2>

                <div className="mt-5 space-y-3">
                  {insights.risks?.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-[1.5rem] border border-border bg-background/50 p-4 text-sm leading-6 text-muted-foreground"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-[2rem] p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Lightbulb className="h-6 w-6" />
                </div>

                <h2 className="text-2xl font-semibold">Recommendations</h2>

                <div className="mt-5 space-y-3">
                  {insights.recommendations?.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-[1.5rem] border border-border bg-background/50 p-4 text-sm leading-6 text-muted-foreground"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminDashboardShell>
  );
}

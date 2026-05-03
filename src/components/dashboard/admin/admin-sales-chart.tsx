"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAdminSalesChart } from "@/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminSalesChart() {
  const { data, isLoading } = useAdminSalesChart();

  const chartData = data?.data ?? [];

  return (
    <div className="glass rounded-[2rem] p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Sales performance</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Revenue and order activity over time.
        </p>
      </div>

      {isLoading ? (
        <Skeleton className="h-[320px] rounded-[1.5rem]" />
      ) : (
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  background: "var(--background)",
                  color: "var(--foreground)",
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--primary)"
                fill="url(#revenueFill)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
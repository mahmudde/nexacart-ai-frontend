"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useMe } from "@/hooks/use-auth";
import { getDashboardPath } from "@/utils/get-dashboard-path";

export default function AuthCallbackPage() {
  const { data, isLoading, isError } = useMe();

  useEffect(() => {
    if (isLoading) return;

    if (data?.data) {
      window.location.replace(getDashboardPath(data.data.role));
      return;
    }

    if (isError) {
      window.location.replace("/login");
    }
  }, [data, isError, isLoading]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="glass flex max-w-md flex-col items-center rounded-[2rem] p-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />

        <h1 className="mt-5 text-2xl font-semibold">Completing login...</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Please wait while we prepare your dashboard.
        </p>
      </div>
    </main>
  );
}

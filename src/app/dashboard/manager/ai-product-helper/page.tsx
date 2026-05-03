"use client";

import { ManagerDashboardShell } from "@/components/dashboard/manager/manager-dashboard-shell";
import { AiProductHelperForm } from "@/components/dashboard/manager/ai-product-helper-form";

export default function ManagerAiProductHelperPage() {
  return (
    <ManagerDashboardShell>
      <AiProductHelperForm />
    </ManagerDashboardShell>
  );
}
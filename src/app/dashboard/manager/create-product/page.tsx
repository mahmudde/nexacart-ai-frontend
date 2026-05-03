"use client";

import { ManagerDashboardShell } from "@/components/dashboard/manager/manager-dashboard-shell";
import { ManagerProductForm } from "@/components/dashboard/manager/manager-product-form";

export default function ManagerCreateProductPage() {
  return (
    <ManagerDashboardShell>
      <ManagerProductForm />
    </ManagerDashboardShell>
  );
}

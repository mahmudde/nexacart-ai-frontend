"use client";

import { ManagerDashboardShell } from "@/components/dashboard/manager/manager-dashboard-shell";
import { ProfileFormSection } from "@/components/shared/profile-form-section";


export default function ManagerProfilePage() {
  return (
    <ManagerDashboardShell>
      <ProfileFormSection />
    </ManagerDashboardShell>
  );
}

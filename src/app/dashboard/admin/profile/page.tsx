"use client";

import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell";
import { ProfileFormSection } from "@/components/shared/profile-form-section";

export default function AdminProfilePage() {
  return (
    <AdminDashboardShell>
      <ProfileFormSection />
    </AdminDashboardShell>
  );
}

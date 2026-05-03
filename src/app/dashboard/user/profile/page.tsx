"use client";

import { UserDashboardShell } from "@/components/dashboard/user/user-dashboard-shell";
import { ProfileFormSection } from "@/components/shared/profile-form-section";

export default function UserProfilePage() {
  return (
    <UserDashboardShell>
      <ProfileFormSection />
    </UserDashboardShell>
  );
}
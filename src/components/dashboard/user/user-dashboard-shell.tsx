import { ReactNode } from "react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { PublicLayout } from "@/components/layout/public-layout";
import { UserSidebar } from "./user-sidebar";

type UserDashboardShellProps = {
  children: ReactNode;
};

export function UserDashboardShell({ children }: UserDashboardShellProps) {
  return (
    <AuthGuard allowedRoles={["USER"]}>
      <PublicLayout>
        <main className="min-h-screen">
          <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
            <UserSidebar />
            <div className="min-w-0">{children}</div>
          </section>
        </main>
      </PublicLayout>
    </AuthGuard>
  );
}

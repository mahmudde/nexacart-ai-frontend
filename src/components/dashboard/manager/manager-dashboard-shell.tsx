import { ReactNode } from "react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { PublicLayout } from "@/components/layout/public-layout";
import { ManagerSidebar } from "./manager-sidebar";

type ManagerDashboardShellProps = {
  children: ReactNode;
};

export function ManagerDashboardShell({
  children,
}: ManagerDashboardShellProps) {
  return (
    <AuthGuard allowedRoles={["MANAGER"]}>
      <PublicLayout>
        <main className="min-h-screen">
          <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
            <ManagerSidebar />
            <div className="min-w-0">{children}</div>
          </section>
        </main>
      </PublicLayout>
    </AuthGuard>
  );
}

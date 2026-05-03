import { ReactNode } from "react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { PublicLayout } from "@/components/layout/public-layout";
import { AdminSidebar } from "./admin-sidebar";

type AdminDashboardShellProps = {
  children: ReactNode;
};

export function AdminDashboardShell({ children }: AdminDashboardShellProps) {
  return (
    <AuthGuard allowedRoles={["ADMIN"]}>
      <PublicLayout>
        <main className="min-h-screen">
          <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
            <AdminSidebar />
            <div className="min-w-0">{children}</div>
          </section>
        </main>
      </PublicLayout>
    </AuthGuard>
  );
}

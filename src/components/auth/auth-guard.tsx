"use client";

import { ReactNode, useEffect } from "react";
import type { UserRole } from "@/types";
import { useAuthUser } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

type AuthGuardProps = {
  children: ReactNode;
  allowedRoles?: UserRole[];
};

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuthUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.replace("/login");
      return;
    }

    if (
      !isLoading &&
      user &&
      allowedRoles &&
      !allowedRoles.includes(user.role)
    ) {
      window.location.replace("/");
    }
  }, [allowedRoles, isAuthenticated, isLoading, user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
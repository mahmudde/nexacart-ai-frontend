import type { UserRole } from "@/types";

export const getDashboardPath = (role?: UserRole) => {
  if (role === "ADMIN") return "/dashboard/admin";
  if (role === "MANAGER") return "/dashboard/manager";
  return "/dashboard/user";
};
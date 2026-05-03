import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import { queryKeys } from "@/lib/query-keys";

export const useUserDashboardOverview = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.userOverview,
    queryFn: dashboardService.getUserOverview,
  });
};

export const useManagerDashboardOverview = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.managerOverview,
    queryFn: dashboardService.getManagerOverview,
  });
};

export const useAdminDashboardOverview = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.adminOverview,
    queryFn: dashboardService.getAdminOverview,
  });
};

export const useAdminSalesChart = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.adminSalesChart,
    queryFn: dashboardService.getAdminSalesChart,
  });
};

export const useAdminTopProducts = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.adminTopProducts,
    queryFn: dashboardService.getAdminTopProducts,
  });
};

export const useAdminRecentOrders = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.adminRecentOrders,
    queryFn: dashboardService.getAdminRecentOrders,
  });
};

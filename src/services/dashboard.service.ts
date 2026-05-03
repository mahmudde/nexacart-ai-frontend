import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";

export type UserDashboardOverview = {
  overviewCards: {
    totalOrders: number;
    totalReviews: number;
    wishlistItems: number;
    cartItems: number;
    totalSpent: number;
  };
};

export type ManagerDashboardOverview = {
  overviewCards: {
    totalProducts: number;
    activeProducts: number;
    draftProducts: number;
    totalOrders: number;
    totalReviews: number;
    lowStockProducts: number;
    totalSold: number;
    totalViews: number;
  };
  lowStockProducts: {
    id: string;
    name: string;
    slug: string;
    stock: number;
    soldCount: number;
  }[];
  recentOrders: {
    id: string;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    total: string | number;
    createdAt: string;
  }[];
};

export type AdminDashboardOverview = {
  overviewCards: {
    totalUsers: number;
    totalManagers: number;
    totalProducts: number;
    totalCategories: number;
    totalOrders: number;
    paidOrders: number;
    pendingOrders: number;
    totalReviews: number;
    lowStockProducts: number;
    totalRevenue: number;
  };
};

export type AdminSalesChartItem = {
  date: string;
  revenue: number;
  orders: number;
};

export type AdminTopProductItem = {
  id: string;
  name: string;
  slug: string;
  soldCount: number;
  ratingAverage: number;
  totalRevenue?: number;
};

export type AdminRecentOrderItem = {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: string | number;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
};

export const dashboardService = {
  getUserOverview: async () => {
    const { data } = await apiClient.get<ApiResponse<UserDashboardOverview>>(
      "/dashboard/user/overview"
    );

    return data;
  },

  getManagerOverview: async () => {
    const { data } = await apiClient.get<ApiResponse<ManagerDashboardOverview>>(
      "/dashboard/manager/overview"
    );

    return data;
  },

  getAdminOverview: async () => {
    const { data } = await apiClient.get<ApiResponse<AdminDashboardOverview>>(
      "/dashboard/admin/overview"
    );

    return data;
  },

  getAdminSalesChart: async () => {
    const { data } = await apiClient.get<ApiResponse<AdminSalesChartItem[]>>(
      "/dashboard/admin/sales-chart"
    );

    return data;
  },

  getAdminTopProducts: async () => {
    const { data } = await apiClient.get<ApiResponse<AdminTopProductItem[]>>(
      "/dashboard/admin/top-products"
    );

    return data;
  },

  getAdminRecentOrders: async () => {
    const { data } = await apiClient.get<ApiResponse<AdminRecentOrderItem[]>>(
      "/dashboard/admin/recent-orders"
    );

    return data;
  },
};
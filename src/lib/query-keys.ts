export const queryKeys = {
  health: ["health"],

  auth: {
    me: ["auth", "me"],
  },

  users: {
    all: ["users"],
    lists: () => ["users", "list"],
    list: (query: Record<string, unknown>) => ["users", "list", query],
    detail: (id: string) => ["users", "detail", id],
  },

  categories: {
    all: ["categories"],
    lists: () => ["categories", "list"],
    list: (query: Record<string, unknown>) => ["categories", "list", query],
    detail: (id: string) => ["categories", "detail", id],
  },

  products: {
    all: ["products"],
    lists: () => ["products", "list"],
    list: (query: Record<string, unknown>) => ["products", "list", query],
    detail: (slug: string) => ["products", "detail", slug],
    related: (id: string) => ["products", "related", id],
    trending: ["products", "trending"],
  },

  cart: {
    me: ["cart", "me"],
  },

  orders: {
    all: ["orders"],
    mine: (query: Record<string, unknown>) => ["orders", "mine", query],
    list: (query: Record<string, unknown>) => ["orders", "list", query],
    detail: (id: string) => ["orders", "detail", id],
  },
  ai: {
    suggestions: (query: string) => ["ai", "search-suggestions", query],
    recommendations: ["ai", "recommendations"],
    trending: ["ai", "trending-products"],
    adminInsights: ["ai", "admin-insights"],
  },

  wishlist: {
    me: (query: Record<string, unknown>) => ["wishlist", "me", query],
  },

  blogs: {
    all: ["blogs"],
    list: (query: Record<string, unknown>) => ["blogs", "list", query],
    detail: (slug: string) => ["blogs", "detail", slug],
  },

  support: {
    messages: (query: Record<string, unknown>) => ["support", "messages", query],
    detail: (id: string) => ["support", "messages", id],
  },

  newsletter: {
    subscribers: (query: Record<string, unknown>) => [
      "newsletter",
      "subscribers",
      query,
    ],
  },
  dashboard: {
  userOverview: ["dashboard", "user", "overview"],
  managerOverview: ["dashboard", "manager", "overview"],
  adminOverview: ["dashboard", "admin", "overview"],
  adminSalesChart: ["dashboard", "admin", "sales-chart"],
  adminTopProducts: ["dashboard", "admin", "top-products"],
  adminRecentOrders: ["dashboard", "admin", "recent-orders"],
  adminUsersTable: (query: Record<string, unknown>) => [
    "dashboard",
    "admin",
    "users-table",
    query,
  ],
},
reviews: {
  all: ["reviews"],
  product: (productId: string, query: Record<string, unknown>) => [
    "reviews",
    "product",
    productId,
    query,
  ],
}
};
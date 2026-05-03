"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bot,
  Boxes,
  FolderTree,
  LayoutDashboard,
  Mail,
  MessageSquareText,
  Newspaper,
  ShoppingCart,
  Users,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
  {
    label: "Overview",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    label: "Products",
    href: "/dashboard/admin/products",
    icon: Boxes,
  },
  {
    label: "Categories",
    href: "/dashboard/admin/categories",
    icon: FolderTree,
  },
  {
    label: "Orders",
    href: "/dashboard/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Blogs",
    href: "/dashboard/admin/blogs",
    icon: Newspaper,
  },
  {
    label: "Support",
    href: "/dashboard/admin/support",
    icon: MessageSquareText,
  },
  {
    label: "Newsletter",
    href: "/dashboard/admin/newsletter",
    icon: Mail,
  },
  {
    label: "AI Insights",
    href: "/dashboard/admin/ai-insights",
    icon: Bot,
  },
  {
    label: "Reports",
    href: "/dashboard/admin/reports",
    icon: BarChart3,
  },
  {
    label: "Profile",
    href: "/dashboard/admin/profile",
    icon: UserCircle,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass h-fit rounded-[2rem] p-4 lg:sticky lg:top-28">
      <div className="mb-5 px-3">
        <p className="text-sm text-muted-foreground">Admin Area</p>
        <h2 className="text-xl font-semibold">Control Center</h2>
      </div>

      <nav className="space-y-2">
        {adminNavItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  LayoutDashboard,
  PackageCheck,
  Star,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const userNavItems = [
  {
    label: "Overview",
    href: "/dashboard/user",
    icon: LayoutDashboard,
  },
  {
    label: "Orders",
    href: "/dashboard/user/orders",
    icon: PackageCheck,
  },
  {
    label: "Wishlist",
    href: "/dashboard/user/wishlist",
    icon: Heart,
  },
  {
    label: "Reviews",
    href: "/dashboard/user/reviews",
    icon: Star,
  },
  {
    label: "Profile",
    href: "/dashboard/user/profile",
    icon: UserCircle,
  },
];

export function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass h-fit rounded-[2rem] p-4 lg:sticky lg:top-28">
      <div className="mb-5 px-3">
        <p className="text-sm text-muted-foreground">User Area</p>
        <h2 className="text-xl font-semibold">My Dashboard</h2>
      </div>

      <nav className="space-y-2">
        {userNavItems.map((item) => {
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
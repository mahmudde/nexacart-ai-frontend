"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  UserCircle,
} from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthUser, useLogout } from "@/hooks/use-auth";
import { useCartDrawerStore } from "@/store/cart-drawer-store";
import { getDashboardPath } from "@/utils/get-dashboard-path";

export function Navbar() {
  const { user, isAuthenticated } = useAuthUser();
  const logoutMutation = useLogout();
  const openCart = useCartDrawerStore((state) => state.openCart);

  const dashboardPath = getDashboardPath(user?.role);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated && (
            <>
              <Link
                href="/wishlist"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Wishlist
              </Link>
              <Link
                href={dashboardPath}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
            </>
          )}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="outline"
            size="icon"
            className="rounded-md"
          >
            <Search className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-md"
            onClick={openCart}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>

          <ThemeToggle />

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    className="rounded-md px-3"
                  >
                    <UserCircle className="mr-2 h-4 w-4" />
                    {user.name}
                  </Button>
                }
              />

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  render={
                    <Link href={dashboardPath}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  }
                />

                <DropdownMenuItem
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className={cn(buttonVariants(), "rounded-md px-6")}
            >
              Login
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" className="rounded-md">
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />

            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">Mobile navigation</SheetTitle>

              <div className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}

                {isAuthenticated && (
                  <>
                    <Link
                      href="/wishlist"
                      className="rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-muted"
                    >
                      Wishlist
                    </Link>

                    <Link
                      href={dashboardPath}
                      className="rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-muted"
                    >
                      Dashboard
                    </Link>
                  </>
                )}

                {isAuthenticated ? (
                  <Button
                    className="mt-4 rounded-md"
                    variant="outline"
                    onClick={() => logoutMutation.mutate()}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link
                    href="/login"
                    className={cn(buttonVariants(), "mt-4 rounded-md")}
                  >
                    Login
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
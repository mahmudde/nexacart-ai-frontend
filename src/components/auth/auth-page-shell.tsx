import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ReactNode } from "react";

type AuthPageShellProps = {
  children: ReactNode;
};

export function AuthPageShell({ children }: AuthPageShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-80" />

      <div className="pointer-events-none absolute left-10 top-10 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />

      <Link
        href="/"
        className="absolute left-6 top-6 z-10 flex items-center gap-2"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Sparkles className="h-5 w-5" />
        </span>
        <span className="text-xl font-bold">NexaCart AI</span>
      </Link>

      <div className="relative z-10 w-full">{children}</div>
    </main>
  );
}
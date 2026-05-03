import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}
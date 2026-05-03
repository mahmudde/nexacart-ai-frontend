import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8", className)}
    >
      {children}
    </section>
  );
}
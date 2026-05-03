"use client";

import { ReactNode } from "react";

import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { LenisProvider } from "./lenis-provider";
import { Toaster } from "../sonner";

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <LenisProvider>
          {children}
          <Toaster richColors position="top-right" />
        </LenisProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

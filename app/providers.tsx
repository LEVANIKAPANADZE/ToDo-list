"use client";

import { ThemeProvider } from "next-themes";
import type { ProvidersProps } from "@/lib/types";

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}

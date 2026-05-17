"use client";

import { type PropsWithChildren, Suspense } from "react";
import ReduxProvider from "./ReduxProvider";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/shared/ui/sonner";
import { TooltipProvider } from "@/shared/ui/tooltip";
import LoaderComponent from "@/shared/ui/LoaderComponent";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Suspense fallback={<LoaderComponent />}>
          <TooltipProvider>{children}</TooltipProvider>
        </Suspense>
        <Toaster />
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default Providers;

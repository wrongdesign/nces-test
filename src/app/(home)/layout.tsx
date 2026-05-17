"use client";

import type React from "react";
import { Suspense } from "react";
import NavBar from "@/widgets/NavBar/NavBar";
import LoaderComponent from "@/shared/ui/LoaderComponent";
import withAuth from "@/shared/model/HOC/withAuth";

const PanelLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200 dark:bg-background gap-8 px-6">
      <NavBar />
      <div className="flex flex-col w-full gap-4">
        <Suspense fallback={<LoaderComponent />}>{children}</Suspense>
      </div>
    </div>
  );
};

export default withAuth(PanelLayout);

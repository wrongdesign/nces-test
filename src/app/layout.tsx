import type { Metadata } from "next";
import "./globals.css";
import type React from "react";
import Providers from "@/features/providers/ui/Providers";

export const metadata: Metadata = {
  title: "NCES SPA",
  description: "SPA for NCES Task Management Control",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

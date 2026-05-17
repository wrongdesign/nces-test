"use client";

import { AuthWrapper, LoginForm } from "@/features/auth";

export default function Home() {
  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  );
}

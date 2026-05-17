"use client";

import type { AuthFormType } from "@/features/auth";
import { useLoginMutation } from "@/shared/model/store/api/auth.api";
import { useApiErrorToast } from "@/shared/model/hooks/useApiErrorToast";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const [login, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useApiErrorToast(loginError);

  const onSubmit = async (data: AuthFormType) => {
    try {
      await login(data).unwrap();

      startTransition(() => {
        router.push("/auth/otp");
      });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    loading: loginLoading || isPending,
    onSubmit,
  };
};

export default useLogin;

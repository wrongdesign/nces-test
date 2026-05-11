"use client"

import {AuthFormType} from "@/features/auth";
import {useLoginMutation} from "@/shared/model/store/api/auth.api";
import {useApiErrorToast} from "@/shared/model/hooks/useApiErrorToast";
import {useTransition} from "react";
import {useRouter} from "next/dist/client/components/navigation";

const useLogin = () => {
    const [login, {isLoading: loginLoading, error: loginError}] = useLoginMutation();

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    useApiErrorToast(loginError);

    const onSubmit = async (data: AuthFormType) => {
        try {
            await login(data);

            startTransition(() => {
                router.push("/otp");
            })
        } catch (e) {
            console.log(e);
        }
    }

    return {
        loading: loginLoading || isPending,
        onSubmit,
    };
}

export default useLogin;
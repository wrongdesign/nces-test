"use client"

import {AuthFormType} from "@/features/auth";
import {useLoginMutation} from "@/shared/model/store/api/auth.api";
import {useApiErrorToast} from "@/shared/model/hooks/useApiErrorToast";

const useLogin = () => {
    const [login, {isLoading: loginLoading, error: loginError}] = useLoginMutation();

    useApiErrorToast(loginError);

    const onSubmit = async (data: AuthFormType) => {
        try {
            await login(data);
        } catch (e) {
            console.log(e);
        }
    }

    return {
        loading: loginLoading,
        onSubmit,
    };
}

export default useLogin;
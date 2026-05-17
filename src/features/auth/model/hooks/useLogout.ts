"use client"

import {useAppDispatch} from "@/shared/model/store";
import {useTransition} from "react";
import {useRouter} from "next/navigation";
import {clearUser} from "@/shared/model/store/slices/auth/auth.slice";

const useLogout = () => {
    const dispatch = useAppDispatch();

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const logout = () => {
        dispatch(clearUser());

        startTransition(() => {
            router.replace('/auth');
        });
    };

    return {
        isPending,
        logout,
    };
}

export default useLogout;
"use client"

import {useState} from "react";
import {AuthFormType} from "@/features/auth";

const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false); // TODO: Replace with RTK Query loading

    const onSubmit = async (data: AuthFormType) => {
        try {
            setLoading(true);

            console.log(data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        onSubmit,
    };
}

export default useLogin;
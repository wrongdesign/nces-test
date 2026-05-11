import { createApi } from "@reduxjs/toolkit/query/react";
import {AuthFormType} from "@/features/auth";
import baseQueryWithErrorHandling from "@/shared/api/fetcher";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        login: builder.mutation<
            void,
            AuthFormType
        >({
            query: ({ email, password }) => ({
                url: "/api/auth",
                method: "POST",
                body: { email, password },
            }),
        }),
        verify2fa: builder.mutation<{ access_token: string }, { pin: string }>({
            query: ({ pin }) => ({
                url: "/api/auth/v1/admin/verify-2fa",
                method: "POST",
                body: { "2fa_code": pin },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useVerify2faMutation,
} = authApi;

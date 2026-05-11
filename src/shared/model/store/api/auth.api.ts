import { createApi } from "@reduxjs/toolkit/query/react";
import {AuthFormType} from "@/features/auth";
import baseQueryWithErrorHandling from "@/shared/api/fetcher";
import {OtpBody, User} from "@/entities/user";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        login: builder.mutation<
            void,
            AuthFormType
        >({
            query: ({ email, password }) => ({
                url: "/api/auth/login",
                method: "POST",
                body: { email, password },
            }),
        }),
        verify2fa: builder.mutation<User, OtpBody>({
            query: ({ pin }) => ({
                url: "/api/auth/otp",
                method: "POST",
                body: { pin: pin },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useVerify2faMutation,
} = authApi;

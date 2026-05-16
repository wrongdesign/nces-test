import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";

import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {RootState} from "@/shared/model/store";
import {eventBus} from "@/shared/model/store/event/eventBus";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.access_token;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        headers.set("Content-Type", "application/json");

        return headers;
    },
    credentials: "include",
});

const baseQueryWithErrorHandling: BaseQueryFn<
    string | FetchArgs,
    unknown,
    {
        status: number | string;
        message: string;
    },
    unknown,
    FetchBaseQueryMeta
> = async (args, api) => {

    const result = await baseQuery(args, api, {});

    if (result.data === "OK") {
        return { data: { success: true } };
    }

    if (result?.meta?.response?.status === 204) {
        return { data: {} };
    }

    if (result.error) {
        const status = result.error.status;
        const data = result.error.data;

        if (data === "OK") {
            return { data: { success: true } };
        }

        let message = "Unknown error";

        if (data && typeof data === "object") {
            message =
                String("message" in data && data.message) ||
                JSON.stringify(data);
        } else if (typeof data === "string") {
            message = data;
        }

        if (status === 401 || status === 403) {
            eventBus.emit({
                type: "AUTH_ERROR",
                payload: { status, message },
            });
        }

        return {
            error: {
                status,
                message,
            },
        };
    }

    return result;
};

export default baseQueryWithErrorHandling;

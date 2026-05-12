import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";

import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {RootState} from "@/shared/model/store";

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
                (data as any).message ||
                (data as any).devMessage ||
                JSON.stringify(data);
        } else if (typeof data === "string") {
            message = data;
        }

        if (status === 401 || status === 403) {
        //     TODO: Place here redirection
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

export const baseFileErrorResponseHandler = (response: any) => {
    let message = "Unknown error";

    if (response.data && typeof response.data === "object") {
        message =
            response.data.message || response.data.devMessage || "Failed to get file";
    } else if (typeof response.data === "string") {
        message = response.data;
    }

    return {
        status: response.status,
        message: message,
    };
};

export default baseQueryWithErrorHandling;

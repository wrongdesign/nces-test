import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithErrorHandling from "@/shared/api/fetcher";
import type {TaskResponse} from "@/shared/model/store/slices/task/task.model";
import type {Pagination} from "@/shared/model/types/common";

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        getTasks: builder.query<TaskResponse, Partial<Pagination>>({
            query: ({ page, limit }) => ({
                url: "/api/task",
                method: "GET",
                params: {
                    page,
                    limit
                },
            })
        }),
    })
})

export const { useLazyGetTasksQuery } = taskApi
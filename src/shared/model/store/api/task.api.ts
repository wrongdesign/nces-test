import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithErrorHandling from "@/shared/api/fetcher";
import type {TaskFiltersModel, TaskResponse} from "@/shared/model/store/slices/task/task.model";
import type {Pagination} from "@/shared/model/types/common";
import type {Tag, Task, TaskStatusUpdate} from "@/entities/task";

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        getTasks: builder.query<TaskResponse, Partial<Pagination & TaskFiltersModel>>({
            query: ({ page, limit, tag, status, priority, sorting, name }) => ({
                url: "/api/task",
                method: "GET",
                params: {
                    page,
                    limit,
                    tag,
                    status,
                    priority,
                    sorting,
                    name,
                },
            })
        }),
        getTags: builder.query<Tag[], void>({
            query: () => ({
                url: "/api/task/tags",
                method: "GET",
            })
        }),
        updateStatus: builder.mutation<Task, TaskStatusUpdate>({
            query: ({ id, status }) => ({
                url: `/api/task/status/${id}`,
                method: "PATCH",
                body: {
                    status
                }
            })
        })
    })
})

export const { useLazyGetTasksQuery, useLazyGetTagsQuery, useUpdateStatusMutation } = taskApi
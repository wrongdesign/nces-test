import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithErrorHandling from "@/shared/api/fetcher";
import type {TaskFiltersModel, TaskResponse} from "@/shared/model/store/slices/task/task.model";
import type {Pagination} from "@/shared/model/types/common";
import type {Tag, Task, TaskStatusUpdate} from "@/entities/task";
import type {TaskSchemaType} from "@/features/task";

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
        }),
        getTaskById: builder.query<Task, Pick<Task, "id">>({
            query: ({ id }) => ({
                url: `/api/task/${id}`,
                method: "GET",
            })
        }),
        createTask: builder.mutation<void, TaskSchemaType>({
            query: (body: TaskSchemaType) => ({
                url: "/api/task/create",
                method: "POST",
                body: body,
            }),
        }),
        updateTask: builder.mutation<void, { data: Partial<TaskSchemaType>, id: Pick<Task, "id"> }>({
            query: ({ data, id }: { data: Partial<TaskSchemaType>, id: Pick<Task, "id"> }) => ({
                url: `/api/task/${id}`,
                method: "PATCH",
                body: {...data}
            })
        }),
        deleteTask: builder.query<void, Pick<Task, "id">>({
            query: ({ id }) => ({
                url: `/api/task/${id}`,
                method: "DELETE",
            })
        }),
        createTag: builder.mutation<void, Pick<Tag, "name">>({
            query: ({ name }) => ({
                url: "/api/task/tags/create",
                method: "POST",
                body: {
                    name
                }
            })
        })
    })
})

export const {
    useLazyGetTasksQuery,
    useLazyGetTagsQuery,
    useUpdateStatusMutation,
    useLazyGetTaskByIdQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useLazyDeleteTaskQuery,
    useCreateTagMutation,
} = taskApi
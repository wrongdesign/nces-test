import {type NextRequest, NextResponse} from "next/server";
import {INTERNAL_ERROR} from "@/app/api/config/common";
import {readFile} from "@/app/api/task/utils/common";
import type {PriorityType, Task, TaskStatusType} from "@/entities/task";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams

        const page = Number(searchParams.get("page")) ?? undefined
        const limit = Number(searchParams.get("limit")) ?? undefined
        const status: TaskStatusType | undefined = searchParams.get("status") as TaskStatusType ?? undefined
        const priority: PriorityType | undefined = searchParams.get("priority") as PriorityType ?? undefined
        const tag: string | undefined = searchParams.get("tag") ?? undefined

        const mockTasks: Task[] = readFile("src/app/api/task/mocks/tasks.json");

        const sortedTasks = [...mockTasks].sort(
            (a, b) => {
                const dateA = new Date(
                    a.createdAt
                        .split(".")[0]
                        .replace(" ", "T")
                ).getTime()

                const dateB = new Date(
                    b.createdAt
                        .split(".")[0]
                        .replace(" ", "T")
                ).getTime()

                return dateB - dateA
            }
        )

        const filteredTasks = () => {
            const filterByStatus = status ? sortedTasks.filter((task: Task) => task.status === status) : sortedTasks;
            const filterByPriority = priority ? filterByStatus.filter((task: Task) => task.priority === priority) : filterByStatus;
            return tag ? filterByPriority.filter((task: Task) => task.tags.includes(tag)) : filterByPriority;
        }

        const filteredTasksResult = filteredTasks();

        const startIndex = (page - 1) * limit

        const endIndex = startIndex + limit

        const paginatedTasks = page && limit ?
            filteredTasksResult.slice(
                startIndex,
                endIndex
            ) : filteredTasksResult;

        return NextResponse.json({
            tasks: paginatedTasks,

            ...(page && limit && {
                pagination: {
                    total: filteredTasksResult.length,
                    totalPages: Math.ceil(
                        filteredTasksResult.length / limit
                    ),
                    hasNextPage:
                        endIndex < filteredTasksResult.length,
                    hasPrevPage: page > 1,
                }
            }),
        })
    } catch (error) {
        console.error("[GET_TASK]", error)

        return INTERNAL_ERROR(error)
    }
}
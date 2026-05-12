import {type NextRequest, NextResponse} from "next/server";
import {INTERNAL_ERROR} from "@/app/api/config/common";
import {readFile} from "@/app/api/task/utils/common";
import type {Task} from "@/entities/task";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams

        const page = Number(searchParams.get("page")) ?? undefined

        const limit = Number(searchParams.get("limit")) ?? undefined

        const mockTasks: Task[] = readFile("./mocks/tasks.json");

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

        const startIndex = (page - 1) * limit

        const endIndex = startIndex + limit

        const paginatedTasks = page && limit ?
            sortedTasks.slice(
                startIndex,
                endIndex
            ) : sortedTasks;

        return NextResponse.json({
            tasks: paginatedTasks,

            ...(page && limit && {
                pagination: {
                    total: sortedTasks.length,
                    totalPages: Math.ceil(
                        sortedTasks.length / limit
                    ),
                    hasNextPage:
                        endIndex < sortedTasks.length,
                    hasPrevPage: page > 1,
                }
            }),
        })
    } catch (error) {
        console.error("[GET_TASK]", error)

        return INTERNAL_ERROR(error)
    }
}
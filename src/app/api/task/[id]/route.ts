import {NextResponse} from "next/server";
import {INTERNAL_ERROR} from "@/app/api/config/common";
import type {Task} from "@/entities/task";
import {readFile} from "@/app/api/task/utils/common";

export async function GET(
    context: {
        params: Promise<{
            id: string
        }>
    }
) {
    try {
        const { id } = await context.params;

        const mockTasks: Task[] = readFile("src/app/api/task/mocks/tasks.json");

        const findTask = mockTasks.find((task) => task.id === id);

        if (!findTask) return NextResponse.json(
            {
                message: "User not found",
            },
            {
                status: 404,
            }
        )

        return NextResponse.json(findTask)
    } catch (error) {
        console.error("[GET_TASK_BY_ID]", error)

        return INTERNAL_ERROR(error)
    }
}
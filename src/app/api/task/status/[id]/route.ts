import type {Task, TaskStatusInterface} from "@/entities/task";
import {readFile, writeFile} from "@/app/api/task/utils/common";
import {type NextRequest, NextResponse} from "next/server";
import {INTERNAL_ERROR} from "@/app/api/config/common";
import {validateAccessToken} from "@/app/api/task/utils/auth";

export async function PATCH(
    request: NextRequest,
    context: {
        params: Promise<{
            id: string
        }>
    }
) {
    try {
        const authError = validateAccessToken(request);

        if (authError) {
            return authError;
        }

        const { id } = await context.params;

        const { status }: TaskStatusInterface = await request.json();

        const mockTasks: Task[] = readFile("src/app/api/task/mocks/tasks.json");

        const selectedTask = mockTasks.find((task) => task.id === id);

        if (!selectedTask)
            return NextResponse.json(
                {
                    message: "Task not found",
                },
                {
                    status: 500,
                }
            )

        const newTask: Task = { ...selectedTask, status: status};

        const newTasks: Task[] = mockTasks.map((task) => {
            return task.id === id ? newTask : task;
        });

        writeFile<Task[]>("src/app/api/task/mocks/tasks.json", newTasks);

        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })

        return new NextResponse(null,
            {
                status: 204,
            }
        );
    } catch (error) {
        console.error("[PATCH_STATUS]", error)

        return INTERNAL_ERROR(error)
    }
}
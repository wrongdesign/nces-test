import {type NextRequest, NextResponse} from "next/server";
import {INTERNAL_ERROR} from "@/app/api/config/common";
import {type Task, TaskStatusEnum} from "@/entities/task";
import {readFile, writeFile} from "@/app/api/task/utils/common";
import type {TaskSchemaType} from "@/features/task";
import {formatDate} from "@/shared/model/utils/date";

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
                message: "Task not found",
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

export async function POST(request: NextRequest) {
    try {
        const body: TaskSchemaType = await request.json();
        const mockTasks: Task[] = readFile("src/app/api/task/mocks/tasks.json");
        const taskId = crypto.randomUUID();

        const date = new Date();
        const createdAt = formatDate(date, "sv-SE", "full");
        const updatedAt = formatDate(date, "sv-SE", "full");

        const task: Task = { ...body, updatedAt, id: taskId, createdAt, status: TaskStatusEnum.TODO }

        writeFile("src/app/api/task/tasks.json", [ ...mockTasks, task ]);

        return new NextResponse(null,
            {
                status: 204,
            }
        );
    } catch (error) {
        console.error("[TASK_POST]", error);

        return INTERNAL_ERROR(error);
    }
}

export async function PATCH(
    request: NextRequest,
    context: {
        params: Promise<{
            id: string
        }>
    }) {
    try {
        const { id } = await context.params;
        const body: Partial<TaskSchemaType> = await request.json();
        const mockTasks: Task[] = readFile("src/app/api/task/mocks/tasks.json");
        const findTask = mockTasks.find((task) => task.id === id);

        if (!findTask) return NextResponse.json(
            {
                message: "Task not found",
            },
            {
                status: 404,
            }
        )

        const date = new Date();
        const newTask: Task = { ...findTask, ...body, updatedAt: formatDate(date, "sv-SE", "full") };
        const filteredTasks: Task[] = mockTasks.filter((task: Task) => task.id !== id);
        const newTasks: Task[] = [ ...filteredTasks, newTask ];

        writeFile("src/app/api/task/mocks/tasks.json", newTasks);

        return new NextResponse(null,
            {
                status: 204,
            }
        );
    } catch (error) {
        console.error("[PATCH_TASK]", error)

        return INTERNAL_ERROR(error)
    }
}

export async function DELETE(
    context: {
        params: Promise<{
            id: string
        }>
    }) {
    try {
        const { id } = await context.params;
        const mockTasks: Task[] = readFile("src/app/api/task/mocks/tasks.json");
        const findTask = mockTasks.find((task) => task.id === id);

        if (!findTask) return NextResponse.json(
            {
                message: "Task not found",
            },
            {
                status: 404,
            }
        )

        writeFile("src/app/api/task/mocks/tasks.json", mockTasks.filter((task: Task) => task.id !== id));

        return new NextResponse(null,
            {
                status: 204,
            }
        );
    } catch (error) {
        console.error("[TASK_DELETE]", error);

        return INTERNAL_ERROR(error);
    }
}
import {type NextRequest, NextResponse} from "next/server";
import type {TaskSchemaType} from "@/features/task";
import {type Task, TaskStatusEnum} from "@/entities/task";
import {readFile, writeFile} from "@/app/api/task/utils/common";
import {formatDate} from "@/shared/model/utils/date";
import {INTERNAL_ERROR} from "@/app/api/config/common";
import {validateAccessToken} from "@/app/api/task/utils/auth";

export async function POST(request: NextRequest) {
    try {
        const authError = validateAccessToken(request);

        if (authError) {
            return authError;
        }

        const body: TaskSchemaType = await request.json();
        const mockTasks: Task[] = readFile("src/app/api/task/mocks/tasks.json");
        const taskId = crypto.randomUUID();

        const date = new Date();
        const createdAt = formatDate(date, "sv-SE", "fullString");
        const updatedAt = formatDate(date, "sv-SE", "fullString");

        const task: Task = { ...body, updatedAt, id: taskId, createdAt, status: TaskStatusEnum.TODO }

        writeFile("src/app/api/task/mocks/tasks.json", [ ...mockTasks, task ]);

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
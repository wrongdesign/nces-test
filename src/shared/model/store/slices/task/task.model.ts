import type {Task, TaskPaginationInfo} from "@/entities/task";

export interface TaskResponse {
    pagination: TaskPaginationInfo | undefined;
    tasks: Task[] | undefined;
}

export interface TaskState extends TaskResponse {
    selectedTaskId: string | undefined;
}
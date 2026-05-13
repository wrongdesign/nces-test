import type {Task, TaskPaginationInfo} from "@/entities/task";

export interface TaskPaginationResponse {
    pagination: TaskPaginationInfo | undefined;
}

export interface TaskResponse extends TaskPaginationResponse {
    tasks: Task[] | undefined;
}

export interface TaskState extends TaskPaginationResponse {
    fetchTags: boolean;
    fetchTasks: boolean;
    selectedTask: Task | undefined;
    currentPage: number;
}
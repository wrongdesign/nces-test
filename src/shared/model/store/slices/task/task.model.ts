import type {PriorityType, Task, TaskPaginationInfo, TaskStatusType} from "@/entities/task";

export interface TaskPaginationResponse {
    pagination: TaskPaginationInfo | undefined;
}

export interface TaskResponse extends TaskPaginationResponse {
    tasks: Task[] | undefined;
}

export interface TaskFiltersModel {
    status: TaskStatusType | undefined;
    priority: PriorityType | undefined;
    tag: string | undefined;
}

export interface TaskState extends TaskPaginationResponse {
    fetchTags: boolean;
    fetchTasks: boolean;
    tasks: Task[] | undefined;
    filters: Partial<TaskFiltersModel> | undefined;
    selectedTask: Task | undefined;
    currentPage: number;
}
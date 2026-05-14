import type {PriorityType, Task, TaskPaginationInfo, TaskSortingType, TaskStatusType} from "@/entities/task";

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
    name: string | undefined;
    sorting: TaskSortingType;
}

export interface TaskState extends TaskPaginationResponse {
    fetchTags: boolean;
    fetchTasks: boolean;
    tasks: Task[] | undefined;
    filters: Partial<TaskFiltersModel>;
    selectedTask: Task | undefined;
    currentPage: number;
}
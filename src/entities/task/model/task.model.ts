import type {StandardObjectWithClassNames} from "@/shared/model/types/common";

export enum TaskStatusEnum {
    TODO = "todo",
    INPROGRESS = "inProgress",
    DONE = "done",
}

export type TaskStatusType = `${TaskStatusEnum}`;

export enum PriorityEnum {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export type PriorityType = `${PriorityEnum}`;

export interface Tag {
    id: string;
    name: string;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatusType;
    priority: PriorityType;
    deadline: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export const PriorityLabeled: Record<PriorityType, StandardObjectWithClassNames> = {
    low: {
        label: 'Low',
        code: PriorityEnum.LOW,
        classNames: 'bg-gradient-to-r from-green-400 to-green-500',
    },
    medium: {
        label: 'Medium',
        code: PriorityEnum.MEDIUM,
        classNames: 'bg-gradient-to-r from-orange-400 to-orange-500',
    },
    high: {
        label: 'High',
        code: PriorityEnum.HIGH,
        classNames: 'bg-gradient-to-r from-red-500 to-pink-500',
    },
};

export interface TaskPaginationInfo {
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
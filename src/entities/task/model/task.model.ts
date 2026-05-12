import type {StandardObjectWithClassNames, StandardObjectWithStyles} from "@/shared/model/types/common";

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

export const StatusesLabeled: Record<TaskStatusType, StandardObjectWithStyles> = {
    todo: {
        label: 'Waiting',
        code: TaskStatusEnum.TODO,
        styles: {
            color: '#f5c697',
            backgroundColor: '#9e5400',
        },
        classNames: 'bg-[#9e5400]',
    },
    inProgress: {
        label: 'In Progress',
        code: TaskStatusEnum.INPROGRESS,
        styles: {
            color: '#97b2f5',
            backgroundColor: '#00329e',
        },
        classNames: 'bg-[#00329e]',
    },
    done: {
        label: 'Done',
        code: TaskStatusEnum.DONE,
        styles: {
            color: '#c1f49c',
            backgroundColor: '#459a00',
        },
        classNames: 'bg-[#459a00]',
    },
};

export interface TaskPaginationInfo {
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
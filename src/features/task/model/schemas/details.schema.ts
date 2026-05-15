import { z } from "zod"
import {PriorityEnum, TaskStatusEnum} from "@/entities/task";

export const taskStatusSchema = z.object({
    status: z.enum(TaskStatusEnum),
})

export const taskSchema = taskStatusSchema.extend({
    title: z
        .string("Title is required")
        .min(5, "Minimum 5 symbols")
        .max(256, "Maximum 256 symbols"),
    description: z
        .string()
        .max(500, "Maximum 500 symbols")
        .optional(),
    priority: z.enum(PriorityEnum, "Select 1 of priority"),
    deadline: z
        .string('Deadline is required')
        .min(1, { message: 'Deadline is required' })
        .refine((date) => !isNaN(Date.parse(date)), {
            message: 'Invalid date format',
        }),
    tags: z
        .array(z.string(), "Tags is required")
        .min(1, {
            message:
                "At least one tag is required",
        }),
})

export type TaskSchemaType = z.infer<typeof taskSchema>
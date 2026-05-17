import type { Control, FieldErrors, FieldValues, Path } from "react-hook-form";
import type { TaskModeType } from "@/entities/task";

export interface CreateTaskForm<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  styles?: string;
}

export const submitFormText: Record<TaskModeType, string> = {
  create: "Create task",
  working: "Update task",
};

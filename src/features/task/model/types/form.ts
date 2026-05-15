import type {Control, FieldErrors, FieldValues, Path} from "react-hook-form";

export interface CreateTaskForm<T extends FieldValues> {
    control: Control<T>;
    errors: FieldErrors<T>;
    name: Path<T>;
    styles?: string;
}
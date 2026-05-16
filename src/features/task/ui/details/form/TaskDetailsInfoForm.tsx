"use client"

import {useForm} from "react-hook-form";
import {
    ControlledDatePicker,
    ControlledTagAutocomplete,
    PriorityRadio, StatusChange,
    taskSchema,
    type TaskSchemaType,
    useTaskDetailsActions
} from "@/features/task";
import {zodResolver} from "@hookform/resolvers/zod";
import DefaultFormWrapper from "@/widgets/DefaultFormWrapper/DefaultFormWrapper";
import FormField from "@/shared/ui/FormField";
import {cn} from "@/shared/model/utils/utils";
import {
    PriorityEnum,
    type Task,
    TaskMode,
    type TaskModeType,
    type TaskStatusType,
    TaskStatusUpdateModeEnum
} from "@/entities/task";
import {useEffect} from "react";

interface Props {
    task: Task | undefined;
    taskMode: TaskModeType;
}

const TaskDetailsInfoForm = ({ taskMode, task }: Props) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<TaskSchemaType>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            priority: PriorityEnum.LOW,
        }
    });

    useEffect(() => {
        console.log(task?.status);
        if (task && taskMode === TaskMode.WORKING) {
            setValue("title", task.title)
            setValue("description", task.description)
            setValue("deadline", task.deadline)
            setValue("tags", task.tags)
            setValue("priority", task.priority as PriorityEnum)
        }
    }, [task, setValue, taskMode])

    const { loading, handleUpdateTaskStatus, handleUpdateTask, createTaskSubmit } = useTaskDetailsActions();

    return(
        <DefaultFormWrapper
            mainWrapperStyles={"flex flex-col gap-2! "}
            buttonText="Create task"
            buttonDisabled={loading}
            buttonSubmit={handleSubmit(taskMode === TaskMode.CREATE ? createTaskSubmit : handleUpdateTask)}>
            <div className="flex flex-row gap-6 w-full!">
                <div className="flex flex-col gap-2 basis-[80%]">
                    <FormField
                        control={control}
                        label="Title"
                        name="title"
                        errors={errors}
                    />

                    <FormField
                        control={control}
                        label="Description"
                        name="description"
                        errors={errors}
                        textarea={true}
                        inputProps={{
                            rows: 6,
                        }}
                        inputStyles={cn("resize-none!")}
                    />

                    <ControlledTagAutocomplete
                        control={control}
                        errors={errors}
                        name={"tags"}
                    />
                </div>

                <div className="flex flex-col gap-2 basis-[20%]">
                    <PriorityRadio
                        control={control}
                        errors={errors}
                        name={"priority"}
                    />

                    <ControlledDatePicker
                        control={control}
                        errors={errors}
                        name={"deadline"}
                        label={"Deadline"}
                    />

                    {task &&
                        <StatusChange status={task.status} updateStatus={async (status: TaskStatusType) => {
                            await handleUpdateTaskStatus({ id: task.id, status: status }, TaskStatusUpdateModeEnum.DETAILS);
                        }} />
                    }
                </div>
            </div>
        </DefaultFormWrapper>
    );
}

export default TaskDetailsInfoForm;
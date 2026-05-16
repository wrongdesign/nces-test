"use client"

import {useCreateTaskMutation} from "@/shared/model/store/api/task.api";
import {useApiErrorToast} from "@/shared/model/hooks/useApiErrorToast";
import {useTransition} from "react";
import type {TaskSchemaType} from "@/features/task";
import {useRouter} from "next/navigation";
import {formatDate} from "@/shared/model/utils/date";

const useTaskCreate = () => {
    const [createTask, { isLoading: createTaskLoading, error: createTaskError }] = useCreateTaskMutation();

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    useApiErrorToast(createTaskError);

    const handleCreateTask = async (data: TaskSchemaType) => {
        try {
            await createTask({
                ...data,
                deadline: `${formatDate(data.deadline, "sv-SE", "string")} 23:59:59`
            }).unwrap();

            startTransition(() => {
                router.replace("/dashboard")
            });
        } catch (e) {
            console.error(e);
        }
    }

    return {
        onSubmit: handleCreateTask,
        loading: createTaskLoading || isPending,
    }
}

export default useTaskCreate;
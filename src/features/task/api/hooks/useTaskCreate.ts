"use client"

import {useCreateTaskMutation} from "@/shared/model/store/api/task.api";
import {useApiErrorToast} from "@/shared/model/hooks/useApiErrorToast";
import {useTransition} from "react";
import type {TaskSchemaType} from "@/features/task";
import {useRouter} from "next/dist/client/components/navigation";

const useTaskCreate = () => {
    const [createTask, { isLoading: createTaskLoading, error: createTaskError }] = useCreateTaskMutation();

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    useApiErrorToast(createTaskError);

    const handleCreateTask = async (data: TaskSchemaType) => {
        try {
            await createTask(data).unwrap();

            startTransition(() => {
                router.replace("/dashboard")
            })
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
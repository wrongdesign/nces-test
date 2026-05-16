"use client"

import {useLazyDeleteTaskQuery} from "@/shared/model/store/api/task.api";
import {useApiErrorToast} from "@/shared/model/hooks/useApiErrorToast";
import {useAppDispatch} from "@/shared/model/store";
import {useRouter} from "next/navigation";
import {useTransition} from "react";
import {setSelectedTask} from "@/shared/model/store/slices/task/task.slice";

const useTaskDelete = () => {
    const dispatch = useAppDispatch();

    const [deleteTask, {isLoading: deleteTaskLoading, error: deleteTaskError}] = useLazyDeleteTaskQuery();

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    useApiErrorToast(deleteTaskError)

    const handleDeleteTask = async (id: string) => {
        try {
            await deleteTask({ id: id }).unwrap();

            startTransition(() => {
                router.replace("/dashboard");
            });

            dispatch(setSelectedTask(undefined));
        } catch (e) {
            console.error(e);
        }
    }

    return {
        handleDeleteTask,
        loadingDeleteProcess: deleteTaskLoading || isPending,
    }
}

export default useTaskDelete
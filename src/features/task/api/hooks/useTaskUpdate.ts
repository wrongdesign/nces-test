"use client"

import {useUpdateTaskMutation} from "@/shared/model/store/api/task.api";
import {useApiErrorToast} from "@/shared/model/hooks/useApiErrorToast";
import type {TaskSchemaType} from "@/features/task";
import {useAppDispatch, useAppSelector} from "@/shared/model/store";
import {setUpdateSelectedTask} from "@/shared/model/store/slices/task/task.slice";

const useTaskUpdate = () => {
    const dispatch = useAppDispatch();
    const selectedTask = useAppSelector(state => state.task.selectedTask);

    const [updateTask, { isLoading: updateTaskLoading, error: updateTaskError }] = useUpdateTaskMutation();

    useApiErrorToast(updateTaskError);

    const handleUpdateTask = async (data: TaskSchemaType) => {
        try {
            if (selectedTask) {
                await updateTask({ data, id: selectedTask }).unwrap();

                dispatch(setUpdateSelectedTask(true));
            }
        } catch (e) {
            console.error(e);
        }
    }

    return {
        updateTaskLoading,
        handleUpdateTask,
    };
}

export default useTaskUpdate;
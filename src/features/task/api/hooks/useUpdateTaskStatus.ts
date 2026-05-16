"use client"

import {useUpdateStatusMutation} from "@/shared/model/store/api/task.api";
import {useApiErrorToast} from "@/shared/model/hooks/useApiErrorToast";
import {useAppDispatch} from "@/shared/model/store";

import {type TaskStatusUpdate, TaskStatusUpdateModeEnum, type TaskStatusUpdateModeType} from "@/entities/task";
import {setFetchTasks, setUpdateSelectedTask} from "@/shared/model/store/slices/task/task.slice";
import {useState} from "react";

const useUpdateTaskStatus = () => {
    const dispatch = useAppDispatch();

    const [updateTaskStatus, { isLoading: updateStatusLoading, error: updateStatusError }] = useUpdateStatusMutation();

    const [updatingTask, setUpdatingTask] = useState<Pick<TaskStatusUpdate, "id">>({ id: "" });

    useApiErrorToast(updateStatusError);

    const handleUpdateTaskStatus = async (data: TaskStatusUpdate, mode: TaskStatusUpdateModeType = TaskStatusUpdateModeEnum.DEFAULT) => {
        try {
            setUpdatingTask({ id: data.id });

            await updateTaskStatus(data).unwrap();

            if (mode === TaskStatusUpdateModeEnum.DEFAULT) {
                dispatch(setFetchTasks(true));
            } else {
                dispatch(setUpdateSelectedTask(true));
            }
        } catch (e) {
            console.error(e);
        } finally {
            setUpdatingTask({ id: "" });
        }
    }

    return {
        handleUpdateTaskStatus,
        updateStatusLoading,
        updatingTask,
    };
}

export default useUpdateTaskStatus;
"use client"

import {useUpdateStatusMutation} from "@/shared/model/store/api/task.api";
import {useApiErrorToast} from "@/shared/model/hooks/useApiErrorToast";
import {useAppDispatch} from "@/shared/model/store";
import {useEffect} from "react";
import {setUpdatedTask} from "@/shared/model/store/slices/task/task.slice";

const useUpdateTaskStatus = () => {
    const dispatch = useAppDispatch();

    const [updateTaskStatus, { data: updatedTask, isLoading: updateStatusLoading, error: updateStatusError }] = useUpdateStatusMutation();

    useApiErrorToast(updateStatusError);

    useEffect(() => {
        if (updatedTask) dispatch(setUpdatedTask(updatedTask));
    }, [updatedTask, dispatch]);

    return {
        updateTaskStatus,
        updateStatusLoading,
    };
}

export default useUpdateTaskStatus;
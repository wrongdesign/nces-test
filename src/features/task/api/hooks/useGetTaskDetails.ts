"use client"

import {useGetTaskByIdQuery} from "@/shared/model/store/api/task.api";
import {useAppDispatch, useAppSelector} from "@/shared/model/store";
import {useApiErrorToast} from "@/shared/model/hooks/useApiErrorToast";
import {useEffect} from "react";
import {setTaskExpired, setUpdateSelectedTask} from "@/shared/model/store/slices/task/task.slice";
import {TaskStatusEnum} from "@/entities/task";

const useGetTaskDetails = () => {
    const dispatch = useAppDispatch()
    const taskId = useAppSelector(state => state.task.selectedTask);
    const taskFetch = useAppSelector(state => state.task.updateSelectedTask);

    const { data: task, isLoading: getTaskLoading, error: getTaskError, refetch: taskRefetch } = useGetTaskByIdQuery(taskId ?? { id: "" });

    useApiErrorToast(getTaskError);

    useEffect(() => {
        if (taskFetch) {
            taskRefetch();
            dispatch(setUpdateSelectedTask(false));
        }
    }, [taskFetch, taskRefetch, dispatch]);

    useEffect(() => {
        if(task) {
            const expiredDeadline: boolean = new Date() > new Date(task.deadline) && task.status !== TaskStatusEnum.DONE;
            dispatch(setTaskExpired(expiredDeadline));
        } else {
            dispatch(setTaskExpired(false));
        }
    }, [task, dispatch]);

    return {
        task,
        getTaskLoading,
    }
}

export default useGetTaskDetails;
"use client"

import {useLazyGetTasksQuery} from "@/shared/model/store/api/task.api";
import {useApiErrorToast} from "@/shared/model/hooks/useApiErrorToast";
import {useEffect} from "react";
import {useAppDispatch} from "@/shared/model/store";
import {setTasks} from "@/shared/model/store/slices/task/task.slice";

const useGetTasks = () => {
    const dispatch = useAppDispatch();

    const [getTasks, {data: tasks, isLoading: tasksLoading, error: getTasksError}] = useLazyGetTasksQuery();

    useApiErrorToast(getTasksError);

    useEffect(() => {
        if (tasks) dispatch(setTasks(tasks));
    }, [tasks, dispatch]);

    return {
        getTasks,
        tasksLoading,
    };
}

export default useGetTasks;
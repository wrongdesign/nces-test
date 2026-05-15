"use client"

import { useLazyGetTasksQuery } from "@/shared/model/store/api/task.api";
import {useApiErrorToast} from "@/shared/model/hooks/useApiErrorToast";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/shared/model/store";
import {
    setFetchTags,
    setFetchTasks,
    setPaginationInfo,
    setTasks,
} from "@/shared/model/store/slices/task/task.slice";

const useGetTasks = () => {
    const dispatch = useAppDispatch();

    const currentPagination = useAppSelector(state => state.task.currentPagination);
    const fetchTasks = useAppSelector(state => state.task.fetchTasks);
    const filters = useAppSelector(state => state.task.filters);

    const [getTasks, {data: tasks, isLoading: tasksLoading, error: getTasksError}] = useLazyGetTasksQuery();

    useApiErrorToast(getTasksError);

    useEffect(() => {
        if (fetchTasks) {
            getTasks({ ...currentPagination, ...filters }).unwrap();
        }
    }, [fetchTasks, getTasks, currentPagination, filters]);

    useEffect(() => {
        if (tasks) {
            dispatch(setTasks(tasks.tasks));
            dispatch(setPaginationInfo({ pagination: tasks?.pagination }));
            dispatch(setFetchTasks(false));
            dispatch(setFetchTags(true));
        }
    }, [tasks, dispatch]);

    return {
        tasksLoading,
    };
}

export default useGetTasks;
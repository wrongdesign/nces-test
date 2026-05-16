"use client"

import {useGetTasksQuery} from "@/shared/model/store/api/task.api";
import {useApiErrorToast} from "@/shared/model/hooks/useApiErrorToast";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/shared/model/store";
import {
    setFetchTags,
    setFetchTasks,
    setPaginationInfo,
} from "@/shared/model/store/slices/task/task.slice";

const useGetTasks = () => {
    const dispatch = useAppDispatch();

    const currentPagination = useAppSelector(state => state.task.currentPagination);
    const fetchTasks = useAppSelector(state => state.task.fetchTasks);
    const filters = useAppSelector(state => state.task.filters);

    const {data: tasks, isLoading: tasksLoading, error: getTasksError, refetch: getTasks} =
        useGetTasksQuery({ ...currentPagination, ...filters }, { skip: !fetchTasks });

    useApiErrorToast(getTasksError);

    useEffect(() => {
        if (fetchTasks) {
            getTasks().unwrap();
        }
    }, [fetchTasks, getTasks]);

    useEffect(() => {
        if (tasks) {
            dispatch(setPaginationInfo({ pagination: tasks?.pagination }));
            dispatch(setFetchTasks(false));
            dispatch(setFetchTags(true));
        }
    }, [tasks, dispatch]);

    return {
        tasks: tasks?.tasks,
        tasksLoading,
    };
}

export default useGetTasks;
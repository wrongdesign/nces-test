"use client"

import {
    useLazyGetTagsQuery,
    useLazyGetTasksQuery
} from "@/shared/model/store/api/task.api";
import {useApiErrorToast} from "@/shared/model/hooks/useApiErrorToast";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/shared/model/store";
import {
    setFetchTags,
    setFetchTasks,
    setPaginationInfo, setTasks,
} from "@/shared/model/store/slices/task/task.slice";

const useGetTasks = () => {
    const dispatch = useAppDispatch();

    const currentPagination = useAppSelector(state => state.task.currentPagination);
    const fetchTasks = useAppSelector(state => state.task.fetchTasks);
    const fetchTags = useAppSelector(state => state.task.fetchTags);
    const filters = useAppSelector(state => state.task.filters);

    const [getTasks, {data: tasks, isLoading: tasksLoading, error: getTasksError}] = useLazyGetTasksQuery();
    const [getTags, {data: tags, isLoading: tagsLoading, error: getTagsError}] = useLazyGetTagsQuery();

    useApiErrorToast(getTasksError || getTagsError);

    useEffect(() => {
        if (fetchTasks) {
            getTasks({ ...currentPagination, ...filters}).unwrap();
        }
    }, [fetchTasks, getTasks, currentPagination, filters]);

    useEffect(() => {
        if (fetchTags) {
            getTags().unwrap();
        }
    }, [fetchTags, getTags]);

    useEffect(() => {
        if (tasks) {
            dispatch(setTasks(tasks.tasks));
            dispatch(setPaginationInfo({ pagination: tasks?.pagination }));
            dispatch(setFetchTasks(false));
        }
    }, [tasks, dispatch]);

    useEffect(() => {
        if (tags) {
            dispatch(setFetchTags(false));
        }
    }, [tags, dispatch]);

    return {
        loading: tasksLoading || tagsLoading,
        tags: tags
    };
}

export default useGetTasks;
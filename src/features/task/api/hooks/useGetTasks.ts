"use client"

import {
    useLazyGetTagsQuery,
    useLazyGetTasksQuery
} from "@/shared/model/store/api/task.api";
import {useApiErrorToast} from "@/shared/model/hooks/useApiErrorToast";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/shared/model/store";
import {setFetchTags, setFetchTasks, setPaginationInfo} from "@/shared/model/store/slices/task/task.slice";
import {PAGINATION_LIMIT} from "@/features/task";

const useGetTasks = () => {
    const dispatch = useAppDispatch();

    const currentPage = useAppSelector(state => state.task.currentPage);
    const fetchTasks = useAppSelector(state => state.task.fetchTasks);
    const fetchTags = useAppSelector(state => state.task.fetchTags);

    const [getTasks, {data: tasks, isLoading: tasksLoading, error: getTasksError}] = useLazyGetTasksQuery();
    const [getTags, {data: tags, isLoading: tagsLoading, error: getTagsError}] = useLazyGetTagsQuery();

    useApiErrorToast(getTasksError || getTagsError);

    useEffect(() => {
        if (fetchTasks) {
            getTasks({page: currentPage, limit: PAGINATION_LIMIT}).unwrap();
        }
    }, [fetchTasks, getTasks, currentPage]);

    useEffect(() => {
        if (fetchTags) {
            getTags().unwrap();
        }
    }, [fetchTags, getTags]);

    useEffect(() => {
        if (tasks) {
            dispatch(setPaginationInfo({pagination: tasks?.pagination}));
            dispatch(setFetchTasks(false));
        }
    }, [tasks, dispatch]);

    useEffect(() => {
        if (tags) {
            dispatch(setFetchTags(false));
        }
    }, [tags, dispatch]);

    return {
        tasks: tasks?.tasks,
        loading: tasksLoading || tagsLoading,
        tags: tags
    };
}

export default useGetTasks;
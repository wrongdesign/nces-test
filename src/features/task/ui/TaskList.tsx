"use client"

import useGetTasks from "@/features/task/api/hooks/useGetTasks";
import LoaderComponent from "@/shared/ui/LoaderComponent";
import {useAppDispatch, useAppSelector} from "@/shared/model/store";
import {FiltersBlock, TaskComponent, TaskPagination} from "@/features/task";
import {useEffect} from "react";
import {setFetchTags, setFetchTasks, setFilters} from "@/shared/model/store/slices/task/task.slice";

const TaskList = () => {
    const dispatch = useAppDispatch();

    const filters = useAppSelector(state => state.task.filters);
    const tasks = useAppSelector((state) => state.task.tasks);

    const { loading, tags } = useGetTasks();

    useEffect(() => {
        dispatch(setFetchTasks(true));
        dispatch(setFetchTags(true));
    }, [dispatch]);

    return(
        <div className="flex flex-col gap-2 w-full!">
            <FiltersBlock tags={tags} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks && tasks.length > 0 && (
                    tasks.map((task) => (
                        <TaskComponent
                            key={task.id}
                            {...task}
                            tagsList={tags}
                            setTag={(tag) =>
                                dispatch(setFilters({ ...filters, tag: tag }))}
                        />
                    ))
                )}
                {loading && <LoaderComponent fixed={true} />}
            </div>

            <TaskPagination />
        </div>

    );
}

export default TaskList;
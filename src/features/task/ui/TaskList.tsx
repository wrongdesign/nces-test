"use client"

import useGetTasks from "@/features/task/api/hooks/useGetTasks";
import LoaderComponent from "@/shared/ui/LoaderComponent";
import {useAppDispatch} from "@/shared/model/store";
import {TaskComponent} from "@/features/task";
import {useEffect} from "react";
import {setFetchTags, setFetchTasks} from "@/shared/model/store/slices/task/task.slice";

const TaskList = () => {
    const dispatch = useAppDispatch();

    const { tasks, loading, tags } = useGetTasks();

    useEffect(() => {
        dispatch(setFetchTasks(true));
        dispatch(setFetchTags(true));
    }, [dispatch]);

    return(
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks && tasks.length > 0 && (
                    tasks.map((task) => (
                        <TaskComponent key={task.id} {...task} tagsList={tags} />
                    ))
                )}
                {loading && <LoaderComponent fixed={true} />}
            </div>


    );
}

export default TaskList;
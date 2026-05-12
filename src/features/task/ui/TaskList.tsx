"use client"

import useGetTasks from "@/features/task/api/hooks/useGetTasks";
import LoaderComponent from "@/shared/ui/LoaderComponent";
import {useAppSelector} from "@/shared/model/store";
import {PAGINATION_LIMIT, TaskComponent} from "@/features/task";
import {useEffect} from "react";

const TaskList = () => {
    const tasks = useAppSelector(state => state.task.tasks);

    const currentPage = useAppSelector(state => state.task.currentPage);

    const { getTasks, tasksLoading } = useGetTasks();

    useEffect(() => {
        getTasks({page: currentPage, limit: PAGINATION_LIMIT});
    }, [getTasks, currentPage]);

    return(
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks && tasks.length > 0 && (
                    tasks.map((task) => (
                        <TaskComponent key={task.id} {...task} />
                    ))
                )}
                {tasksLoading && <LoaderComponent fixed={true} />}
            </div>


    );
}

export default TaskList;
"use client"

import {TaskMode, type TaskModeType} from "@/entities/task";
import {DeleteTask, TaskDetailsInfoForm, useGetTags, useGetTaskDetails, useTaskDelete} from "@/features/task";
import LoaderComponent from "@/shared/ui/LoaderComponent";

interface Props {
    taskMode: TaskModeType;
}

const TaskDetails = ({ taskMode }: Props) => {
    const { task, getTaskLoading } = useGetTaskDetails();

    const { tagsLoading } = useGetTags();

    const { handleDeleteTask, loadingDeleteProcess } = useTaskDelete();

    const loading: boolean = getTaskLoading || tagsLoading || loadingDeleteProcess;

    return(
        <div className="flex flex-col gap-4 w-full!">
            <TaskDetailsInfoForm taskMode={taskMode} task={task} />

            {taskMode !== TaskMode.CREATE && (
                <DeleteTask onConfirm={async () => await handleDeleteTask(task?.id ?? "")} />
            )}

            {loading && <LoaderComponent />}
        </div>
    );
}

export default TaskDetails;
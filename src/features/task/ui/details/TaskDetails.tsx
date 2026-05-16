"use client"

import {Button} from "@/shared/ui/button";
import {TaskMode, type TaskModeType} from "@/entities/task";
import {TaskDetailsInfoForm, useGetTaskDetails} from "@/features/task";
import LoaderComponent from "@/shared/ui/LoaderComponent";

interface Props {
    taskMode: TaskModeType;
}

const TaskDetails = ({ taskMode }: Props) => {
    const { task, getTaskLoading } = useGetTaskDetails();

    return(
        <div className="flex flex-col gap-4 w-full!">
            <TaskDetailsInfoForm taskMode={taskMode} task={task} />

            {taskMode !== TaskMode.CREATE && (
                <div className={'flex justify-end w-full!'}>
                    <Button variant="destructive" className="cursor-pointer" onClick={() => {}}>
                        Close task
                    </Button>
                </div>
            )}

            {getTaskLoading && <LoaderComponent />}
        </div>
    );
}

export default TaskDetails;
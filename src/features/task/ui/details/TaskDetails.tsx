"use client"

import {Button} from "@/shared/ui/button";
import {TaskMode, type TaskModeType} from "@/entities/task";
import {TaskDetailsInfoForm} from "@/features/task";

interface Props {
    taskMode: TaskModeType;
}

const TaskDetails = ({ taskMode }: Props) => {
    return(
        <div className="flex flex-col gap-4 w-full!">
            <TaskDetailsInfoForm />

            {taskMode !== TaskMode.CREATE && (
                <div className={'flex justify-end w-full!'}>
                    <Button variant="destructive" className="cursor-pointer" onClick={() => {}}>
                        Close task
                    </Button>
                </div>
            )}

        </div>
    );
}

export default TaskDetails;
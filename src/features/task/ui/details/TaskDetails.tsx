"use client"

import {Button} from "@/shared/ui/button";
import {useAppSelector} from "@/shared/model/store";
import {TaskMode, type TaskModeType, TaskStatusEnum} from "@/entities/task";
import {TaskDetailsInfoForm} from "@/features/task";

interface Props {
    mainDisabler: boolean;
    taskMode: TaskModeType;
}

const TaskDetails = ({ mainDisabler, taskMode }: Props) => {
    const task = useAppSelector((state) => state.task.selectedTask);

    return(
        <div className="flex flex-col gap-4 w-full!">
            <TaskDetailsInfoForm />

            <div className={'flex justify-end w-full!'}>
                {(task?.status !== TaskStatusEnum.DONE) && (
                    <Button variant="destructive" className="cursor-pointer" onClick={() => {}}>
                        Close task
                    </Button>
                )}
            </div>

            {/* TODO: Place here logic for comments and history*/}
            {/*{taskMode === TaskMode.WORKING }*/}
        </div>
    );
}

export default TaskDetails;
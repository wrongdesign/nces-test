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

    const disableConfirm: boolean = false;
    const submitButtonText: string = "Submit";

    return(
        <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center">
                <div className={'flex flex-row gap-4'}>
                    {!mainDisabler && (
                        <Button
                            variant="secondary"
                            disabled={disableConfirm}
                            onClick={async () => {}}
                        >
                            {submitButtonText}
                        </Button>
                    )}
                    {(task?.status !== TaskStatusEnum.DONE) && (
                        <Button variant="destructive" className="cursor-pointer" onClick={() => {}}>
                            Close task
                        </Button>
                    )}
                </div>
            </div>

            <TaskDetailsInfoForm />

            {/* TODO: Place here logic for comments and history*/}
            {/*{taskMode === TaskMode.WORKING }*/}
        </div>
    );
}

export default TaskDetails;
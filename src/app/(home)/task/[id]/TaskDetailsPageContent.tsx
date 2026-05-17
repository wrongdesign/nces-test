"use client"

import {useAppDispatch, useAppSelector} from "@/shared/model/store";
import {useEffect} from "react";
import {setSelectedTask, setUpdateSelectedTask} from "@/shared/model/store/slices/task/task.slice";
import DefaultPageWrapper from "@/shared/ui/DefaultPageWrapper";
import BackButton from "@/shared/ui/BackButton/BackButton";
import {cn} from "@/shared/model/utils/utils";
import {TaskDetails} from "@/features/task";
import {TaskMode} from "@/entities/task";

const TaskDetailsPageContent = ({ id }: { id: string }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(setSelectedTask(id));
            dispatch(setUpdateSelectedTask(true));
        }

        return () => {
            dispatch(setSelectedTask(undefined));
            dispatch(setUpdateSelectedTask(false));
        }
    }, [id, dispatch]);

    const expired = useAppSelector(state => state.task.taskExpired);
    return(
        <DefaultPageWrapper
            backButton={<BackButton />}
            title={"Task Details"}
            additionalStyles={cn(expired && "border border-destructive!")}
        >
            <TaskDetails taskMode={TaskMode.WORKING} />
        </DefaultPageWrapper>
    );
}

export default TaskDetailsPageContent;
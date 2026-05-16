"use client"

import BackButton from "@/widgets/BackButton/BackButton";
import {TaskDetails} from "@/features/task";
import {TaskMode} from "@/entities/task";
import DefaultPageWrapper from "@/shared/ui/DefaultPageWrapper";
import {cn} from "@/shared/model/utils/utils";
import {useAppSelector} from "@/shared/model/store";

const TaskDetailsPage = ({ id }: {id: string}) => {
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

export default TaskDetailsPage;
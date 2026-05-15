"use client"

import BackButton from "@/widgets/BackButton/BackButton";
import {TaskDetails} from "@/features/task";
import {TaskMode} from "@/entities/task";
import DefaultPageWrapper from "@/shared/ui/DefaultPageWrapper";

const TaskDetailsPage = ({ id }: {id: string}) => {
    return(
        <DefaultPageWrapper
            backButton={<BackButton />}
            title={"Task Details"}
        >
            <TaskDetails taskMode={TaskMode.WORKING} />
        </DefaultPageWrapper>
    );
}

export default TaskDetailsPage;
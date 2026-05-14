"use client"

import DefaultBlock from "@/shared/ui/DefaultBlock";
import BackButton from "@/widgets/BackButton/BackButton";
import {TaskDetails} from "@/features/task";

const TaskDetailsPage = ({id}: {id: string}) => {
    console.log(id);
    return(
        <DefaultBlock customClassName="flex flex-col gap-4">
            <div className="flex flex-row flex-wrap gap-10 w-full items-center justify-start">
                <BackButton />

                <p className="text-2xl leading-none">Task Details</p>
            </div>

            <TaskDetails mainDisabler={false} taskMode={"create"} />
        </DefaultBlock>
    );
}

export default TaskDetailsPage;
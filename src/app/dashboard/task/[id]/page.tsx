"use client"

import DefaultBlock from "@/shared/ui/DefaultBlock";
import BackButton from "@/widgets/BackButton/BackButton";

const TaskDetailsPage = ({id}: {id: string}) => {
    console.log(id);
    return(
        <DefaultBlock>
            <div className="flex flex-row flex-wrap gap-10 w-full items-center justify-start">
                <BackButton />

                <p className="text-2xl leading-none">Task Details</p>
            </div>
        </DefaultBlock>
    );
}

export default TaskDetailsPage;
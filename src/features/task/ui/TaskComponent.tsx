"use client"

import {PriorityLabeled, type Tag, type Task, type TaskStatusType} from "@/entities/task";
import {Button} from "@/shared/ui/button";
import {cn} from "@/shared/model/utils/utils";
import {CalendarClock} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/shared/ui/tooltip";
import {Badge} from "@/shared/ui/badge";
import {StatusChange, useUpdateTaskStatus} from "@/features/task";

interface Props {
    tagsList: Tag[] | undefined;
}

const TaskComponent = ({
    title,
    description,
    status,
    tags,
    priority,
    deadline,
    tagsList,
    id,
}: Task & Props) => {
    const { updateTaskStatus, updateStatusLoading } = useUpdateTaskStatus();

    const expiredDeadline: boolean = new Date() > new Date(deadline);

    const handleTaskDetailsOpen = () => {

    }

    return(
        <Button
            className="flex flex-col gap-2 h-full justify-start! rounded-2xl p-5 hover:shadow-lg transition-all cursor-pointer select-none"
            variant={expiredDeadline ? "destructive" : "secondary"}
            onClick={handleTaskDetailsOpen}
            disabled={updateStatusLoading}
        >
            <div className="flex flex-row w-full items-center justify-between mb-3">
                <StatusChange status={status} updateStatus={async (status: TaskStatusType) => {
                    await updateTaskStatus({ id: id, status: status }).unwrap();
                }} />
                <Badge className={cn(
                    `px-2 py-1 rounded-lg text-xs font-semibold text-white`,
                    PriorityLabeled[priority]?.classNames
                )}>
                    {PriorityLabeled[priority]?.label}
                </Badge>
            </div>

            <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-[1.25rem] text-left">{title}</h3>

            <p className="max-w-[90%] whitespace-pre-wrap text-gray-600 dark:text-white">{description}</p>

            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center gap-1">
                        <CalendarClock className="text-gray-600 dark:text-white" size={20} />
                        <p className="text-sm leading-none text-gray-600 dark:text-white">
                            {new Date(deadline ?? '').toLocaleString()}
                        </p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{`Deadline${expiredDeadline ? " is expired!" : ""}`}</p>
                </TooltipContent>
            </Tooltip>

            <div className="flex flex-row gap-2 flex-wrap">
                {tags && tags.length > 0 && (
                    tags.map((tag) => (
                        <Badge key={tag}  variant="default">
                            {tagsList?.find((tagObject) => tagObject.id === tag)?.name ?? tag}
                        </Badge>
                    ))
                )}
            </div>
        </Button>
    );
}

export default TaskComponent;
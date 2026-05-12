"use client"

import {PriorityLabeled, type Task, TaskStatusEnum} from "@/entities/task";
import {Button} from "@/shared/ui/button";
import {cn} from "@/shared/model/utils/utils";
import {Calendar, CalendarClock, CalendarSync} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/shared/ui/tooltip";
import {StatusesLabeled} from "@/entities/task/model/task.model";
import {Badge} from "@/shared/ui/badge";

const TaskComponent = ({ title, description, createdAt, status, tags, priority, updatedAt, deadline}: Task) => {
    const handleTaskDetailsOpen = () => {

    }

    return(
        <Button
            className="flex flex-col gap-2 h-full justify-start! rounded-2xl p-5 hover:shadow-lg transition-all cursor-pointer select-none"
            variant="secondary"
            onClick={handleTaskDetailsOpen}
        >
            <div className="flex flex-row w-full items-center justify-between mb-3">
                <Badge className={cn(
                    `px-2 py-1 rounded-lg text-xs font-semibold text-white`,
                    StatusesLabeled[status ?? TaskStatusEnum.TODO]?.classNames
                )}>
                    {StatusesLabeled[status ?? TaskStatusEnum.TODO]?.label}
                </Badge>
                <Badge className={cn(
                    `px-2 py-1 rounded-lg text-xs font-semibold text-white`,
                    PriorityLabeled[priority]?.classNames
                )}>
                    {PriorityLabeled[priority]?.label}
                </Badge>
            </div>

            <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-[1.25rem] text-left">{title}</h3>

            <p className="max-w-[90%] whitespace-pre-wrap">{description}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs mb-4">
                <Tooltip>
                    <TooltipTrigger>
                        <div className="flex items-center gap-1">
                            <Calendar className="text-gray-600 dark:text-white" size={20} />
                            <p className="text-sm leading-none text-gray-600dark:text-white">
                                {new Date(createdAt ?? '').toLocaleString()}
                            </p>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Date of create</p>
                    </TooltipContent>
                </Tooltip>

                {updatedAt && (
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="flex items-center gap-1">
                                <CalendarSync className="text-gray-600 dark:text-white" size={20} />
                                <p className="text-sm text-gray-600 dark:text-white">{new Date(createdAt ?? '').toLocaleString()}</p>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Date of update</p>
                        </TooltipContent>
                    </Tooltip>
                )}

                <Tooltip>
                    <TooltipTrigger>
                        <div className="flex items-center gap-1">
                            <CalendarClock className="text-gray-600 dark:text-white" size={20} />
                            <p className="text-sm leading-none text-gray-600 dark:text-white">
                                {new Date(deadline ?? '').toLocaleString()}
                            </p>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Deadline</p>
                    </TooltipContent>
                </Tooltip>
            </div>

            <div className="flex flex-row gap-2 flex-wrap">
                {tags && tags.length > 0 && (
                    tags.map((tag) => (
                        <Badge key={tag}  variant="default">
                            {tag}
                        </Badge>
                    ))
                )}
            </div>
        </Button>
    );
}

export default TaskComponent;
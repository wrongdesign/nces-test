"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/shared/ui/dropdown-menu";
import {TaskStatusEnum, type TaskStatusType} from "@/entities/task";
import {cn} from "@/shared/model/utils/utils";
import {StatusesLabeled, TaskStatusesArray} from "@/entities/task/model/task.model";
import {Badge} from "@/shared/ui/badge";

interface Props {
    status: TaskStatusType;
}

const StatusChange = ({ status }: Props) => {
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="hover:scale-[1.1]">
                <Badge className={cn(
                    `px-2 py-1 rounded-lg text-xs font-semibold text-white`,
                    StatusesLabeled[status ?? TaskStatusEnum.TODO]?.classNames
                )}>
                    {StatusesLabeled[status ?? TaskStatusEnum.TODO]?.label}
                </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8} align="end" className="border-0 bg-background/90 p-0">
                {TaskStatusesArray.map((statusItem) => (
                    <DropdownMenuItem key={statusItem} onClick={() => {}} className="defaultDropDownPoint">
                        {StatusesLabeled[statusItem ?? TaskStatusEnum.TODO]?.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default StatusChange;
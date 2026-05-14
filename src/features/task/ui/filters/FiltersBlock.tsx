"use client"

import {SelectItem} from "@/shared/ui/select";
import {useAppDispatch, useAppSelector} from "@/shared/model/store";
import {
    PriorityArray,
    PriorityLabeled, type PriorityType,
    StatusesLabeled,
    type Tag,
    TaskStatusesArray, type TaskStatusType
} from "@/entities/task/model/task.model";
import {useMemo} from "react";
import {setFilters} from "@/shared/model/store/slices/task/task.slice";
import {selectItemClassNames} from "@/features/task";
import CustomSelect from "@/shared/ui/CustomSelect";

interface Props {
    tags: Tag[] | undefined;
}

const FiltersBlock = ({ tags }: Props) => {
    const dispatch = useAppDispatch();

    const filters = useAppSelector(state => state.task.filters);
    const selectedStatus = useMemo(() => filters?.status ? StatusesLabeled[filters.status].label : undefined, [filters?.status]);
    const selectedPriority = useMemo(() => filters?.priority ? PriorityLabeled[filters.priority].label : undefined, [filters?.priority])
    const selectedTag = useMemo(() => {
        if (!tags || !filters?.tag) return undefined;

        return tags.find((tag) => tag.id === filters.tag);
    }, [filters?.tag, tags])

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CustomSelect
                value={filters?.status}
                selectedValue={selectedStatus}
                name={"status"}
                onValueChange={(value) =>
                dispatch(setFilters({ ...filters, status: value === "all" ? undefined : (value as TaskStatusType)}))}
            >
                {TaskStatusesArray.map((item) => {
                    return (
                        <SelectItem value={item} key={`${item}-search-status-select`} className={selectItemClassNames}>
                            {StatusesLabeled[item].label}
                        </SelectItem>
                    );
                })}
            </CustomSelect>

            <CustomSelect
                value={filters?.priority}
                selectedValue={selectedPriority}
                name={"priority"}
                onValueChange={(value) =>
                    dispatch(setFilters({ ...filters, priority: value === "all" ? undefined : (value as PriorityType)}))
                }
            >
                {PriorityArray.map((item) => {
                    return (
                        <SelectItem value={item} key={`${item}-search-priority-select`} className={selectItemClassNames}>
                            {PriorityLabeled[item].label}
                        </SelectItem>
                    );
                })}
            </CustomSelect>

            <CustomSelect
                value={selectedTag?.name}
                selectedValue={selectedTag?.name}
                name={"tag"}
                onValueChange={(value) =>
                    dispatch(setFilters({ ...filters, tag: value === "all" ? undefined : tags?.find(item => item.name === value)?.id}))
                }
            >
                {tags?.map((item) => {
                    return (
                        <SelectItem value={item.name} key={`${item.id}-search-tag-select`} className={selectItemClassNames}>
                            {item.name}
                        </SelectItem>
                    );
                })}
            </CustomSelect>
        </div>
    );
}

export default FiltersBlock;
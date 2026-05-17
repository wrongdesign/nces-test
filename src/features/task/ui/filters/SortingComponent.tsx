"use client"

import {RadioGroup, RadioGroupItem} from "@/shared/ui/radio-group";
import {Label} from "@/shared/ui/label";
import {useAppDispatch, useAppSelector} from "@/shared/model/store";
import {TaskSortingArray, TaskSortingLabeled, type TaskSortingType} from "@/entities/task";
import {setFilters} from "@/shared/model/store/slices/task/task.slice";

const SortingComponent = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(state => state.task.filters);

    return (
        <RadioGroup defaultValue={filters.sorting} className="flex flex-row gap-4 flex-wrap">
            {TaskSortingArray.map((item) => (
                <div key={`${item}-radio-item`} className="flex items-center gap-1 cursor-pointer">
                    <RadioGroupItem
                        value={item}
                        id={item}
                        onClick={(e) =>
                            dispatch(setFilters({sorting: e.currentTarget.value as TaskSortingType}))}
                        className="cursor-pointer"
                    />
                    <Label htmlFor={item} className="cursor-pointer">{TaskSortingLabeled[item]?.label}</Label>
                </div>
            ))}
        </RadioGroup>
    );
}

export default SortingComponent;
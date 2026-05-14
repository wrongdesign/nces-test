"use client"

import type {Tag} from "@/entities/task/model/task.model";
import {SearchByName, SelectFiltersList, SortingComponent} from "@/features/task";

interface Props {
    tags: Tag[] | undefined;
}

const FiltersBlock = ({ tags }: Props) => {
    return(
        <div className="flex flex-col gap-2 w-full!">
            <div className="w-full! grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SearchByName />
                <SortingComponent />
            </div>

            <SelectFiltersList tags={tags} />
        </div>
    );
}

export default FiltersBlock;
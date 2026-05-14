"use client"

import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui/select";
import {selectItemClassNames, selectTriggerClassNames} from "@/features/task";
import type {PropsWithChildren} from "react";

interface Props {
    value: string | undefined;
    selectedValue: string | undefined;
    name: string;
    onValueChange: (selectedValue: string) => void;
}

const CustomSelect = ({ value, selectedValue, children, onValueChange, name }: PropsWithChildren<Props>) => {
    return(
        <Select
        value={value ?? "all"}
        onValueChange={onValueChange}
    >
        <SelectTrigger className={selectTriggerClassNames}>
            <SelectValue>
                <p className="text-sm">{selectedValue ?? "All"}</p>
            </SelectValue>
        </SelectTrigger>
        <SelectContent className={'p-0'}>
            <SelectGroup>
                <SelectItem value={"all"} key={`all-search-${name}-select`} className={selectItemClassNames}>
                    All
                </SelectItem>
                {children}
            </SelectGroup>
        </SelectContent>
    </Select>
    );
}

export default CustomSelect;
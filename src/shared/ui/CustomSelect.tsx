"use client"

import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui/select";
import {selectItemClassNames, selectTriggerClassNames} from "@/features/task";
import type {PropsWithChildren} from "react";
import {Label} from "@/shared/ui/label";

interface Props {
    value: string | undefined;
    selectedValue: string | undefined;
    name: string;
    onValueChange: (selectedValue: string) => void;
}

const CustomSelect = ({ value, selectedValue, children, onValueChange, name }: PropsWithChildren<Props>) => {
    return(
        <div className="flex flex-col gap-1">
            <Label className="text-sm">{name.toUpperCase()}</Label>
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
        </div>
    );
}

export default CustomSelect;
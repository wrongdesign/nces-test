"use client"

import {
    PriorityArray,
    PriorityLabeled,
} from "@/entities/task";
import {RadioGroup, RadioGroupItem} from "@/shared/ui/radio-group";
import {Label} from "@/shared/ui/label";
import {
    Controller,
    type FieldError,
    type FieldValues,
} from "react-hook-form";
import type React from "react";
import type {CreateTaskForm} from "@/features/task";

const PriorityRadio = <T extends FieldValues>({ control, errors, name }: CreateTaskForm<T>) => {
    return(
        <div className={"flex flex-col gap-2"}>
            <Label>Priority</Label>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => {
                    return (
                        <RadioGroup defaultValue={value} className="flex flex-col gap-1 flex-wrap">
                            {PriorityArray.map((item) => {
                                return (
                                    <div key={`${item}-priority-radio-item`} className="flex items-center gap-1 cursor-pointer w-fit">
                                        <RadioGroupItem
                                            value={item}
                                            id={item}
                                            onClick={() => onChange(item)}
                                            onBlur={onBlur}
                                            className="cursor-pointer"
                                        />
                                        <Label htmlFor={item} className="cursor-pointer">{PriorityLabeled[item]?.label}</Label>
                                    </div>
                                );
                            })}
                        </RadioGroup>
                    )
                }}
            />

            {errors?.[name] && (
                <span className="text-sm text-red-500">
                    {(errors[name] as FieldError).message}
                </span>
            )}
        </div>
    );
}

export default PriorityRadio;
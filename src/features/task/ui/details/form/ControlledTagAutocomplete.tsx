"use client"

import {X, Check} from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/shared/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/ui/popover";
import {useState} from "react";
import type {Tag} from "@/entities/task";
import {useAppSelector} from "@/shared/model/store";
import {Controller, type FieldError, type FieldValues} from "react-hook-form";
import {type CreateTaskForm, useCreateTag} from "@/features/task";

const ControlledTagAutocomplete = <T extends FieldValues>({ control, errors, name }: CreateTaskForm<T>) => {
    const tagsList = useAppSelector(state => state.task.tags);

    const [search, setSearch] = useState("");

    const filteredTags = tagsList?.filter((tag) =>
        tag.name.toLowerCase().includes(search.toLowerCase())
    );

    const { handleCreateTag, createTagLoading } = useCreateTag();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => {
                const value = (field.value || []) as string[];

                const selectedTags = tagsList?.filter((tag) =>
                    value.includes(tag.id)
                );

                const handleSelect = (tag: Tag) => {
                    const exists = value.includes(tag.id);

                    if (exists) {
                        field.onChange(value.filter((id) => id !== tag.id));
                    } else {
                        field.onChange([...value, tag.id]);
                    }
                };

                const removeTag = (id: string) => {
                    field.onChange(value.filter((tagId) => tagId !== id));
                };

                return (
                    <>
                        <div className="flex flex-wrap items-center gap-2 rounded-md border p-2">
                            {selectedTags?.map((tag) => (
                                <Badge
                                    key={tag.id}
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                >
                                    {tag.name}

                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag.id)}
                                        className="cursor-pointer"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="cursor-pointer"
                                    >
                                        Add tag
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Search tags or type for create..."
                                            value={search}
                                            onValueChange={setSearch}
                                        />

                                        <CommandList>
                                            <CommandEmpty className={"flex flex-col gap-1 items-center"}>
                                                No tags found

                                                {search.trim() && (
                                                    <Button
                                                        size="sm"
                                                        variant="default"
                                                        disabled={createTagLoading}
                                                        onClick={async () => {
                                                            const tag = await handleCreateTag({ name: search });

                                                            if (tag) handleSelect(tag);

                                                            setSearch("");
                                                        }}
                                                        className={"cursor-pointer w-fit"}
                                                    >
                                                        Create "{search}"
                                                    </Button>
                                                )}
                                            </CommandEmpty>

                                            <CommandGroup>
                                                {filteredTags?.map((tag) => {
                                                    const isSelected = value.includes(tag.id);

                                                    return (
                                                        <CommandItem
                                                            key={tag.id}
                                                            onSelect={() => handleSelect(tag)}
                                                            className="flex items-center justify-between cursor-pointer"
                                                        >
                                                            {tag.name}

                                                            {isSelected && (
                                                                <Check className="h-4 w-4" />
                                                            )}
                                                        </CommandItem>
                                                    );
                                                })}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {errors?.[name] && (
                            <span className="text-sm text-red-500">
                                {(errors[name] as FieldError).message}
                            </span>
                        )}
                    </>
                );
            }}
        />
    );
}

export default ControlledTagAutocomplete;
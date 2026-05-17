"use client";

import { Controller, type FieldError, type FieldValues } from "react-hook-form";
import type { CreateTaskForm } from "@/features/task";
import { Label } from "@/shared/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/shared/ui/calendar";
import { formatDate } from "@/shared/model/utils/date";

interface Props {
  label: string;
}

const ControlledDatePicker = <T extends FieldValues>({
  control,
  errors,
  name,
  label,
}: CreateTaskForm<T> & Props) => {
  return (
    <Popover>
      <div className={"flex flex-col gap-2"}>
        <Label>{label}</Label>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => {
            const selectedDate: Date | undefined = value
              ? new Date(value)
              : value;

            return (
              <>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!value}
                    onBlur={onBlur}
                    className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground cursor-pointer"
                  >
                    <CalendarIcon />
                    {value ? (
                      formatDate(value, "sv-SE", "string")
                    ) : (
                      <span>Pick date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    month={selectedDate}
                    onSelect={(value) => onChange(value?.toISOString())}
                  />
                </PopoverContent>
              </>
            );
          }}
        />

        {errors?.[name] && (
          <span className="text-sm text-red-500">
            {(errors[name] as FieldError).message}
          </span>
        )}
      </div>
    </Popover>
  );
};

export default ControlledDatePicker;

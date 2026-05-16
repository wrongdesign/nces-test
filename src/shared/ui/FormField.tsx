"use client"

import {
    type Control,
    Controller,
    type FieldError,
    type FieldErrors,
    type FieldValues,
    type Path,
} from "react-hook-form"

import clsx from "clsx"
import {Textarea} from "@/shared/ui/textarea";
import {Input} from "@/shared/ui/input";
import type React from "react";
import type {HTMLInputTypeAttribute} from "react";
import {Label} from "@/shared/ui/label";

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>
    errors: FieldErrors<T>
    name: Path<T>
    label?: string
    inputProps?: React.InputHTMLAttributes<HTMLInputElement> &
        React.TextareaHTMLAttributes<HTMLTextAreaElement>
    styles?: string
    inputStyles?: string
    textarea?: boolean
    type?:  HTMLInputTypeAttribute;
}

export default function FormField<T extends FieldValues>({
     control,
     errors,
     name,
     label,
     inputProps = {},
     styles,
     inputStyles,
     textarea,
     type = "text",
 }: FormFieldProps<T>) {
    const handleChange = (
        value: string,
        onChange: (value: any) => void
    ) => {
        if (type === "number") {
            const cleaned = value.replace(/[^0-9.,]/g, "")

            const normalized = cleaned.replace(",", ".")

            if (normalized === "" || normalized === ".") {
                onChange(normalized)
            } else {
                const number = parseFloat(normalized)

                if (!isNaN(number)) {
                    onChange(number)
                }
            }

            return
        }

        onChange(value)
    }

    const getDisplayValue = (value: any): string => {
        if (
            type === "number" &&
            value !== undefined &&
            value !== null
        ) {
            return value.toString()
        }

        return value ?? ""
    }

    return (
        <div className={clsx("flex flex-col gap-2", styles)}>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => {
                    const commonProps = {
                        ...inputProps,
                        className: clsx(
                            errors?.[name] && "border-red-500",
                            inputStyles
                        ),
                        onBlur,
                        value: getDisplayValue(value),
                        onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e.target.value, onChange),
                    }

                    return (
                        <>
                            {label && (
                                <Label className="text-sm font-medium">
                                    {label}
                                </Label>
                            )}

                            {textarea ? (
                                <Textarea {...commonProps} />
                            ) : (
                                <Input
                                    {...commonProps}
                                    type={type === "number" ? "text" : type}
                                    inputMode={
                                        type === "number"
                                            ? "decimal"
                                            : undefined
                                    }
                                />
                            )}
                        </>
                    )
                }}
            />

            {errors?.[name] && (
                <span className="text-sm text-red-500">
                    {(errors[name] as FieldError).message}
                </span>
            )}
        </div>
    )
}
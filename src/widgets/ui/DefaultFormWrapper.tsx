"use client"

import { clsx } from 'clsx';
import {Button} from "@/shared/ui/button";
import type {MouseEventHandler, PropsWithChildren} from "react";

interface Props {
    buttonText: string;
    buttonSubmit: MouseEventHandler<HTMLButtonElement> | undefined;
    mainWrapperStyles?: string;
    buttonWrapperStyles?: string;
    buttonDisabled?: boolean;
}

const DefaultFormWrapper = ({
    children,
    buttonText,
    buttonSubmit,
    mainWrapperStyles,
    buttonWrapperStyles,
    buttonDisabled,
}: PropsWithChildren<Props>) => {
    return (
        <div className={clsx('gap-12', mainWrapperStyles)}>
            {children}

            <div className={clsx('flex flex-row justify-end', buttonWrapperStyles)}>
                <Button onClick={buttonSubmit} variant="default" disabled={buttonDisabled}>
                    <p>{buttonText}</p>
                </Button>
            </div>
        </div>
    );
};

export default DefaultFormWrapper;

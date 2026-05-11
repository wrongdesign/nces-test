"use client"

import {Button} from "@/shared/ui/button";
import type {MouseEventHandler, PropsWithChildren} from "react";
import {cn} from "@/shared/model/utils/utils";

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
        <div className={cn('gap-12', mainWrapperStyles)}>
            {children}

            <div className={cn('flex flex-row justify-end', buttonWrapperStyles)}>
                <Button onClick={buttonSubmit} variant="default" disabled={buttonDisabled} className={"hover:cursor-pointer"}>
                    <p>{buttonText}</p>
                </Button>
            </div>
        </div>
    );
};

export default DefaultFormWrapper;

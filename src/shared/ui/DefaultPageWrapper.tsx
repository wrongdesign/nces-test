"use client"

import type {PropsWithChildren, ReactElement} from "react";
import DefaultBlock from "@/shared/ui/DefaultBlock";

interface Props {
    backButton?: ReactElement;
    title?: string;
}

const DefaultPageWrapper = ({ backButton, title, children }: PropsWithChildren<Props>) => {
    return(
        <DefaultBlock customClassName="flex flex-col gap-4">
            <div className="flex flex-row flex-wrap gap-10 w-full items-center justify-start">
                {backButton}

                <p className="text-2xl leading-none">{title}</p>
            </div>

            {children}
        </DefaultBlock>
    );
}

export default DefaultPageWrapper;
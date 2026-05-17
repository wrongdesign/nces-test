"use client";

import type { PropsWithChildren, ReactElement } from "react";
import DefaultBlock from "@/shared/ui/DefaultBlock";
import { cn } from "@/shared/model/utils/utils";

interface Props {
  backButton?: ReactElement;
  title?: string;
  additionalStyles?: string;
}

const DefaultPageWrapper = ({
  backButton,
  title,
  children,
  additionalStyles,
}: PropsWithChildren<Props>) => {
  return (
    <DefaultBlock customClassName={cn("flex flex-col gap-4", additionalStyles)}>
      <div className="flex flex-row flex-wrap gap-10 w-full items-center justify-start">
        {backButton}

        <p className="text-2xl leading-none">{title}</p>
      </div>

      {children}
    </DefaultBlock>
  );
};

export default DefaultPageWrapper;

"use client";

import type { PropsWithChildren } from "react";
import { cn } from "@/shared/model/utils/utils";

interface Props {
  customClassName?: string;
}

const DefaultBlock = ({
  children,
  customClassName,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(
        "bg-popover py-6 px-4 rounded-2xl flex flex-row gap-4 justify-center items-center",
        customClassName,
      )}
    >
      {children}
    </div>
  );
};

export default DefaultBlock;

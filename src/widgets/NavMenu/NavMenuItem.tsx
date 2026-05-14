"use client"

import type {INavMenuItem} from "@/widgets/NavMenu/types/types";
import {cn} from "@/shared/model/utils/utils";
import Link from "next/link";
import {iconMap} from "@/widgets/NavMenu/config/config";

const NavMenuItem = ({ location, text, disabled, icon }: INavMenuItem) => {
    const Icon = iconMap[icon ?? "UserPen"];

    return(
        <Link href={location ?? "#"}>
            <div
                className={cn(
                    "relative flex items-center rounded-md transition-all duration-300 p-2 justify-start",
                    disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "grayscale hover:bg-hoverlight hover:grayscale-0",
                )}
            >
                <Icon className="size-5" />
                <span
                    className="ml-2 whitespace-nowrap overflow-hidden transition-all duration-300 select-none truncate"
                    style={{
                        transition: "opacity 0.2s, max-width 0.2s",
                    }}
                >
                    {text}
                </span>
            </div>
        </Link>
    );
}

export default NavMenuItem;
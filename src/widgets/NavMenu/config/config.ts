import {LayoutDashboard, SquarePlus} from "lucide-react";
import type {INavMenuItem} from "@/widgets/NavMenu/types/types";

export const menus: INavMenuItem[] = [
    {
        text: "Dashboard",
        location: "/dashboard",
        icon: "LayoutDashboard",
    },
    {
        text: "Create task",
        location: "/dashboard/create-task",
        icon: "SquarePlus",
    },
];

export const iconMap = {
    LayoutDashboard: LayoutDashboard,
    SquarePlus: SquarePlus,
};

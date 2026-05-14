import {LayoutDashboard, UserPen} from "lucide-react";
import type {INavMenuItem} from "@/widgets/NavMenu/types/types";

export const menus: INavMenuItem[] = [
    {
        text: "Dashboard",
        location: "/dashboard",
        icon: "LayoutDashboard",
    },
    {
        text: "Profile",
        location: "/dashboard/profile",
        icon: "UserPen",
    },
];

export const iconMap = {
    LayoutDashboard: LayoutDashboard,
    UserPen: UserPen,
};

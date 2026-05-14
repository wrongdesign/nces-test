"use client"

import {menus} from "@/widgets/NavMenu/config/config";
import NavMenuItem from "@/widgets/NavMenu/NavMenuItem";

const NavMenu = () => {
    return(
        <div
            className="flex flex-row gap-4 overflow-y-auto max-h-[70vh]"
        >
            {menus.map((item, index) => (
                <NavMenuItem
                    key={item.location ?? `menu-item-${index}`}
                    {...item}
                />
            ))}
        </div>
    );
}

export default NavMenu;
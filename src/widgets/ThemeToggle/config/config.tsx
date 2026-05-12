import {MoonStarIcon, SunIcon} from "lucide-react";

export const THEME_ICONS = {
    light: SunIcon,
    dark: MoonStarIcon,
};

export enum UserTheme {
    LIGHT = 'light',
    DARK = 'dark',
    SYSTEM = 'system',
}

export type UserThemeType = `${UserTheme}`;
"use client";

import { useTheme } from "next-themes";
import { THEME_ICONS, UserTheme } from "./config/config";
import { Icon } from "@/shared/ui/icon";
import { Button } from "@/shared/ui/button";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const currentTheme =
    theme === UserTheme.LIGHT ? UserTheme.LIGHT : UserTheme.DARK;

  const toggleTheme = () => {
    const nextTheme =
      theme === UserTheme.LIGHT ? UserTheme.DARK : UserTheme.LIGHT;

    setTheme(nextTheme);
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="secondary"
      className="cursor-pointer"
    >
      <Icon as={THEME_ICONS[currentTheme]} className="size-5" />
    </Button>
  );
};

export default ThemeToggle;

import type { iconMap } from "@/widgets/NavMenu/config/config";

export interface INavMenuItem {
  location: string;
  icon?: keyof typeof iconMap;
  text: string;
  disabled?: boolean;
}

import type { NavbarItemsFromDB } from "@repo/ui/theme/types";
import { management, settings } from "../groups";

export const unirefundNavbarDataFromDB: NavbarItemsFromDB[] = [
  {
    key: "/",
    displayName: "Home",
    description: "Go back to the home page.",
    href: "home",
    icon: "home",
    parentNavbarItemKey: null,
    displayOrder: 1,
  },
  {
    key: "home",
    displayName: "Home",
    description: "Go back to the home page.",
    href: "/home",
    icon: "home",
    parentNavbarItemKey: "/",
    displayOrder: 1,
  },
  ...management,
  ...settings,
];

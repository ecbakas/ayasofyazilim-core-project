import type { ProfileMenuProps } from "@repo/ui/theme/types";
import { Layers, Settings, User } from "lucide-react";
import type { AbpUiNavigationResource } from "src/language-data/AbpUiNavigation";

export function getProfileMenuFromDB(languageData: AbpUiNavigationResource) {
  const profileMenu: ProfileMenuProps = {
    info: {
      name: "",
      email: "",
      image: "",
    },
    menuTitle: languageData.Profile,
    menu: {
      account: [
        {
          icon: <User className="mr-2 h-5 w-5 text-gray-400" />,
          href: "#",
          onClick: undefined,
          name: languageData.Profile,
        },
        {
          href: "#",
          onClick: undefined,
          name: languageData.UserSettings,
          icon: <Settings className="mr-2 h-5 w-5 text-gray-400" />,
        },
      ],
      primary: [
        {
          href: "#",
          onClick: undefined,
          name: languageData.Management,
          icon: <Layers className="mr-2 h-5 w-5 text-gray-400" />,
        },
      ],
      secondary: [],
    },
  };

  return profileMenu;
}

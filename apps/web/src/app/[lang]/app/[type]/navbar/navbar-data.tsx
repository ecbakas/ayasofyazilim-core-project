import type { NavbarItemsFromDB } from "@repo/ui/theme/types";
import type { Session } from "next-auth";
import type { AbpUiNavigationResource } from "src/language-data/AbpUiNavigation";
import { unirefundNavbarDataFromDB } from "./projects/unirefund";
import { ayshopgoNavbarDataFromDB } from "./projects/ayshopgo";
import { tahsiletNavbarDataFromDB } from "./projects/tahsilet";

const dbData = {
  UNIREFUND: unirefundNavbarDataFromDB,
  UPWITHCROWD: unirefundNavbarDataFromDB,
  TAHSILET: tahsiletNavbarDataFromDB,
  AYSHOPGO: ayshopgoNavbarDataFromDB,
};

export function getNavbarFromDB(
  prefix: string,
  languageData: AbpUiNavigationResource,
  appName: string,
  session: Session | null,
) {
  const navbarDataFromDB: NavbarItemsFromDB[] = JSON.parse(
    JSON.stringify(dbData[appName as keyof typeof dbData]),
  ) as NavbarItemsFromDB[];

  function processItems(items: NavbarItemsFromDB[]) {
    function checkForChildLink(
      item: NavbarItemsFromDB,
      filteredItems: NavbarItemsFromDB[],
    ): string | null {
      const isVisibleChild = filteredItems.find(
        (i) => i.parentNavbarItemKey === item.key,
      );
      if (!isVisibleChild) {
        item.hidden = true;
        return null;
      }
      if (isVisibleChild.href) {
        item.href = isVisibleChild.href;
        return item.href;
      }
      const childHref: string | null = checkForChildLink(
        isVisibleChild,
        filteredItems,
      );
      if (!childHref) {
        item.hidden = true;
      } else {
        item.href = childHref;
      }
      return item.href;
    }

    items.forEach((item) => {
      if (item.requiredPolicies) {
        const missingPolicies = item.requiredPolicies.filter(
          (policy) => !session?.grantedPolicies?.[policy],
        );
        if (missingPolicies.length > 0) {
          item.hidden = true;
        }
      }

      if (item.href) {
        item.href = `${prefix}/${item.href}`;
      }

      if (item.parentNavbarItemKey === "/") {
        item.parentNavbarItemKey = prefix;
      } else {
        item.parentNavbarItemKey = `${prefix}/${item.parentNavbarItemKey}`;
      }

      if (item.key && item.key !== "/") {
        item.key = `${prefix}/${item.key}`;
      } else {
        item.key = prefix;
      }

      const desc =
        `${item.displayName}.Description` in languageData
          ? languageData[
              `${item.displayName}.Description` as keyof typeof languageData
            ]
          : "No description";

      //İleride displayname'in veritabanından çevrili gelmiş olmasını bekliyoruz.
      item.displayName =
        languageData[item.displayName as keyof typeof languageData] ||
        `**${item.displayName}`;

      item.description = desc || `**${item.description}`;
    });
    const filteredItems = items.filter((item) => !item.hidden);
    filteredItems
      .filter(
        (item) => item.href === null && item.parentNavbarItemKey === prefix,
      )
      .forEach((item) => {
        checkForChildLink(item, filteredItems);
      });
    return filteredItems.filter((item) => !item.hidden);
  }

  return processItems(navbarDataFromDB);
}

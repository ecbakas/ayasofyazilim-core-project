import type { NavbarItemsFromDB } from "@repo/ui/theme/types";
import type { Session } from "next-auth";

export default function filterNavbarByGrantedPolicies(
  navbarItems: NavbarItemsFromDB[],
  session: Session | null,
) {
  if (!session?.grantedPolicies)
    return navbarItems.filter((navItem) => !navItem.requiredPolicies);

  const grantedPolicies = session.grantedPolicies;
  return navbarItems.filter(
    (navItem) =>
      !navItem.requiredPolicies ||
      navItem.requiredPolicies.every((policy) => grantedPolicies[policy]),
  );
}

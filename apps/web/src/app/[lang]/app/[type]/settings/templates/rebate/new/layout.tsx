"use client";

import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getResourceDataClient } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";

interface LayoutProps {
  children: JSX.Element;
  params: { lang: string; type: string };
}

export default function Layout({ children, params }: LayoutProps) {
  const pathname = usePathname();
  const languageData = getResourceDataClient(params.lang);

  const path = pathname.split("templates/rebate/")[1];

  const navbarItems = [
    {
      name: languageData["RebateTables.Templates.Create"],
      id: "new",
      link: getBaseLink(
        "settings/templates/rebate/new",
        true,
        params.lang,
        true,
        "admin",
      ),
    },
    {
      name: languageData["RebateTables.Templates.Preview"],
      id: "new/preview",
      link: getBaseLink(
        "settings/templates/rebate/new/preview",
        true,
        params.lang,
        true,
        "admin",
      ),
    },
  ];
  return (
    <SectionLayout
      defaultActiveSectionId={path}
      linkElement={Link}
      sections={navbarItems}
      vertical={false}
    >
      <SectionLayoutContent sectionId={path}>{children}</SectionLayoutContent>
    </SectionLayout>
  );
}

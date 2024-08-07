"use client";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { getBaseLink } from "src/utils";

export default function Layout({ children }: { children: JSX.Element }) {
  const type = usePathname().split("/")[3];
  const pathname = usePathname().split("projects/")[1];
  const projectId = pathname.split("/")[0];
  const activeSection = pathname.split("/")[1] || "general";
  if (!projectId) {
    redirect(`/app/${type}/projects`);
  }
  const navbarItems = [
    {
      id: "general",
      link: getBaseLink(`app/${type}/projects/${projectId}`, true),
      name: "Genel Bilgiler",
    },
    {
      id: "details",
      link: getBaseLink(`app/${type}/projects/${projectId}/details`, true),
      name: "Proje Detayı",
    },
    // {
    //   id: "preview",
    //   link: getBaseLink(`app/${type}/projects/${projectId}/preview`, true),
    //   name: "Önizleme",
    // },
  ];
  return (
    <SectionLayout
      defaultActiveSectionId={activeSection}
      linkElement={Link}
      sections={navbarItems}
    >
      <SectionLayoutContent sectionId={activeSection}>
        {children}
      </SectionLayoutContent>
    </SectionLayout>
  );
}

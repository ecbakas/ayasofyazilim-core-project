"use server";
import MainAdminLayout from "@repo/ui/theme/main-admin-layout";
import { LogOut } from "lucide-react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { auth } from "auth";
import { signOutServer } from "auth-action";
import unirefund from "public/unirefund.png";
import { getResourceData } from "src/language-data/core/AbpUiNavigation";
import { getBaseLink } from "src/utils";
import { getNavbarFromDB } from "./navbar/navbar-data";
import { getProfileMenuFromDB } from "./navbar/navbar-profile-data";
import "../globals.css";
import Providers from "src/providers/providers";

interface RootLayoutProps {
  params: { lang: string };
  children: JSX.Element;
}
const appName = process.env.APPLICATION_NAME || "UNIREFUND";
const title = appName.charAt(0).toUpperCase() + appName.slice(1).toLowerCase();
export async function generateMetadata(): Promise<Metadata> {
  await Promise.resolve();
  return {
    title,
    description:
      "Core project is a core web app for managing multi-tenant apps.",
  };
}
export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = params;
  const { languageData } = await getResourceData(lang);
  const session = await auth();

  const baseURL = getBaseLink("/", true, lang);

  const navbarFromDB = getNavbarFromDB(lang, languageData, appName, session);
  const profileMenuProps = getProfileMenuFromDB(languageData);
  profileMenuProps.info.name =
    session?.user?.name ?? profileMenuProps.info.name;
  profileMenuProps.info.email =
    session?.user?.email ?? profileMenuProps.info.email;
  profileMenuProps.info.image =
    "https://flowbite.com/docs/images/people/profile-picture-5.jpg";

  profileMenuProps.menu.secondary = [
    {
      href: undefined,
      onClick: signOutServer,
      name: languageData.LogOut,
      icon: <LogOut className="mr-2 h-4 w-4" />,
    },
  ];
  const logo = appName === "UNIREFUND" ? unirefund : undefined;
  return (
    <html className="h-full overflow-hidden" lang={params.lang}>
      <body className={GeistSans.className} data-app-name={appName}>
        <Providers lang={params.lang}>
          <div className="flex h-full flex-col bg-white">
            <MainAdminLayout
              appName={appName}
              baseURL={baseURL}
              lang={lang}
              logo={logo}
              navbarItems={navbarFromDB}
              prefix=""
              profileMenu={profileMenuProps}
            />
            <div className="flex h-full flex-col overflow-hidden px-4">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

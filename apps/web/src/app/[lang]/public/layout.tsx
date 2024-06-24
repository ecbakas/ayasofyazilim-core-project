"use server";

import MainLayout from "@repo/ayasofyazilim-ui/templates/main-layout";

import Header from "@repo/ui/upwithcrowd/header";
import LanguageSelector from "@repo/ui/language-selector";
import Navbar, { linksProp } from "@repo/ui/upwithcrowd/navbar";
import { auth } from "auth";
import { signOutServer } from "auth-action";
import { getBaseLink, getLocalizationResources } from "src/utils";
import konya from "/public/konya.svg";
import bursa from "/public/bursa.svg";
import sakarya from "/public/sakarya.svg";
import istanbul from "/public/istanbul.svg";

export async function getConfig(appName: string = "konya") {
  let configs = {
    bursa: {
      key: "bursa",
      with: "Bursa ile",
      its: "Bursa'nın",
      full: "Bursa Sanayi Odası",
      logo: "https://www.btso.org.tr/image/logo.png",
      texts: {
        hero: "Ortak aklın gücüyle geleceğin kentine",
      },
      colors: {
        primary: "",
        secondary: "",
      },
      images: {
        hero: "",
        second: bursa.src,
        footer: "https://i.hizliresim.com/97pq8fz.png",
      },
    },
    konya: {
      key: "konya",
      with: "Konya ile",
      its: "Konya'nın",
      full: "Konya Sanayi Odası",
      logo: "https://i.hizliresim.com/861rfcz.png",
      texts: {
        hero: "Konya sanayisi ile dünya arasındaki köprü",
      },
      colors: {
        primary: "",
        secondary: "",
      },
      images: {
        hero: "",
        second: konya.src,
        footer: "https://i.hizliresim.com/2avyu3e.png",
      },
    },
    istanbul: {
      key: "istanbul",
      with: "İstanbul ile",
      its: "İstanbul'un",
      full: "İstanbul Sanayi Odası",
      logo: "https://i.hizliresim.com/kbfuovo.png",
      texts: {
        hero: "İstanbul büyürse Türkiye büyür",
      },
      colors: {
        primary: "",
        secondary: "",
      },
      images: {
        hero: "",
        second: istanbul.src,
        footer: "https://i.hizliresim.com/gnbeshr.png",
      },
    },
    sakarya: {
      key: "sakarya",
      with: "Sakarya ile",
      its: "Sakarya'nın",
      full: "Sakarya Sanayi Odası",
      logo: "https://www.satso.org.tr/assets/img/satso-logo.png",
      texts: {
        hero: "Sakarya büyürse Türkiye büyür",
      },
      colors: {
        primary: "",
        secondary: "",
      },
      images: {
        hero: "",
        second: sakarya.src,
        footer: "https://i.hizliresim.com/1hfd5se.jpg",
      },
    },
  };

  return configs[appName as keyof typeof configs] || configs.konya;
}

type LayoutProps = {
  params: { lang: string };
  children: JSX.Element;
};

export default async function Layout({ children, params }: LayoutProps) {
  // const resources = await getLocalizationResources(params.lang);
  const resources = {};

  const session = await auth();
  const user = session?.user;
  const links: linksProp = [
    {
      text: "Yatırımcı",
      submenu: [
        {
          text: "Yatırım yap",
          href: "#",
        },
        {
          text: "Destek merkezi",
          href: "#",
        },
      ],
    },
    {
      text: "Girişimci",
      submenu: [
        {
          text: "Projeni Gönder",
          href: "#",
        },
        {
          text: "Destek merkezi",
          href: "#",
        },
        {
          text: "Gerekli Fona Nasıl Ulaşırım",
          href: "#",
        },
      ],
    },
    {
      text: "Kurumsal",
      submenu: [
        {
          text: "Hakkımızda",
          href: "#",
        },
        {
          text: "Takımımız",
          href: "#",
        },
        {
          text: "Iletisim",
          href: "#",
        },
        {
          text: "Yönetim Kurulumuz",
          href: "#",
        },
        {
          text: "Yatırım Komitesi",
          href: "#",
        },
      ],
    },
    {
      text: "Kampanyalar",
      href: "#",
    },
  ];
  let configSelected = await getConfig(process.env.APPLICATION_NAME);
  return (
    <MainLayout
      wrapperClassName="h-full"
      mainClassName="p-0 md:p-0 overflow-hidden"
      childScrollArea={false}
      HeaderComponent={
        <Navbar
          topBar={
            <Header
              languageSelector={
                <LanguageSelector
                  resources={resources}
                  cultureName={params.lang}
                  baseLink={getBaseLink("", false)}
                />
              }
              user={user}
              resources={resources}
              signOutServer={signOutServer}
            />
          }
          variant="hirevision"
          links={links}
          config={configSelected}
          appName={process.env.APPLICATION_NAME || "konya"}
          languageSelector={
            <LanguageSelector
              resources={resources}
              cultureName={params.lang}
              baseLink={getBaseLink("", false)}
            />
          }
        />
      }
    >
      {children}
    </MainLayout>
  );
}

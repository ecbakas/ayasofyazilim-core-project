"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@repo/ayasofyazilim-ui/atoms/menubar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@repo/ayasofyazilim-ui/atoms/button";
import AppLogo from "../app-logo";
import { Badge } from "@repo/ayasofyazilim-ui/atoms/badge";

export type link = {
  text: string;
  href?: string;
  submenu?: Array<link>;
};
export type linksProp = Array<link>;
export const defaultLinks = [
  {
    href: "/public/projects",
    text: "Projects",
  },
];
export default function Navbar({
  appName,
  links = defaultLinks,
  variant = "invesdor",
  user,
  languageSelector,
  topBar,
  config,
}: {
  appName: string;
  links?: linksProp;
  variant: "invesdor" | "hirevision";
  user?: any;
  languageSelector?: JSX.Element;
  topBar?: JSX.Element;
  config?: any;
}): JSX.Element {
  if (variant == "invesdor")
    return (
      <div>
        {topBar}
        <div className="bg-white p-4">
          <div className="container flex gap-4 justify-between flex-wrap items-center">
            <AppLogo appName={appName} />
            <Menubar className="border-0 h-full shadow-none p-none">
              {links.map((link) => MenuCreator(link))}
            </Menubar>
          </div>
        </div>
      </div>
    );
  if (variant == "hirevision") {
    return (
      <HirevisionNavbar
        config={config}
        appName={appName}
        links={links}
        user={user}
        languageSelector={languageSelector}
      />
    );
  }
  return <></>;
}

function MenuItemCreator(link: link): JSX.Element {
  return (
    <MenubarItem
      key={link.text}
      className="hover:text-primary focus:text-primary cursor-pointer"
      asChild
    >
      <Link href={link.href || ""}>{link.text}</Link>
    </MenubarItem>
  );
}
function MenuCreator(link: link): JSX.Element {
  if (link.submenu) {
    return (
      <MenubarMenu key={link.text}>
        <MenubarTrigger className="hover:text-primary focus:text-primary data-[state=open]:text-primary cursor-pointer">
          {link.text}
        </MenubarTrigger>
        <MenubarContent>
          {link.submenu.map((subLink) => {
            if (subLink.submenu) {
              return SubMenuCreator(subLink);
            } else {
              return MenuItemCreator(subLink);
            }
          })}
        </MenubarContent>
      </MenubarMenu>
    );
  }
  return (
    <MenubarMenu key={link.text}>
      <MenubarTrigger
        className="hover:text-primary focus:text-primary data-[state=open]:text-primary"
        asChild
      >
        <Link href={link.href || ""} className="cursor-pointer">
          {link.text}
        </Link>
      </MenubarTrigger>
    </MenubarMenu>
  );
}
function SubMenuCreator(link: link): JSX.Element {
  if (link.submenu) {
    return (
      <MenubarSub>
        <MenubarSubTrigger className="hover:text-primary focus:text-primary data-[state=open]:text-primary cursor-pointer">
          {link.text}
        </MenubarSubTrigger>
        <MenubarSubContent>
          {link.submenu.map((subLink) => {
            if (subLink.submenu) {
              return SubMenuCreator(subLink);
            } else {
              return MenuItemCreator(subLink);
            }
          })}
        </MenubarSubContent>
      </MenubarSub>
    );
  }
  return (
    <MenubarSub>
      <MenubarSubTrigger
        className="hover:text-primary focus:text-primary data-[state=open]:text-primary"
        asChild
      >
        <Link href={link.href || ""} className="cursor-pointer">
          {link.text}
        </Link>
      </MenubarSubTrigger>
    </MenubarSub>
  );
}

function HirevisionNavbar({
  appName,
  links = defaultLinks,
  user,
  config,
  languageSelector,
}: {
  appName: string;
  links?: linksProp;
  user?: any;
  languageSelector?: JSX.Element;
  config?: any;
}): JSX.Element {
  const [isFixed, setIsFixed] = useState(false);
  const scrollThreshold = 10;

  useEffect(() => {
    let el = document.querySelector("#scroll-area > div");
    // let el = document.body;
    if (el == null) return;
    const handleScroll = () => {
      setIsFixed(el.scrollTop >= scrollThreshold);
    };
    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`w-full flex justify-between items-center gap-4 px-12 h-20 top-0 left-0 z-50 ${isFixed ? "fixed bg-white/60 hover:bg-white/80 backdrop-blur-sm" : "absolute bg-white/10 hover:bg-white/40 backdrop-blur-sm"}`}
    >
      {/* <div className={"tracking-widest text-2xl font-bold"}>
        UPWITH
        <span className="text-primary">{appName.toLocaleUpperCase()}</span>
      </div> */}
      <img src={config.logo} className="h-14" />
      <Menubar className="border-0 bg-transparent shadow-none p-none">
        {links.map((link) => MenuCreator(link))}
      </Menubar>
      <div className="flex gap-4 items-center ">
        {user ? (
          <Button>Profilim</Button>
        ) : (
          <div className="grid grid-cols-2 items-center relative justify-center">
            <Button
              variant={"outline"}
              className="min-w-24 bg-transparent border-black text-black hover:text-white hover:bg-black hover:scale-110 transition-all border-r-0 rounded-r-none"
            >
              Giriş yap
            </Button>
            <Button
              variant={"outline"}
              className="min-w-24 bg-transparent border-black text-black hover:text-white hover:bg-black hover:scale-110 transition-all rounded-l-none"
            >
              Üye ol
            </Button>
            {/* <Badge className="absolute bg-black left-2/4 translate-x-[-50%] pointer-events-none">
              or
            </Badge> */}
          </div>
        )}
        {languageSelector ? languageSelector : <></>}
      </div>
    </nav>
  );
}

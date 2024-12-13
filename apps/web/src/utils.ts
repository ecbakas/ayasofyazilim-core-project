import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto } from "@ayasofyazilim/saas/AccountService";
import { defaultResources } from "./resources";

type LocalizationDto =
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto;
export type ResourcesDto = LocalizationDto["resources"];

type En = Record<string, string>;
type Other = Record<string, string | undefined> | undefined;
export interface LanguageDataType {
  en: En;
  [key: string]: Other;
}

export function isServerSide() {
  return typeof window === "undefined";
}

export type ResourceResult = Record<
  string,
  | {
      texts?: Record<string, string> | null | undefined;
      baseResources?: string[] | null | undefined;
    }
  | undefined
>;

export async function getLocalizationResources(
  languageCode: string,
): Promise<ResourceResult> {
  try {
    const response = await fetch(
      `http://${process.env.HOSTNAME}:${process.env.PORT}/api/?lang=${languageCode}`,
    );
    return ((await response.json()) as LocalizationDto).resources || {};
  } catch (error) {
    return defaultResources || {};
  }
}

function getLocale(locale?: string): string {
  if (locale) return locale;
  // FIXME: This is a temporary solution for eslint
  if (isServerSide()) {
    //   return localeServerSide();
    return "en";
  }
  const pathname = window.location.pathname;
  const pathnameParts = pathname.split("/");
  return pathnameParts[1] ?? "en";
}
function getAppType(appType?: string) {
  if (appType === "public") return `${appType}/`;

  if (appType) {
    return `app/${appType}/`;
  }

  if (!isServerSide()) {
    const pathname = window.location.pathname;
    const pathnameParts = pathname.split("/");
    return `app/${pathnameParts[3]}/`;
  }
  return "public/";
}
export function getBaseLink(
  location: string,
  withLocale?: boolean,
  locale?: string,
  withAppType?: boolean,
  appType?: string,
) {
  // check if location first character is a slash
  let newLocation = location;
  if (location.startsWith("/")) {
    newLocation = location.slice(1);
  }
  let localePath = withLocale ? `${getLocale(locale)}/` : "";
  if (withAppType) {
    localePath += getAppType(appType);
  }

  return `/${localePath}${newLocation}`;
}

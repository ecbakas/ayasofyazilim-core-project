/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- TODO: we need to fix this*/
"use server";
import { AdministrationServiceClient } from "@ayasofyazilim/saas/AdministrationService";
import { revalidatePath } from "next/cache";

const IS_LIVE = process.env.NODE_ENV === "production";

function getBaseUrl(project: string) {
  if (project === "upwithcrowd") {
    return IS_LIVE
      ? "http://192.168.1.105:44326"
      : "http://192.168.1.105:44325";
  }
  return IS_LIVE ? "http://192.168.1.105:44336" : "http://192.168.1.105:44335";
}
async function dangerouslyGetToken(baseURL: string) {
  "use server";

  const TOKEN_URL = `${baseURL}/connect/token`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");
  const urlencoded = new URLSearchParams();
  const urlEncodedContent: Record<string, string> = {
    grant_type: "password",
    client_id: "Angular",
    username: "admin",
    password: "123Aa!",
    scope:
      "AccountService IdentityService SaasService AdministrationService phone roles profile address email offline_access",
  };
  Object.keys(urlEncodedContent).forEach((key) => {
    urlencoded.append(key, urlEncodedContent[key]);
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };
  const response = await fetch(TOKEN_URL, requestOptions);
  return response.json();
}

async function getAdministrationServiceClient(project: string) {
  const baseURL = getBaseUrl(project);
  const response = await dangerouslyGetToken(baseURL);
  return new AdministrationServiceClient({
    BASE: baseURL,
    TOKEN: response?.access_token,
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
  });
}
export async function addNewTranslationServer(
  resourceName: string,
  cultureName: string,
  name: string,
  value: string,
  project: string,
) {
  "use server";
  try {
    const client = await getAdministrationServiceClient(project);
    const response =
      await client.languageTexts.putApiLanguageManagementLanguageTextsByResourceNameByCultureNameByName(
        {
          resourceName,
          cultureName,
          name,
          value,
        },
      );
    revalidatePath("/[lang]/app/[type]/language-management", "page");
    return {
      status: 200,
      projectData: response,
    };
  } catch (error: any) {
    return {
      status: error.status,
      message: error?.statusText,
    };
  }
}

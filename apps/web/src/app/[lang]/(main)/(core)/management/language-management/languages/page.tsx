"use server";

import type { GetApiLanguageManagementLanguagesData } from "@ayasofyazilim/saas/AdministrationService";
import { getLanguagesApi } from "src/actions/core/AdministrationService/actions";
import { getResourceData } from "src/language-data/core/AdministrationService";
import { isUnauthorized } from "src/utils/page-policy/page-policy";
import { isErrorOnRequest } from "src/utils/page-policy/utils";
import LanguagesTable from "./_components/table";

export default async function Page({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: GetApiLanguageManagementLanguagesData;
}) {
  const { lang } = params;
  await isUnauthorized({
    requiredPolicies: ["LanguageManagement.Languages"],
    lang,
  });
  const languagesResponse = await getLanguagesApi(searchParams);
  if (isErrorOnRequest(languagesResponse, lang)) return;
  const { languageData } = await getResourceData(lang);

  return (
    <LanguagesTable
      languageData={languageData}
      response={languagesResponse.data}
    />
  );
}

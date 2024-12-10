"use server";

import { notFound } from "next/navigation";
import { getCountrySettingsApi } from "src/app/[lang]/app/actions/AdministrationService/actions";
import { getResourceData } from "src/language-data/AdministrationService";
import TenantSettingsPage from "./group";

export default async function Page({
  params,
}: {
  params: { group: string; lang: string };
}) {
  const tenantSettings = await getCountrySettingsApi();
  const { languageData } = await getResourceData(params.lang);
  if (tenantSettings.type !== "success") {
    return notFound();
  }
  return (
    <TenantSettingsPage
      languageData={languageData}
      list={tenantSettings.data}
    />
  );
}

"use client";
import type { UniRefund_AdministrationService_CountrySettings_SetCountrySettingsByListDto } from "@ayasofyazilim/saas/AdministrationService";
import type { UniRefund_SettingService_CountrySettings_CountrySettingDto } from "@ayasofyazilim/saas/SettingService";
import { SettingsView } from "@repo/ui/settings-view";
import { useRouter } from "next/navigation";
import { putCountrySettingsApi } from "src/app/[lang]/app/actions/AdministrationService/put-actions";
import { handlePutResponse } from "src/app/[lang]/app/actions/api-utils-client";
import type { AdministrationServiceResource } from "src/language-data/AdministrationService";

export default function TenantSettingsPage({
  list,
  languageData,
  path,
}: {
  path: string;
  list: UniRefund_SettingService_CountrySettings_CountrySettingDto;
  languageData: AdministrationServiceResource;
}) {
  const router = useRouter();
  function onSettingPageChange(oldPath: string, newPath: string) {
    window.history.pushState(
      null,
      "",
      window.location.href.replace(oldPath || "", newPath),
    );
  }
  return (
    <SettingsView
      list={list}
      onSettingPageChange={onSettingPageChange}
      onSubmit={(data) => {
        void putCountrySettingsApi(
          data as UniRefund_AdministrationService_CountrySettings_SetCountrySettingsByListDto,
        ).then((response) => {
          handlePutResponse(response, router);
        });
      }}
      path={path}
      resources={languageData}
    />
  );
}

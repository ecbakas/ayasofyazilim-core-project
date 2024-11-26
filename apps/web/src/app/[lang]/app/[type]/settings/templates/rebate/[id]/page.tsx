"use server";
import { toastOnSubmit } from "@repo/ui/toast-on-submit";
import type { UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderUpdateDto as RebateTableHeaderUpdateDto } from "@ayasofyazilim/saas/ContractService";
import { getResourceData } from "src/language-data/ContractService";
import RebateForm from "../rebate-form";

export default async function Page({
  params,
}: {
  params: { lang: string; type: string; id: string };
}) {
  const { languageData } = await getResourceData(params.lang);
  return (
    <RebateForm<RebateTableHeaderUpdateDto>
      formType="update"
      languageData={languageData}
      onSubmit={(data) => {
        toastOnSubmit(data);
      }}
    />
  );
}

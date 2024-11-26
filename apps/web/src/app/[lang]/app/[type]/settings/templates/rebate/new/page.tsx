import type { UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderCreateDto as RebateTableHeaderCreateDto } from "@ayasofyazilim/saas/ContractService";
import { toastOnSubmit } from "@repo/ui/toast-on-submit";
import { getResourceData } from "src/language-data/ContractService";
import RebateForm from "../rebate-form";

export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData } = await getResourceData(params.lang);
  return (
    <RebateForm<RebateTableHeaderCreateDto>
      formType="create"
      languageData={languageData}
      onSubmit={(data) => {
        toastOnSubmit(data);
      }}
    />
  );
}

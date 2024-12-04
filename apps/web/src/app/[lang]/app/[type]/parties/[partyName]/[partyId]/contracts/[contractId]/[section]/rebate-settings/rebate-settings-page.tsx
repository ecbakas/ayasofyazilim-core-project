import { notFound } from "next/navigation";
import { getResourceData } from "src/language-data/ContractService";
import { getRebateTableHeadersApi } from "src/app/[lang]/app/actions/ContractService/action";
import { getSubMerchantsByMerchantIdApi } from "src/app/[lang]/app/actions/CrmService/actions";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import { RebateSettings } from "./rebate-settings";

export default async function RebateSettingsPage({
  lang,
  partyId,
  contractId,
}: {
  lang: string;
  partyId: string;
  contractId: string;
}) {
  const { languageData } = await getResourceData(lang);
  const rebateTables = await getRebateTableHeadersApi({});
  const subMerchants = await getSubMerchantsByMerchantIdApi({
    id: partyId,
  });
  if (rebateTables.type !== "success" || subMerchants.type !== "success") {
    return notFound();
  }
  return (
    <PagePolicy requiredPolicies={["ContractService.RebateSetting.Edit"]}>
      <RebateSettings
        contractId={contractId}
        lang={lang}
        languageData={languageData}
        rebateTables={rebateTables.data.items || []}
        subMerchants={subMerchants.data.items || []}
      />
    </PagePolicy>
  );
}

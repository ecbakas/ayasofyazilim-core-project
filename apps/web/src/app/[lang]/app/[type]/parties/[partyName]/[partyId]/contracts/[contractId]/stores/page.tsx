import { notFound } from "next/navigation";
import {
  getMerchantContractHeaderContractSettingsByHeaderIdApi,
  getMerchantContractHeadersContractStoresByHeaderIdApi,
} from "src/app/[lang]/app/actions/ContractService/action";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import { getResourceData } from "src/language-data/ContractService";
import { ContractStoresTable } from "./_components/table";

export default async function Page({
  params,
}: {
  params: { contractId: string; lang: string };
}) {
  const { contractId, lang } = params;
  const { languageData } = await getResourceData(lang);
  const contractStores =
    await getMerchantContractHeadersContractStoresByHeaderIdApi({
      id: contractId,
    });
  const contractSettings =
    await getMerchantContractHeaderContractSettingsByHeaderIdApi({
      id: contractId,
    });
  if (
    contractStores.type !== "success" ||
    contractSettings.type !== "success"
  ) {
    return notFound();
  }
  return (
    <PagePolicy
      lang={lang}
      requiredPolicies={[
        "ContractService.ContractStore",
        "ContractService.ContractStore.Edit",
        "ContractService.ContractStore.Delete",
        "ContractService.ContractStore.Create",
      ]}
    >
      <ContractStoresTable
        contractSettings={contractSettings.data.items || []}
        contractStores={contractStores.data.items || []}
        languageData={languageData}
      />
    </PagePolicy>
  );
}

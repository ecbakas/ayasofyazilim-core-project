import { notFound } from "next/navigation";
import {
  getMerchantContractHeaderContractSettingsByHeaderIdApi,
  getMerchantContractHeadersContractStoresByHeaderIdApi,
} from "src/app/[lang]/app/actions/ContractService/action";
import { isUnauthorized } from "src/app/[lang]/page-policy/page-policy";
import { getResourceData } from "src/language-data/ContractService";
import { ContractStoresTable } from "./_components/table";

export default async function Page({
  params,
}: {
  params: { contractId: string; lang: string };
}) {
  const { contractId, lang } = params;
  await isUnauthorized({
    requiredPolicies: [
      "ContractService.ContractStore",
      "ContractService.ContractStore.Edit",
      "ContractService.ContractStore.Delete",
      "ContractService.ContractStore.Create",
    ],
    lang,
  });

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
    <ContractStoresTable
      contractSettings={contractSettings.data.items || []}
      contractStores={contractStores.data.items || []}
      languageData={languageData}
    />
  );
}

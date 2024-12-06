import type { ContractServiceResource } from "src/language-data/ContractService";
import { getMerchantContractHeadersContractStoresByHeaderIdApi } from "src/app/[lang]/app/actions/ContractService/action";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import ContractStoresTable from "./table";

export default async function ContractStoresPage({
  languageData,
  contractId,
}: {
  languageData: ContractServiceResource;
  contractId: string;
}) {
  const contractStores =
    await getMerchantContractHeadersContractStoresByHeaderIdApi({
      id: contractId,
    });
  if (contractStores.type !== "success") {
    return null;
  }
  return (
    <PagePolicy
      requiredPolicies={[
        "ContractService.ContractStore",
        "ContractService.ContractStore.Edit",
        "ContractService.ContractStore.Delete",
        "ContractService.ContractStore.Create",
      ]}
    >
      <ContractStoresTable
        contractStores={contractStores.data.items || []}
        languageData={languageData}
      />
    </PagePolicy>
  );
}

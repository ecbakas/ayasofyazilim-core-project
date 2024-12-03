import type { UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as ContractHeaderDetailForMerchantDto } from "@ayasofyazilim/saas/ContractService";
import { notFound } from "next/navigation";
import type { UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressCommonDataDto } from "@ayasofyazilim/saas/LocationService";
import { getResourceData } from "src/language-data/ContractService";
import { getMerchantContractHeaderContractSettingsByHeaderIdApi } from "src/app/[lang]/app/actions/ContractService/action";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import { ContractSettings } from "./contract-settings";

export default async function ContractSettingsPage({
  lang,
  contractId,
  contractHeaderDetails,
  addressList,
}: {
  lang: string;
  contractId: string;
  contractHeaderDetails: ContractHeaderDetailForMerchantDto;
  addressList: AddressCommonDataDto[];
}) {
  const { languageData } = await getResourceData(lang);
  const contractSettings =
    await getMerchantContractHeaderContractSettingsByHeaderIdApi({
      id: contractId,
    });
  if (contractSettings.type !== "success") return notFound();
  return (
    <PagePolicy requiredPolicies={["ContractService.ContractSetting.Edit"]}>
      <ContractSettings
        addressList={addressList}
        contractHeaderDetails={contractHeaderDetails}
        contractSettings={contractSettings.data}
        lang={lang}
        languageData={languageData}
      />
    </PagePolicy>
  );
}

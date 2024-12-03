import type { UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as ContractHeaderDetailForMerchantDto } from "@ayasofyazilim/saas/ContractService";
import type { UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressCommonDataDto } from "@ayasofyazilim/saas/LocationService";
import { getResourceData } from "src/language-data/ContractService";
import { ContractHeader } from "./contract-header";

export default async function ContractPage({
  lang,
  partyName,
  partyId,
  contractHeaderDetails,
  addressList,
}: {
  lang: string;
  partyName: "merchants";
  partyId: string;
  contractHeaderDetails: ContractHeaderDetailForMerchantDto;
  addressList: AddressCommonDataDto[];
}) {
  const { languageData } = await getResourceData(lang);
  return (
    <ContractHeader
      addressList={addressList}
      contractHeaderDetails={contractHeaderDetails}
      languageData={languageData}
      partyId={partyId}
      partyName={partyName}
    />
  );
}

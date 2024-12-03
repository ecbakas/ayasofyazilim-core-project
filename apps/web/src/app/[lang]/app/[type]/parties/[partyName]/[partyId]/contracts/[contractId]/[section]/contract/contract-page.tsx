import type { UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as ContractHeaderDetailForMerchantDto } from "@ayasofyazilim/saas/ContractService";
import type { UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressCommonDataDto } from "@ayasofyazilim/saas/LocationService";
import { notFound } from "next/navigation";
import { getResourceData } from "src/language-data/ContractService";
import { getRefundTableHeadersApi } from "src/app/[lang]/app/actions/ContractService/action";
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
  const refundTableHeaders = await getRefundTableHeadersApi({});
  if (refundTableHeaders.type !== "success") return notFound();
  return (
    <ContractHeader
      addressList={addressList}
      contractHeaderDetails={contractHeaderDetails}
      languageData={languageData}
      partyId={partyId}
      partyName={partyName}
      refundTableHeaders={refundTableHeaders.data.items || []}
    />
  );
}

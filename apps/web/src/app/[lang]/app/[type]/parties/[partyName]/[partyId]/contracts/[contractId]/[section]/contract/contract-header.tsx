"use client";

import type {
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as ContractHeaderDetailForMerchantDto,
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantUpdateDto as ContractHeaderForMerchantUpdateDto,
} from "@ayasofyazilim/saas/ContractService";
import type { UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressCommonDataDto } from "@ayasofyazilim/saas/LocationService";
import type { ContractServiceResource } from "src/language-data/ContractService";
import ContractHeaderForm from "../../../contract-header-form";

export function ContractHeader({
  contractHeaderDetails,
  partyName,
  partyId,
  addressList,
  languageData,
}: {
  contractHeaderDetails: ContractHeaderDetailForMerchantDto;
  partyName: "merchants";
  partyId: string;
  addressList: AddressCommonDataDto[];
  languageData: ContractServiceResource;
}) {
  const refundTableHeaders =
    contractHeaderDetails.contractHeaderRefundTableHeaders.map((header) => {
      return {
        refundTableHeaderId: header.refundTableHeader.id,
        validFrom: header.validFrom,
        validTo: header.validTo,
        isDefault: header.isDefault,
      };
    });
  return (
    <ContractHeaderForm<ContractHeaderForMerchantUpdateDto>
      addresses={addressList}
      formData={{
        ...contractHeaderDetails,
        status: contractHeaderDetails.status || "None",
        addressCommonDataId: contractHeaderDetails.addressCommonData.id,
        refundTableHeaders,
      }}
      formType="Update"
      languageData={languageData}
      partyId={partyId}
      partyName={partyName}
    />
  );
}

"use client";

import type {
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as ContractHeaderDetailForMerchantDto,
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto as RefundTableHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import type { UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressCommonDataDto } from "@ayasofyazilim/saas/LocationService";
import type { ContractServiceResource } from "src/language-data/ContractService";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import ContractHeaderForm from "../../../contract-header-form";

export function ContractHeader({
  contractHeaderDetails,
  partyName,
  partyId,
  addressList,
  languageData,
  refundTableHeaders,
}: {
  contractHeaderDetails: ContractHeaderDetailForMerchantDto;
  partyName: "merchants";
  partyId: string;
  addressList: AddressCommonDataDto[];
  refundTableHeaders: RefundTableHeaderDto[];
  languageData: ContractServiceResource;
}) {
  return (
    <PagePolicy
      requiredPolicies={["ContractService.ContractHeaderForMerchant.Edit"]}
    >
      <ContractHeaderForm
        addresses={addressList}
        contractId={contractHeaderDetails.id}
        formData={{
          ...contractHeaderDetails,
          status: contractHeaderDetails.status || "None",
          addressCommonDataId: contractHeaderDetails.addressCommonData.id,
        }}
        formType="update"
        languageData={languageData}
        partyId={partyId}
        partyName={partyName}
        refundTableHeaders={refundTableHeaders}
      />
    </PagePolicy>
  );
}

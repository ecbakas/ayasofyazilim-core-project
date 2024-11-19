import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import type { UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantUpdateDto as ContractHeaderForMerchantUpdateDto } from "@ayasofyazilim/saas/ContractService";
import ContractHeaderForm from "../contract-header-form";
import type { SectionProps } from "./details";

export function ContractHeaderSection({ ...props }: SectionProps) {
  const { contractHeaderDetails } = props;
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
    <SectionLayoutContent sectionId="contract">
      <ContractHeaderForm<ContractHeaderForMerchantUpdateDto>
        formType="Update"
        {...props}
        formData={{
          ...contractHeaderDetails,
          status: contractHeaderDetails.status || "None",
          addressCommonDataId: contractHeaderDetails.addressCommonData.id,
          refundTableHeaders,
        }}
      />
    </SectionLayoutContent>
  );
}

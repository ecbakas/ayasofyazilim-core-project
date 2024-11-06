"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as ContractHeaderDetailForMerchantDto } from "@ayasofyazilim/saas/ContractService";
import type { UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto } from "@ayasofyazilim/saas/LocationService";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { Circle } from "lucide-react";
import { useState } from "react";
import type { ContractServiceResource } from "src/language-data/ContractService";
import ContractHeaderForm from "../contract-header";

interface DetailsProp {
  contractHeaderDetails: ContractHeaderDetailForMerchantDto;
  partyName: "merchants";
  partyId: string;
  languageData: ContractServiceResource;
  addresses: UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto[];
  missingSteps: string[];
}
export default function Details({ ...props }: DetailsProp) {
  const { languageData, missingSteps } = props;
  const [loading] = useState(false);

  function setSectionOptions(key: string, label: string) {
    const isMissingStep = missingSteps.includes(key);
    const options = {
      name: label,
      className: isMissingStep ? "data-[active=false]:text-xs" : "",
    };
    if (isMissingStep)
      Object.assign(options, {
        children: (
          <BadgeWithTooltip label={label} languageData={languageData} />
        ),
      });
    return options;
  }

  return (
    <SectionLayout
      defaultActiveSectionId="contract"
      sections={[
        {
          id: "contract",
          name: languageData["Contracts.Create.ContractHeader"],
          disabled: loading,
        },
        {
          id: "rebate-setting",
          disabled: loading,
          ...setSectionOptions(
            "RebateSettings",
            languageData["Contracts.Create.RebateSettings"],
          ),
        },
        {
          id: "contract-setting",
          disabled: loading,
          ...setSectionOptions(
            "ContractSetting",
            languageData["Contracts.Create.ContractSettings"],
          ),
        },
      ]}
      vertical
    >
      <ContractSection {...props} />
      <RebateSettingsSection {...props} />
      {/* <StoresSection {...props} /> */}
      <ContractSettingsSection {...props} />
    </SectionLayout>
  );
}

function ContractSection({ ...props }: DetailsProp) {
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
      <ContractHeaderForm
        {...props}
        formData={{
          ...contractHeaderDetails,
          status: contractHeaderDetails.status || "None",
          addressCommonDataId: contractHeaderDetails.addressCommonData.id,
          refundTableHeaders,
        }}
        formType="Update"
      />
    </SectionLayoutContent>
  );
}

function ContractSettingsSection({ languageData }: DetailsProp) {
  return (
    <SectionLayoutContent sectionId="contract-setting">
      <>{languageData["Contracts.Create.ContractSettings"]}</>
    </SectionLayoutContent>
  );
}

function RebateSettingsSection({ languageData }: DetailsProp) {
  return (
    <SectionLayoutContent sectionId="rebate-setting">
      <>{languageData["Contracts.Create.RebateSettings"]}</>
    </SectionLayoutContent>
  );
}

function BadgeWithTooltip({
  label,
  languageData,
}: {
  label: string;
  languageData: ContractServiceResource;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2">
          <Circle className="text-destructive w-3" />
          <span>{label}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {languageData["Contracts.MissingSteps.Missing"]}
      </TooltipContent>
    </Tooltip>
  );
}

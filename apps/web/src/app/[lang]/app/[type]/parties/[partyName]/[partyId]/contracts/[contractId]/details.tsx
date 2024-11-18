"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type {
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as ContractHeaderDetailForMerchantDto,
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantUpdateDto as ContractHeaderForMerchantUpdateDto,
  PagedResultDto_ContractSettingDto,
} from "@ayasofyazilim/saas/ContractService";
import type { UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressCommonDataDto } from "@ayasofyazilim/saas/LocationService";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { Circle } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import type { ContractServiceResource } from "src/language-data/ContractService";
import ContractHeaderForm from "../contract-header";
import { ContractSettingsSection } from "./contract-settings";

interface DetailsProp {
  contractHeaderDetails: ContractHeaderDetailForMerchantDto;
  contractSettings: {
    data: PagedResultDto_ContractSettingDto;
    message?: string;
    success: boolean;
  };
  partyName: "merchants";
  partyId: string;
  languageData: ContractServiceResource;
  addresses: AddressCommonDataDto[];
  missingSteps: string[];
}
export type SectionProps = DetailsProp & {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};
export default function Details({ ...props }: DetailsProp) {
  const { languageData, missingSteps } = props;
  const [loading, setLoading] = useState(false);

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
      <ContractSection {...props} loading={loading} setLoading={setLoading} />
      <RebateSettingsSection
        {...props}
        loading={loading}
        setLoading={setLoading}
      />
      {/* <StoresSection {...props} /> */}
      <ContractSettingsSection
        {...props}
        loading={loading}
        setLoading={setLoading}
      />
    </SectionLayout>
  );
}

function ContractSection({ ...props }: SectionProps) {
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

function RebateSettingsSection({ languageData }: SectionProps) {
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

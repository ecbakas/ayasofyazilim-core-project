"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type {
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as ContractHeaderDetailForMerchantDto,
  PagedResultDto_ContractSettingDto,
  UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as RebateTableHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import type { UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressCommonDataDto } from "@ayasofyazilim/saas/LocationService";
import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { Circle } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import type { UniRefund_CRMService_Merchants_StoreProfileDto as StoreProfileDto } from "@ayasofyazilim/saas/CRMService";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { ContractHeaderSection } from "./contract-header";
import { ContractSettingsSection } from "./contract-settings";
import { RebateSettingsSection } from "./rebate-settings";

interface DetailsProp {
  contractHeaderDetails: ContractHeaderDetailForMerchantDto;
  contractSettings: {
    data: PagedResultDto_ContractSettingDto;
    message?: string;
    success: boolean;
  };
  rebateTables: {
    data: RebateTableHeaderDto[];
    message?: string;
    success: boolean;
  };
  subMerchants: {
    data: StoreProfileDto[];
    message?: string;
    success: boolean;
  };
  partyName: "merchants";
  partyId: string;
  languageData: ContractServiceResource;
  addresses: AddressCommonDataDto[];
  missingSteps: string[];
  lang: string;
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
      <ContractHeaderSection
        {...props}
        loading={loading}
        setLoading={setLoading}
      />
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

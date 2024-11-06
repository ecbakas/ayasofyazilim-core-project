"use client";
import type { UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as ContractHeaderDetailForMerchantDto } from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as $ContractHeaderDetailForMerchantDto } from "@ayasofyazilim/saas/ContractService";
import { SchemaForm } from "@repo/ayasofyazilim-ui/organisms/schema-form";
import type { FilterType } from "@repo/ayasofyazilim-ui/organisms/schema-form/types";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import type { ContractServiceResource } from "src/language-data/ContractService";

interface DetailsProp {
  contractHeaderDetails: ContractHeaderDetailForMerchantDto;
  partyName: "merchants";
  partyId: string;
  languageData: ContractServiceResource;
}
export default function Details({ ...props }: DetailsProp) {
  const { languageData } = props;
  return (
    <SectionLayout
      defaultActiveSectionId="contract"
      sections={[
        {
          id: "contract",
          name: languageData["Contracts.Create.ContractHeader"],
        },
        {
          id: "rebate-setting",
          name: languageData["Contracts.Create.RebateSettings"],
          disabled: false,
        },
        {
          id: "contract-settings",
          name: languageData["Contracts.Create.ContractSettings"],
          disabled: false,
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
  const filter: FilterType = {
    type: "include",
    sort: true,
    keys: [
      "name",
      "webSite",
      "merchantClassification",
      "status",
      "isDraft",
      "merchantBasicInformationDto",
      "merchantBasicInformationDto.name",
      "merchantBasicInformationDto.numberOfStores",
      "addressCommonData",
      "addressCommonData.type",
      "addressCommonData.countryId",
      "addressCommonData.regionId",
      "addressCommonData.cityId",
      "addressCommonData.districtId",
      "addressCommonData.neighborhoodId",
      "addressCommonData.addressLine",
      "addressCommonData.fullAddress",
      "addressCommonData.postalCode",
      "contractHeaderRefundTableHeaders",
    ],
  };

  return (
    <SectionLayoutContent sectionId="contract">
      <SchemaForm
        filter={filter}
        formData={props.contractHeaderDetails}
        schema={$ContractHeaderDetailForMerchantDto}
        submit="Save"
        uiSchema={{
          "ui:className": "grid gap-2 space-y-0 md:grid-cols-2",
          isDraft: {
            "ui:widget": "switch",
            "ui:disabled": true,
            "ui:readOnly": true,
          },
          merchantBasicInformationDto: {
            "ui:className":
              "md:col-span-2 md:grid md:grid-cols-2 md:space-y-0 md:gap-2",
          },
          addressCommonData: {
            "ui:className": "md:col-span-2",
          },
          contractHeaderRefundTableHeaders: {
            "ui:className": "md:col-span-2",
          },
        }}
      />
    </SectionLayoutContent>
  );
}

function ContractSettingsSection({ languageData }: DetailsProp) {
  return (
    <SectionLayoutContent sectionId="contract-settings">
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

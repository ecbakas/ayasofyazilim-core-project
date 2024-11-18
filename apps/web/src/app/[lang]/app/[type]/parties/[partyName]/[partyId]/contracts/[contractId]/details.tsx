"use client";
import { toast } from "@/components/ui/sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type {
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as ContractHeaderDetailForMerchantDto,
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantUpdateDto as ContractHeaderForMerchantUpdateDto,
  UniRefund_ContractService_ContractsForMerchant_ContractSettings_ContractSettingCreateDto as ContractSettingCreateDto,
  UniRefund_ContractService_ContractsForMerchant_ContractSettings_ContractSettingDto as ContractSettingDto,
  PagedResultDto_ContractSettingDto,
} from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_ContractsForMerchant_ContractSettings_ContractSettingCreateDto as $ContractSettingCreateDto } from "@ayasofyazilim/saas/ContractService";
import type { UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressCommonDataDto } from "@ayasofyazilim/saas/LocationService";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import type { ColumnsType } from "@repo/ayasofyazilim-ui/molecules/tables/types";
import { SchemaForm } from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {
  bulkCreateUiSchema,
  createUiSchemaWithResource,
} from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { toastOnSubmit } from "@repo/ui/toast-on-submit";
import { Circle } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { postMerchantContractHeaderContractSettingsByHeaderIdApi } from "src/app/[lang]/app/actions/ContractService/action";
import type { ContractServiceResource } from "src/language-data/ContractService";
import ContractHeaderForm from "../contract-header";
import { MerchantAddressWidget } from "../contract-widgets";

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
type SectionProps = DetailsProp & {
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

function ContractSettingsSection({
  languageData,
  contractSettings,
  contractHeaderDetails,
  addresses,
  loading,
  setLoading,
}: SectionProps) {
  const { data } = contractSettings;
  // const customColumns = columnsByData<ContractSettingDto>({
  //   row: $ContractSettingDto.properties,
  //   languageData: {
  //     constantKey: "Contracts.Form",
  //     languageData: languageData,
  //   },
  // });
  // const handleFetch = ({ page, filter }: fetchRequestProps) => {
  //   setLoading(true);
  // };

  const columnsData: ColumnsType = {
    type: "Auto",
    data: {
      tableType: $ContractSettingCreateDto,
      excludeList: [],
    },
  };
  return (
    <SectionLayoutContent sectionId="contract-setting">
      {data.items && data.items.length > 0 ? (
        <DataTable
          columnsData={columnsData}
          renderSubComponent={(row: ContractSettingDto) => {
            return (
              <SchemaFormForContractSettings
                formData={row}
                languageData={languageData}
                addressList={addresses}
                loading={loading}
                setLoading={setLoading}
                contractId={contractHeaderDetails.id}
              />
            );
          }}
          rowCount={data.totalCount}
          data={data.items}
          // detailedFilter={filter}
          // fetchRequest={handleFetch}
        />
      ) : (
        <SchemaFormForContractSettings
          addressList={addresses}
          contractId={contractHeaderDetails.id}
          formData={{ isDefault: true }}
          languageData={languageData}
          loading={loading}
          setLoading={setLoading}
        />
      )}
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
function SchemaFormForContractSettings({
  languageData,
  formData,
  loading,
  setLoading,
  addressList,
  contractId,
}: {
  languageData: ContractServiceResource;
  formData: object;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  addressList: AddressCommonDataDto[];
  contractId: string;
}) {
  const switchFields: (keyof ContractSettingCreateDto)[] = [
    "isDefault",
    "deliveryFee",
    "factoring",
    "excludeFromCashLimit",
    "eTaxFree",
    "crossTaxFreeForm",
    "facturaNumberIsUnique",
    "goodsHaveSerialNumbers",
    "excludeFromCashLimit",
    "deskoScanner",
  ];

  const uiSchema = createUiSchemaWithResource({
    resources: languageData,
    name: "Contracts.Settings.Form",
    schema: $ContractSettingCreateDto,
    extend: {
      ...bulkCreateUiSchema<ContractSettingCreateDto>({
        elements: switchFields,
        config: { "ui:widget": "switch" },
      }),
      invoicingAddressCommonDataId: {
        "ui:className": "md:col-span-2",
        "ui:widget": "address",
      },
      "ui:className": "md:grid md:grid-cols-2 md:gap-2",
      isDefault: {
        "ui:widget": "switch",
        "ui:options": {
          disabled: true,
        },
      },
    },
  });

  async function handleContractSettingsSubmit(data: ContractSettingCreateDto) {
    try {
      setLoading(true);
      const response =
        await postMerchantContractHeaderContractSettingsByHeaderIdApi({
          id: contractId,
          requestBody: data,
        });
      if (response.type === "success") {
        toast.success(response.message);
      } else {
        toast.success(response.message);
        toastOnSubmit(data);
      }
    } catch (error) {
      toast.error("Fatal error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SchemaForm
      className="max-h-[500px]"
      defaultSubmitClassName="pb-0"
      filter={{
        type: "include",
        sort: true,
        keys: [
          "name",
          "referenceNumber",
          "invoiceChannel",
          "invoicingFrequency",
          "termOfPayment",
          "receiptType",
          "invoicingAddressCommonDataId",
          ...switchFields,
        ],
      }}
      formData={formData}
      onSubmit={(data) => {
        void handleContractSettingsSubmit(
          data.formData as ContractSettingCreateDto,
        );
      }}
      schema={$ContractSettingCreateDto}
      uiSchema={uiSchema}
      widgets={{
        address: MerchantAddressWidget({
          loading,
          addressList,
          languageData,
        }),
      }}
      withScrollArea
    />
  );
}

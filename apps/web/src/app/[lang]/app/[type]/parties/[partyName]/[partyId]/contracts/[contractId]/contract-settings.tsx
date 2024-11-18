import type { ColumnsType } from "@repo/ayasofyazilim-ui/molecules/tables/types";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { $UniRefund_ContractService_ContractsForMerchant_ContractSettings_ContractSettingCreateDto as $ContractSettingCreateDto } from "@ayasofyazilim/saas/ContractService";
import type { UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressCommonDataDto } from "@ayasofyazilim/saas/LocationService";
import type {
  UniRefund_ContractService_ContractsForMerchant_ContractSettings_ContractSettingCreateDto as ContractSettingCreateDto,
  UniRefund_ContractService_ContractsForMerchant_ContractSettings_ContractSettingDto as ContractSettingDto,
  PagedResultDto_ContractSettingDto,
} from "@ayasofyazilim/saas/ContractService";
import {
  bulkCreateUiSchema,
  createUiSchemaWithResource,
} from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import { cn } from "@/lib/utils";
import { SchemaForm } from "@repo/ayasofyazilim-ui/organisms/schema-form";
import { toastOnSubmit } from "@repo/ui/toast-on-submit";
import {
  getMerchantContractHeaderContractSettingsByHeaderIdApi as getContractSettings,
  postMerchantContractHeaderContractSettingsByHeaderIdApi,
} from "src/app/[lang]/app/actions/ContractService/action";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { MerchantAddressWidget } from "../contract-widgets";
import type { SectionProps } from "./details";

export function ContractSettingsSection({
  languageData,
  contractSettings,
  contractHeaderDetails,
  addresses,
  loading,
  setLoading,
}: SectionProps) {
  const { data } = contractSettings;
  const [settings, setSettings] =
    useState<PagedResultDto_ContractSettingDto>(data);
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
  async function handleFetch() {
    try {
      setLoading(true);
      const contractSettingsResponse = await getContractSettings({
        id: contractHeaderDetails.id,
      });
      if (contractSettingsResponse.type === "success") {
        setSettings(contractSettingsResponse.data);
      } else {
        toast.error(contractSettingsResponse.message);
      }
    } catch (e) {
      toast.error(languageData["Fetch.Fail"]);
    } finally {
      setLoading(false);
    }
  }
  return (
    <SectionLayoutContent sectionId="contract-setting">
      {settings.items && settings.items.length > 0 ? (
        <DataTable
          classNames={{
            container: "p-0",
            filters: { container: "hidden" },
            table: {
              header:
                "[&>tr>th:last-child]:max-w-content [&>tr>th:first-child]:w-full",
            },
          }}
          columnsData={columnsData(languageData)}
          editable={false}
          renderSubComponent={(context) => {
            return (
              <SchemaFormForContractSettings
                formData={context.original}
                languageData={languageData}
                addressList={addresses}
                loading={loading}
                setLoading={setLoading}
                contractId={contractHeaderDetails.id}
                type="edit"
              />
            );
          }}
          rowCount={data.totalCount}
          showView={false}
          data={settings.items}
          // detailedFilter={filter}
          fetchRequest={() => {
            void handleFetch();
          }}
        />
      ) : (
        <SchemaFormForContractSettings
          addressList={addresses}
          contractId={contractHeaderDetails.id}
          formData={{ isDefault: true }}
          languageData={languageData}
          loading={loading}
          setLoading={setLoading}
          type="create"
        />
      )}
    </SectionLayoutContent>
  );
}
function SchemaFormForContractSettings({
  languageData,
  formData,
  loading,
  setLoading,
  addressList,
  contractId,
  type,
}: {
  languageData: ContractServiceResource;
  formData: object;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  addressList: AddressCommonDataDto[];
  contractId: string;
  type: "edit" | "create";
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
      "ui:className": cn(
        "md:grid md:grid-cols-2 md:gap-2",
        type === "edit" && "p-4",
      ),
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
      className="max-h-[500px] bg-white"
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
      submitText={
        type === "edit"
          ? languageData["Contracts.Edit.Submit"]
          : languageData["Contracts.Create.Submit"]
      }
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

function columnsData(
  languageData: ContractServiceResource,
): ColumnsType<ContractSettingDto> {
  return {
    type: "Custom",
    data: {
      columns: [
        {
          id: "name",
          header: () => languageData["Contracts.Settings.Form.name"],
          cell: ({ row }) =>
            row.getCanExpand() ? (
              <button
                className="flex cursor-pointer"
                {...{
                  onClick: row.getToggleExpandedHandler(),
                }}
                type="button"
              >
                {row.getIsExpanded() ? (
                  <div className="flex items-center gap-2">
                    <ChevronUp className="text-muted-foreground" />
                    {row.original.name}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ChevronDown className="text-muted-foreground" />
                    {row.original.name}
                  </div>
                )}
              </button>
            ) : (
              ""
            ),
        },
        {
          id: "isDefault",
          header: () => languageData["Contracts.Settings.Form.isDefault"],
          cell: ({ row }) => (
            <div className="flex w-full items-center justify-center gap-2">
              {row.original.isDefault ? (
                <Check className="w-4 text-green-500" />
              ) : (
                "Set as default"
              )}
            </div>
          ),
        },
      ],
    },
  };
}

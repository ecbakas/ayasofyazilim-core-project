import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type {
  UniRefund_ContractService_ContractsForMerchant_ContractSettings_ContractSettingCreateDto as ContractSettingCreateUpdateDto,
  UniRefund_ContractService_ContractsForMerchant_ContractSettings_ContractSettingDto as ContractSettingDto,
} from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_ContractsForMerchant_ContractSettings_ContractSettingCreateDto as $ContractSettingCreateUpdateDto } from "@ayasofyazilim/saas/ContractService";
import type { UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressCommonDataDto } from "@ayasofyazilim/saas/LocationService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import { tanstackTableCreateColumnsByRowData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import { SchemaForm } from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {
  bulkCreateUiSchema,
  createUiSchemaWithResource,
} from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import type { Dispatch, SetStateAction } from "react";
import { useCallback, useState } from "react";
import type { TanstackTableTableActionsType } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {
  deleteMerchantContractContractSettingsByIdApi,
  getMerchantContractHeaderContractSettingsByHeaderIdApi as getContractSettings,
  postMerchantContractHeaderContractSettingsByHeaderIdApi,
  putMerchantContractContractHeaderSetDefaultContractSettingByHeaderIdApi,
  putMerchantContractContractSettingsByIdApi,
} from "src/app/[lang]/app/actions/ContractService/action";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { MerchantAddressWidget } from "../contract-widgets";
import type { SectionProps } from "./details";

interface ContractSettingsTable {
  id: string;
  name: string;
  isDefault?: boolean;
  details?: ContractSettingDto;
}
const $ContractSettingsTable = {
  id: {
    type: "string",
  },
  name: {
    type: "string",
  },
  isDefault: {
    type: "boolean",
  },
  details: {
    type: "string",
  },
};
export function ContractSettingsSection({
  languageData,
  contractSettings,
  contractHeaderDetails,
  addresses,
  lang,
  loading,
  setLoading,
}: SectionProps) {
  const { data } = contractSettings;
  const [settings, setSettings] = useState<ContractSettingsTable[]>(
    data.items?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        isDefault: item.isDefault,
        details: item,
      };
    }) || [],
  );
  const [tempSettings, setTempSettings] = useState<
    ContractSettingsTable | undefined
  >();

  async function handleFetch() {
    setLoading(true);
    const contractSettingsResponse = await getContractSettings({
      id: contractHeaderDetails.id,
    });
    if (contractSettingsResponse.type === "success") {
      setSettings(
        contractSettingsResponse.data.items?.map((item) => {
          return {
            id: item.id,
            name: item.name,
            isDefault: item.isDefault,
            details: item,
          };
        }) || [],
      );
    } else {
      toast.error(contractSettingsResponse.message);
    }
    setLoading(false);
  }

  async function setContractSettingDefault(id: string) {
    setLoading(true);
    const response =
      await putMerchantContractContractHeaderSetDefaultContractSettingByHeaderIdApi(
        {
          id: contractHeaderDetails.id,
          requestBody: { contractSettingId: id },
        },
      );
    if (response.type === "success") {
      toast.success(
        response.message ||
          languageData["Contracts.Settings.SetIsDefault.Success"],
      );
    } else {
      toast.error(
        response.message ||
          languageData["Contracts.Settings.SetIsDefault.Fail"],
      );
    }
    await handleFetch();
    setLoading(false);
  }

  const RowForm = useCallback(
    (row: ContractSettingsTable) => {
      return (
        <SchemaFormForContractSettings
          addressList={addresses}
          formData={{
            ...row.details,
            invoicingAddressCommonDataId:
              row.details?.invoicingAddressCommonData.id,
          }}
          handleFetch={handleFetch}
          languageData={languageData}
          loading={loading}
          setLoading={setLoading}
          setTempSettings={setTempSettings}
          submitId={tempSettings ? contractHeaderDetails.id : row.id}
          type={tempSettings ? "temp" : "edit"}
        />
      );
    },
    [addresses, tempSettings, contractHeaderDetails],
  );

  const ColumnIsDefault = useCallback((row: ContractSettingsTable) => {
    return (
      <>
        {!row.isDefault && !tempSettings && (
          <Button
            onClick={() => void setContractSettingDefault(row.id)}
            size="sm"
            variant="outline"
          >
            {languageData["Contracts.Settings.Form.setIsDefault"]}
          </Button>
        )}
      </>
    );
  }, []);
  const columns = tanstackTableCreateColumnsByRowData<ContractSettingsTable>({
    rows: $ContractSettingsTable,
    config: {
      locale: lang,
    },
    custom: {
      isDefault: {
        showHeader: false,
        content: (row) => ColumnIsDefault(row),
      },
    },
    badges: {
      name: {
        values: [
          {
            label: languageData["Contracts.Settings.Form.isDefault"],
            conditions: [
              {
                conditionAccessorKey: "isDefault",
                when: (value) => value === true,
              },
            ],
          },
        ],
      },
    },
    expandRowTrigger: "name",
  });

  const tableActions: TanstackTableTableActionsType[] | undefined =
    !tempSettings
      ? [
          {
            actionLocation: "table",
            cta: "Add new setting",
            type: "simple",
            onClick: () => {
              setTempSettings({ name: "New", id: "$temp" });
            },
          },
        ]
      : undefined;
  return (
    <SectionLayoutContent className="px-5 py-0" sectionId="contract-setting">
      {settings.length > 0 ? (
        <TanstackTable
          columnVisibility={{
            columns: ["id", "details"],
            type: "hide",
          }}
          columns={columns}
          data={tempSettings ? [...settings, tempSettings] : settings}
          expandedRowComponent={(row) => RowForm(row)}
          fillerColumn="name"
          tableActions={tableActions}
        />
      ) : (
        <SchemaFormForContractSettings
          addressList={addresses}
          formData={{}}
          handleFetch={handleFetch}
          languageData={languageData}
          loading={loading}
          setLoading={setLoading}
          submitId={contractHeaderDetails.id}
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
  setTempSettings,
  submitId,
  type,
  handleFetch,
}: {
  languageData: ContractServiceResource;
  formData: Partial<ContractSettingCreateUpdateDto>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setTempSettings?: Dispatch<SetStateAction<ContractSettingsTable | undefined>>;
  addressList: AddressCommonDataDto[];
  submitId: string;
  type: "edit" | "create" | "temp";
  handleFetch: () => Promise<void>;
}) {
  const switchFields: (keyof ContractSettingCreateUpdateDto)[] = [
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
    schema: $ContractSettingCreateUpdateDto,
    extend: {
      ...bulkCreateUiSchema<ContractSettingCreateUpdateDto>({
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
        "ui:className": "hidden",
      },
    },
  });

  async function handleContractSettingsSubmit(
    data: ContractSettingCreateUpdateDto,
  ) {
    setLoading(true);
    if (type === "create" || type === "temp") {
      const response =
        await postMerchantContractHeaderContractSettingsByHeaderIdApi({
          id: submitId,
          requestBody: data,
        });
      if (response.type === "success") {
        toast.success(
          response.message || languageData["Contracts.Settings.Create.Success"],
        );
      } else {
        toast.error(
          response.message || languageData["Contracts.Settings.Create.Fail"],
        );
      }
      await handleFetch();
    } else {
      const response = await putMerchantContractContractSettingsByIdApi({
        id: submitId,
        requestBody: data,
      });
      if (response.type === "success") {
        toast.success(
          response.message || languageData["Contracts.Settings.Edit.Success"],
        );
      } else {
        toast.error(
          response.message || languageData["Contracts.Settings.Edit.Fail"],
        );
      }
    }
    await handleFetch();
    setLoading(false);
  }

  return (
    <SchemaForm
      className="bg-white"
      defaultSubmitClassName="pr-4"
      disabled={loading}
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
          data.formData as ContractSettingCreateUpdateDto,
        );
      }}
      schema={$ContractSettingCreateUpdateDto}
      uiSchema={uiSchema}
      useDefaultSubmit={false}
      widgets={{
        address: MerchantAddressWidget({
          loading,
          addressList,
          languageData,
        }),
      }}
      withScrollArea
    >
      <div className="sticky bottom-0 z-50 flex justify-end gap-2 bg-white py-4">
        <DeleteDialog
          handleFetch={handleFetch}
          languageData={languageData}
          setLoading={setLoading}
          setTempSettings={setTempSettings}
          submitId={type === "temp" ? "$temp" : submitId}
        />
        <Button type="submit">
          {type === "edit"
            ? languageData["Contracts.Edit.Submit"]
            : languageData["Contracts.Create.Submit"]}
        </Button>
      </div>
    </SchemaForm>
  );
}

function DeleteDialog({
  submitId,
  languageData,
  setLoading,
  setTempSettings,
  handleFetch,
}: {
  submitId: string;
  languageData: ContractServiceResource;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setTempSettings?: Dispatch<SetStateAction<ContractSettingsTable | undefined>>;
  handleFetch: () => Promise<void>;
}) {
  async function handleDelete() {
    if (submitId === "$temp" && setTempSettings) {
      setTempSettings(undefined);
      return;
    }
    setLoading(true);
    const response =
      await deleteMerchantContractContractSettingsByIdApi(submitId);
    if (response.type === "success") {
      toast.success(
        response.message || languageData["Contracts.Settings.Delete.Success"],
      );
    } else {
      toast.error(
        response.message || languageData["Contracts.Settings.Delete.Fail"],
      );
    }
    await handleFetch();
    setLoading(false);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="destructive">
          {languageData["Contracts.Settings.Form.Delete"]}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {languageData["Contracts.Settings.Form.Delete.Title"]}
          </DialogTitle>
          <DialogDescription>
            {languageData["Contracts.Settings.Form.Delete.Description"]}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => void handleDelete()}
            type="button"
            variant="destructive"
          >
            {languageData["Contracts.Settings.Form.Delete"]}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

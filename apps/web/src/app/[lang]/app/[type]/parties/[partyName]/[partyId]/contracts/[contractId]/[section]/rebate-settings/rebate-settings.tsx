"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type {
  UniRefund_ContractService_Rebates_MinimumNetCommissions_MinimumNetCommissionCreateDto as MinimumNetCommissionCreateDto,
  UniRefund_ContractService_Rebates_RebateSettings_RebateSettingCreateDto as RebateSettingCreateDto,
  UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as RebateTableHeaderDto,
  UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderFromTemplateCreateDto as RebateTableHeaderFromTemplateCreateDto,
  UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderNotTemplateCreateDto as RebateTableHeaderNotTemplateCreateDto,
} from "@ayasofyazilim/saas/ContractService";
import {
  $UniRefund_ContractService_Rebates_MinimumNetCommissions_MinimumNetCommissionCreateDto as $MinimumNetCommissionCreateDto,
  $UniRefund_ContractService_Rebates_RebateSettings_RebateSettingCreateDto as $RebateSettingCreateDto,
  $UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderFromTemplateCreateDto as $RebateTableHeaderFromTemplateCreateDto,
} from "@ayasofyazilim/saas/ContractService";
import type { UniRefund_CRMService_Merchants_StoreProfileDto as StoreProfileDto } from "@ayasofyazilim/saas/CRMService";
import { SchemaForm } from "@repo/ayasofyazilim-ui/organisms/schema-form";
import type { FieldProps } from "@repo/ayasofyazilim-ui/organisms/schema-form/types";
import { createUiSchemaWithResource } from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import { toastOnSubmit } from "@repo/ui/toast-on-submit";
import { useState } from "react";
import RebateForm from "src/app/[lang]/app/[type]/settings/templates/rebate/rebate-form";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { handlePutResponse } from "src/app/[lang]/app/actions/api-utils-client";
import {
  MerchantStoresWidget,
  RebateTableWidget,
} from "../../../contract-widgets";

export function RebateSettings({
  languageData,
  rebateTables,
  subMerchants,
}: {
  languageData: ContractServiceResource;
  rebateTables: RebateTableHeaderDto[];
  subMerchants: StoreProfileDto[];
}) {
  const uiSchema = createUiSchemaWithResource({
    schema: $RebateSettingCreateDto,
    resources: languageData,
    name: "Rebate.Form",
    extend: {
      isTrustedMerchant: {
        "ui:widget": "switch",
      },
      rebateTableHeaders: {
        items: {
          "ui:field": "CreateRebateTableField",
        },
      },
      rebateTableHeadersFromTemplate: {
        items: {
          "ui:field": "SelectRebateTableField",
        },
      },
      minimumNetCommissions: {
        items: {
          "ui:field": "CreateMinimumNetCommissionField",
        },
      },
    },
  });

  return (
    <SchemaForm<RebateSettingCreateDto>
      fields={{
        CreateRebateTableField: CreateRebateTableField({
          languageData,
        }),
        SelectRebateTableField: SelectRebateTableField({
          languageData,
          rebateTableHeaders: rebateTables,
        }),
        CreateMinimumNetCommissionField: CreateMinimumNetCommissionField({
          loading: false,
          languageData,
          subMerchants,
        }),
      }}
      onSubmit={(data) => {
        toastOnSubmit(data.formData as object);
      }}
      schema={$RebateSettingCreateDto}
      uiSchema={uiSchema}
    />
  );
}

function SelectRebateTableField({
  languageData,
  rebateTableHeaders,
}: {
  languageData: ContractServiceResource;
  rebateTableHeaders: RebateTableHeaderDto[];
}) {
  function Field(props: FieldProps) {
    const _formData = props.formData as RebateTableHeaderFromTemplateCreateDto;
    const selectedRebateTableHeader = rebateTableHeaders.find(
      (item) => item.id === _formData.id,
    );
    const [open, setOpen] = useState(false);
    return (
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetTrigger asChild>
          <Button
            className="h-12 w-full justify-start"
            type="button"
            variant="ghost"
          >
            {selectedRebateTableHeader ? (
              <div className="flex items-center gap-2">
                <span>{selectedRebateTableHeader.name}</span>
                <div className="space-x-2">
                  <Badge variant="outline">
                    {new Date(_formData.validFrom).toLocaleDateString()}
                  </Badge>
                  <Badge variant="outline">
                    {new Date(_formData.validTo).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            ) : (
              "Please select an rebate table header template"
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Select</SheetTitle>
          </SheetHeader>
          <SchemaForm<RebateTableHeaderFromTemplateCreateDto>
            className="h-full p-0 [&>fieldset]:border-0 [&>fieldset]:p-0"
            formData={_formData}
            onSubmit={(data) => {
              props.onChange(data.formData);
              setOpen(false);
            }}
            schema={$RebateTableHeaderFromTemplateCreateDto}
            uiSchema={createUiSchemaWithResource({
              schema: $RebateTableHeaderFromTemplateCreateDto,
              resources: languageData,
              name: "Rebate.Form.rebateTableHeadersFromTemplate",
              extend: {
                displayLabel: false,
                id: {
                  "ui:widget": "RebateTableWidget",
                },
              },
            })}
            useDefaultSubmit={false}
            widgets={{
              RebateTableWidget: RebateTableWidget({
                languageData,
                rebateTableHeaders,
                loading: false,
              }),
            }}
            withScrollArea={false}
          >
            <SheetFooter className="mt-2">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit">Submit</Button>
            </SheetFooter>
          </SchemaForm>
        </SheetContent>
      </Sheet>
    );
  }
  return Field;
}

function CreateRebateTableField({
  languageData,
}: {
  languageData: ContractServiceResource;
}) {
  function Field(props: FieldProps) {
    const _formData: RebateTableHeaderNotTemplateCreateDto | undefined =
      props.formData as RebateTableHeaderNotTemplateCreateDto;
    const [open, setOpen] = useState(false);
    return (
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetTrigger asChild>
          <Button
            className="h-12 w-full justify-start"
            type="button"
            variant="ghost"
          >
            {_formData.name && _formData.validFrom && _formData.validTo ? (
              <div className="flex items-center gap-2">
                <span>{_formData.name}</span>
                <div className="space-x-2">
                  <Badge variant="outline">
                    {new Date(_formData.validFrom).toLocaleDateString()}
                  </Badge>
                  <Badge variant="outline">
                    {new Date(_formData.validTo).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            ) : (
              "You can create rebate table template here"
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-screen pb-20 sm:max-w-full lg:w-[50vw]">
          <SheetHeader>
            <SheetTitle>Create</SheetTitle>
          </SheetHeader>
          <RebateForm
            formData={_formData}
            formType="add"
            languageData={languageData}
            onSubmit={(data) => {
              props.onChange(data);
              setOpen(false);
            }}
          >
            <SheetFooter className="mt-2">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit">Submit</Button>
            </SheetFooter>
          </RebateForm>
        </SheetContent>
      </Sheet>
    );
  }
  return Field;
}

function CreateMinimumNetCommissionField({
  loading,
  languageData,
  subMerchants,
}: {
  loading: boolean;
  languageData: ContractServiceResource;
  subMerchants: StoreProfileDto[];
}) {
  function Field(props: FieldProps) {
    const _formData: MinimumNetCommissionCreateDto =
      props.formData as MinimumNetCommissionCreateDto;
    const hasValue: boolean = Object.keys(props.formData as object).length > 0;
    const [open, setOpen] = useState(false);
    handlePutResponse;
    return (
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetTrigger asChild>
          <Button
            className="w-full justify-start"
            type="button"
            variant="ghost"
          >
            {hasValue ? (
              <div className="flex items-center gap-2">
                <span>{_formData.amount}</span>
                <div className="space-x-2">
                  <Badge variant="outline">
                    {new Date(_formData.validFrom).toLocaleDateString()}
                  </Badge>
                  <Badge variant="outline">
                    {new Date(_formData.validTo).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            ) : (
              "Please select an minimum net commission"
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit</SheetTitle>
          </SheetHeader>
          <SchemaForm<MinimumNetCommissionCreateDto>
            className="h-full p-0 [&>fieldset]:border-0 [&>fieldset]:p-0"
            filter={{
              type: "include",
              sort: true,
              keys: ["appliedOrganizationId", "validFrom", "validTo", "amount"],
            }}
            formData={_formData}
            onSubmit={(data) => {
              props.onChange(data.formData);
              setOpen(false);
            }}
            schema={$MinimumNetCommissionCreateDto}
            uiSchema={createUiSchemaWithResource({
              schema: $MinimumNetCommissionCreateDto,
              resources: languageData,
              name: "Rebate.Form.minimumNetCommissions",
              extend: {
                displayLabel: false,
                appliedOrganizationId: {
                  "ui:widget": "MerchantStoresWidget",
                },
              },
            })}
            useDefaultSubmit={false}
            widgets={{
              MerchantStoresWidget: MerchantStoresWidget({
                languageData,
                loading,
                list: subMerchants,
              }),
            }}
            withScrollArea={false}
          >
            <SheetFooter className="mt-2">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit">Submit</Button>
            </SheetFooter>
          </SchemaForm>
        </SheetContent>
      </Sheet>
    );
  }
  return Field;
}

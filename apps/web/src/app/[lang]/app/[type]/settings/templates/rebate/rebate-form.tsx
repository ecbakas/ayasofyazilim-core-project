"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type {
  UniRefund_ContractService_Rebates_ProcessingFeeDetails_ProcessingFeeDetailCreateDto as ProcessingFeeDetailCreateDto,
  UniRefund_ContractService_Rebates_RebateTableDetails_RebateTableDetailCreateDto as RebateTableDetailCreateDto,
  UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderCreateDto as RebateTableHeaderCreateDto,
  UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as RebateTableHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import {
  $UniRefund_ContractService_Rebates_ProcessingFeeDetails_ProcessingFeeDetailCreateDto as $ProcessingFeeDetailCreateDto,
  $UniRefund_ContractService_Rebates_RebateTableDetails_RebateTableDetailCreateDto as $RebateTableDetailCreateDto,
  $UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderCreateDto as $RebateTableHeaderCreateDto,
  $UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderUpdateDto as $RebateTableHeaderUpdateDto,
} from "@ayasofyazilim/saas/ContractService";
import { tanstackTableEditableColumnsByRowData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import { SchemaForm } from "@repo/ayasofyazilim-ui/organisms/schema-form";
import { TableField } from "@repo/ayasofyazilim-ui/organisms/schema-form/fields";
import { createUiSchemaWithResource } from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import { PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  handlePostResponse,
  handlePutResponse,
} from "src/app/[lang]/app/actions/api-utils-client";
import { postRebateTableHeadersApi } from "src/app/[lang]/app/actions/ContractService/post-actions";
import { putRebateTableHeadersApi } from "src/app/[lang]/app/actions/ContractService/put-actions";
import type { ContractServiceResource } from "src/language-data/ContractService";

type TypeWithId<Type, IdType = string> = Type & {
  id: IdType;
};
type RebateFormProps = {
  languageData: ContractServiceResource;
} & (RebateFormCreateProps | RebateFormUpdateProps | RebateFormAddProps);
interface RebateFormCreateProps {
  formType: "create";
}
interface RebateFormUpdateProps {
  formType: "update";
  id: string;
  formData: RebateTableHeaderDto;
}

interface RebateFormAddProps {
  formType: "add";
  id?: string;
  formData?: RebateTableHeaderDto;
  onSubmit: (data: RebateTableHeaderDto) => void;
}

export default function RebateForm(props: RebateFormProps) {
  const { languageData } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isCreate = props.formType === "create";
  const $Schema = isCreate
    ? $RebateTableHeaderCreateDto
    : $RebateTableHeaderUpdateDto;
  const RebateTableColumns = tanstackTableEditableColumnsByRowData<
    TypeWithId<RebateTableDetailCreateDto>
  >({
    rows: $RebateTableDetailCreateDto.properties,
    languageData: {
      constantKey: "Rebate.Form.rebateTableDetails",
      languageData,
    },
    excludeColumns: ["extraProperties"],
  });
  const ProcessingFeeDetailsColumns =
    tanstackTableEditableColumnsByRowData<ProcessingFeeDetailCreateDto>({
      rows: $ProcessingFeeDetailCreateDto.properties,
      languageData: {
        constantKey: "Rebate.Form.processingFeeDetails",
        languageData,
      },
      excludeColumns: ["extraProperties"],
    });
  const uiSchema = createUiSchemaWithResource({
    resources: languageData,
    schema: $Schema,
    name: "Rebate.Form",
    extend: {
      "ui:className": "md:grid md:grid-cols-2 md:gap-4",
      name: { "ui:className": "md:col-span-2" },
      rebateTableDetails: { "ui:field": "RebateTable" },
      processingFeeDetails: { "ui:field": "ProcessingFeeDetails" },
      isTemplate: {
        "ui:widget": "switch",
        "ui:className": "border rounded-md px-2",
        "ui:options": {
          disabled: true,
        },
      },
      calculateNetCommissionInsteadOfRefund: {
        "ui:widget": "switch",
        "ui:className": cn(
          "border rounded-md px-2",
          isCreate && "md:col-span-2",
        ),
      },
    },
  });

  function handleFormSubmit<T>(data: T) {
    setLoading(true);
    if (props.formType === "create") {
      void postRebateTableHeadersApi({
        requestBody: data as RebateTableHeaderCreateDto,
      }).then((response) => {
        handlePostResponse(response, router, "../rebate");
      });
    } else if (props.formType === "update") {
      void putRebateTableHeadersApi({
        id: props.id,
        requestBody: data as RebateTableHeaderDto,
      }).then((response) => {
        handlePutResponse(response, router);
      });
    }
    setLoading(false);
  }
  return (
    <SchemaForm
      disabled={loading}
      fields={{
        RebateTable: TableField<TypeWithId<RebateTableDetailCreateDto>>({
          editable: true,
          columns: RebateTableColumns,
          data: isCreate ? [] : props.formData?.rebateTableDetails || [],
          fillerColumn: "refundMethod",
          columnOrder: [
            "refundMethod",
            "fixedFeeValue",
            "percentFeeValue",
            "variableFee",
          ],
          tableActions: [
            {
              type: "create-row",
              actionLocation: "table",
              cta: languageData["Rebate.Form.rebateTableDetails.add"],
              icon: PlusCircle,
            },
          ],
          rowActions: [
            {
              actionLocation: "row",
              cta: languageData["Rebate.Form.rebateTableDetails.delete"],
              icon: Trash2,
              type: "delete-row",
            },
          ],
        }),
        ProcessingFeeDetails: TableField<ProcessingFeeDetailCreateDto>({
          editable: true,
          columns: ProcessingFeeDetailsColumns,
          data:
            props.formType === "create"
              ? []
              : props.formData?.processingFeeDetails || [],
          fillerColumn: "name",
          tableActions: [
            {
              type: "create-row",
              actionLocation: "table",
              cta: languageData["Rebate.Form.processingFeeDetails.add"],
              icon: PlusCircle,
            },
          ],
          rowActions: [
            {
              actionLocation: "row",
              cta: languageData["Rebate.Form.processingFeeDetails.delete"],
              icon: Trash2,
              type: "delete-row",
            },
          ],
        }),
      }}
      formData={!isCreate ? props.formData : undefined}
      onSubmit={(data) => {
        if (!data.formData) return;

        if (isCreate) {
          handleFormSubmit<RebateTableHeaderCreateDto>(data.formData);
        } else {
          handleFormSubmit<RebateTableHeaderDto>(data.formData);
        }
      }}
      schema={$Schema}
      tagName={props.formType === "add" ? "div" : "form"}
      uiSchema={uiSchema}
      useDefaultSubmit={false}
    >
      <div className="sticky bottom-0 z-50 flex justify-end gap-2 bg-white py-4">
        {props.formType === "add" ? (
          <Button
            onClick={() => {
              if (props.formData) props.onSubmit(props.formData);
            }}
            type="button"
          >
            {languageData["Rebate.Add.Submit"]}
          </Button>
        ) : (
          <Button type="submit">
            {props.formType === "create" &&
              languageData["Rebate.Create.Submit"]}
            {props.formType === "update" &&
              languageData["Rebate.Update.Submit"]}
          </Button>
        )}
      </div>
    </SchemaForm>
  );
}

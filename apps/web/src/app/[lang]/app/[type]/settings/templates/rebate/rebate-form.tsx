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
} & (RebateFormCreateProps | RebateFormUpdateProps);

interface RebateFormCreateProps {
  formType: "create";
}
interface RebateFormUpdateProps {
  formType: "update";
  id: string;
  formData: RebateTableHeaderDto;
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
      constantKey: "RebateTables.Templates.Form.rebateTableDetails",
      languageData,
    },
    excludeColumns: ["extraProperties"],
  });
  const ProcessingFeeDetailsColumns =
    tanstackTableEditableColumnsByRowData<ProcessingFeeDetailCreateDto>({
      rows: $ProcessingFeeDetailCreateDto.properties,
      languageData: {
        constantKey: "RebateTables.Templates.Form.processingFeeDetails",
        languageData,
      },
      excludeColumns: ["extraProperties"],
    });
  const uiSchema = createUiSchemaWithResource({
    resources: languageData,
    schema: $Schema,
    name: "RebateTables.Templates.Form",
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
    if (isCreate) {
      void postRebateTableHeadersApi({
        requestBody: data as RebateTableHeaderCreateDto,
      }).then((response) => {
        handlePostResponse(response, router, "../rebate");
      });
    } else {
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
          showPagination: false,
          columns: RebateTableColumns,
          data: isCreate ? [] : props.formData.rebateTableDetails || [],
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
              cta: languageData[
                "RebateTables.Templates.Form.rebateTableDetails.add"
              ],
              icon: PlusCircle,
            },
          ],
          rowActions: [
            {
              actionLocation: "row",
              cta: languageData[
                "RebateTables.Templates.Form.rebateTableDetails.delete"
              ],
              icon: Trash2,
              type: "delete-row",
            },
          ],
        }),
        ProcessingFeeDetails: TableField<ProcessingFeeDetailCreateDto>({
          editable: true,
          showPagination: false,
          columns: ProcessingFeeDetailsColumns,
          data: isCreate ? [] : props.formData.processingFeeDetails || [],
          fillerColumn: "name",
          tableActions: [
            {
              type: "create-row",
              actionLocation: "table",
              cta: languageData[
                "RebateTables.Templates.Form.processingFeeDetails.add"
              ],
              icon: PlusCircle,
            },
          ],
          rowActions: [
            {
              actionLocation: "row",
              cta: languageData[
                "RebateTables.Templates.Form.processingFeeDetails.delete"
              ],
              icon: Trash2,
              type: "delete-row",
            },
          ],
        }),
      }}
      formData={!isCreate ? props.formData : undefined}
      onSubmit={(data) => {
        if (isCreate) {
          handleFormSubmit<RebateTableHeaderCreateDto>(
            data.formData as RebateTableHeaderCreateDto,
          );
        } else {
          handleFormSubmit<RebateTableHeaderDto>(
            data.formData as RebateTableHeaderDto,
          );
        }
      }}
      schema={$Schema}
      uiSchema={uiSchema}
      useDefaultSubmit={false}
    >
      <div className="sticky bottom-0 z-50 flex justify-end gap-2 bg-white py-4">
        <Button type="submit">
          {isCreate
            ? languageData["RebateTables.Templates.Create.Submit"]
            : languageData["RebateTables.Templates.Update.Submit"]}
        </Button>
      </div>
    </SchemaForm>
  );
}

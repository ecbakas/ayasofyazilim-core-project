"use client";
import type {
  UniRefund_ContractService_Rebates_RebateTableDetails_RebateTableDetailCreateDto as RebateTableDetailCreateDto,
  UniRefund_ContractService_Rebates_ProcessingFeeDetails_ProcessingFeeDetailCreateDto as ProcessingFeeDetailCreateDto,
} from "@ayasofyazilim/saas/ContractService";
import {
  $UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderCreateDto as $RebateTableHeaderCreateDto,
  $UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderUpdateDto as $RebateTableHeaderUpdateDto,
  $UniRefund_ContractService_Rebates_RebateTableDetails_RebateTableDetailCreateDto as $RebateTableDetailCreateDto,
  $UniRefund_ContractService_Rebates_ProcessingFeeDetails_ProcessingFeeDetailCreateDto as $ProcessingFeeDetailCreateDto,
} from "@ayasofyazilim/saas/ContractService";
import { tanstackTableEditableColumnsByRowData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import { SchemaForm } from "@repo/ayasofyazilim-ui/organisms/schema-form";
import { TableField } from "@repo/ayasofyazilim-ui/organisms/schema-form/fields";
import { createUiSchemaWithResource } from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import { toastOnSubmit } from "@repo/ui/toast-on-submit";
import { PlusCircle, Trash2 } from "lucide-react";
import type { ContractServiceResource } from "src/language-data/ContractService";

type TypeWithId<Type, IdType = string> = Type & {
  id: IdType;
};

export default function RebateForm({
  languageData,
  formType,
}: {
  languageData: ContractServiceResource;
  formType: "create" | "update";
}) {
  const isCreate = formType === "create";
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
      rebateTableDetails: { "ui:field": "RebateTable" },
      processingFeeDetails: { "ui:field": "ProcessingFeeDetails" },
    },
  });
  return (
    <SchemaForm
      fields={{
        RebateTable: TableField<TypeWithId<RebateTableDetailCreateDto>>({
          editable: true,
          showPagination: false,
          columns: RebateTableColumns,
          data: [],
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
          data: [],
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
      onSubmit={(data) => {
        data.formData && toastOnSubmit(data.formData as object);
      }}
      schema={$Schema}
      submitText={languageData["RefundTables.Create.Submit"]}
      uiSchema={uiSchema}
    />
  );
}

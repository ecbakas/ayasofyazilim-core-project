"use client";
import type {
  UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailCreateDto,
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailCreateByListDto } from "@ayasofyazilim/saas/ContractService";
import { tanstackTableEditableColumnsByRowData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import { SchemaForm } from "@repo/ayasofyazilim-ui/organisms/schema-form";
import { TableField } from "@repo/ayasofyazilim-ui/organisms/schema-form/fields";
import { PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { handlePostResponse } from "src/app/[lang]/app/actions/api-utils-client";
import { postRefundTableHeadersRefundTableDetailsApi } from "src/app/[lang]/app/actions/ContractService/post-actions";
import type { ContractServiceResource } from "src/language-data/ContractService";

type TypeWithId<Type, IdType = string> = Type & {
  id: IdType;
};

export default function RefundTablesRuleForm({
  response,
  languageData,
}: {
  response: UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto;
  languageData: ContractServiceResource;
}) {
  const router = useRouter();
  const RebateTableColumns = tanstackTableEditableColumnsByRowData<
    TypeWithId<UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailCreateDto>
  >({
    rows: $UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailCreateByListDto
      .properties.refundTableDetails.items.properties,
    excludeColumns: ["extraProperties"],
  });
  return (
    <SchemaForm
      fields={{
        RebateTable: TableField<
          TypeWithId<UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailCreateDto>
        >({
          editable: true,
          showPagination: false,
          columns: RebateTableColumns,
          // @ts-expect-error UNI-577
          data: response.refundTableDetails || [],
          fillerColumn: "id",
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
      }}
      formData={response.refundTableDetails || []}
      onSubmit={(data) => {
        const formData = (data.formData ||
          []) as UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailCreateDto[];

        void postRefundTableHeadersRefundTableDetailsApi({
          id: response.id,
          requestBody: {
            refundTableDetails: formData,
          },
        }).then((res) => {
          handlePostResponse(res, router);
        });
      }}
      schema={
        $UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailCreateByListDto
          .properties.refundTableDetails
      }
      submitText={languageData["RefundTables.Create.Submit"]}
      uiSchema={{
        "ui:field": "RebateTable",
      }}
    />
  );
}

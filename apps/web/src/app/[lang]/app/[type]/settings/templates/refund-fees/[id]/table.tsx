"use client";
import { $UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailCreateByListDto } from "@ayasofyazilim/saas/ContractService";
import type {
  UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailCreateDto,
  UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import { tanstackTableEditableColumnsByRowData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import { SchemaForm } from "@repo/ayasofyazilim-ui/organisms/schema-form";
import { TableField } from "@repo/ayasofyazilim-ui/organisms/schema-form/fields";
import { PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { handlePostResponse } from "src/app/[lang]/app/actions/api-utils-client";
import { postRefundFeeHeadersRefundFeeDetailsApi } from "src/app/[lang]/app/actions/ContractService/post-actions";
import type { ContractServiceResource } from "src/language-data/ContractService";

type TypeWithId<Type, IdType = string> = Type & {
  id: IdType;
};

export default function RefundFeeDetailsForm({
  response,
  languageData,
}: {
  response: UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto;
  languageData: ContractServiceResource;
}) {
  const router = useRouter();
  const RebateFeeColumns = tanstackTableEditableColumnsByRowData<
    TypeWithId<UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailCreateDto>
  >({
    rows: $UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailCreateByListDto
      .properties.refundFeeDetails.items.properties,
    excludeColumns: ["extraProperties"],
  });
  return (
    <SchemaForm
      fields={{
        RebateTable: TableField<
          TypeWithId<UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailCreateDto>
        >({
          editable: true,
          columns: RebateFeeColumns,
          data: response.refundFeeDetails || [],
          fillerColumn: "id",
          tableActions: [
            {
              type: "create-row",
              actionLocation: "table",
              cta: languageData["Rebate.Create"],
              icon: PlusCircle,
            },
          ],
          rowActions: [
            {
              actionLocation: "row",
              cta: languageData.Delete,
              icon: Trash2,
              type: "delete-row",
            },
          ],
        }),
      }}
      formData={response.refundFeeDetails || []}
      onSubmit={(data) => {
        const formData = data.formData;

        void postRefundFeeHeadersRefundFeeDetailsApi({
          id: response.id,
          requestBody: {
            refundFeeDetails: formData,
          },
        }).then((res) => {
          handlePostResponse(res, router);
        });
      }}
      schema={
        $UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailCreateByListDto
          .properties.refundFeeDetails
      }
      submitText={languageData["RefundTables.Create.Submit"]}
      uiSchema={{
        "ui:field": "RebateTable",
      }}
    />
  );
}

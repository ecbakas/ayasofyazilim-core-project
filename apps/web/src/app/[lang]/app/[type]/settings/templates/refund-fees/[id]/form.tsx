"use client";
import type {
  UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto,
  UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderUpdateDto,
} from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderUpdateDto } from "@ayasofyazilim/saas/ContractService";
import { SchemaForm } from "@repo/ayasofyazilim-ui/organisms/schema-form";
import { createUiSchemaWithResource } from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import { useRouter } from "next/navigation";
import { handlePutResponse } from "src/app/[lang]/app/actions/api-utils-client";
import { putRefundFeeHeadersApi } from "src/app/[lang]/app/actions/ContractService/put-actions";
import type { ContractServiceResource } from "src/language-data/ContractService";

function Form({
  response,
  languageData,
}: {
  response: UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto;
  languageData: ContractServiceResource;
}) {
  const router = useRouter();
  const uiSchema = createUiSchemaWithResource({
    resources: languageData,
    schema:
      $UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderUpdateDto,
  });
  return (
    <SchemaForm
      fields={{}}
      formData={response}
      onSubmit={(data) => {
        const formData = {
          id: response.id,
          requestBody:
            data.formData as UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderUpdateDto,
        };
        void putRefundFeeHeadersApi(formData).then((res) => {
          handlePutResponse(res, router);
        });
      }}
      schema={
        $UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderUpdateDto
      }
      submitText={languageData.Save}
      uiSchema={uiSchema}
    />
  );
}

export default Form;

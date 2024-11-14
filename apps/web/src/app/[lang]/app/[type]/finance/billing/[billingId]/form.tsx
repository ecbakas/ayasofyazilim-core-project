"use client";

import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_FinanceService_Billings_BillingDto,
  UniRefund_FinanceService_Billings_UpdateBillingDto,
} from "@ayasofyazilim/saas/FinanceService";
import { $UniRefund_FinanceService_Billings_UpdateBillingDto } from "@ayasofyazilim/saas/FinanceService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
  createFieldConfigWithResource,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useRouter } from "next/navigation";
import { putBillingApi } from "src/app/[lang]/app/actions/FinanceService/put-actions";
import type { FinanceServiceResource } from "src/language-data/FinanceService";

const updateBillingSchema = createZodObject(
  $UniRefund_FinanceService_Billings_UpdateBillingDto,
);

export default function Form({
  billingId,
  languageData,
  billingData,
}: {
  billingId: string;
  languageData: FinanceServiceResource;
  billingData: UniRefund_FinanceService_Billings_BillingDto;
}) {
  const router = useRouter();
  async function updateBilling(
    data: UniRefund_FinanceService_Billings_UpdateBillingDto,
  ) {
    const response = await putBillingApi({
      id: billingId,
      requestBody: data,
    });
    if (response.type === "success") {
      toast.success(languageData["Billing.Update.Success"]);
      router.refresh();
    } else {
      toast.error(response.message);
    }
  }

  const translatedForm = createFieldConfigWithResource({
    schema: $UniRefund_FinanceService_Billings_UpdateBillingDto,
    resources: languageData,
  });

  return (
    <AutoForm
      fieldConfig={translatedForm}
      formSchema={updateBillingSchema}
      onSubmit={(formdata) => {
        void updateBilling(
          formdata as UniRefund_FinanceService_Billings_UpdateBillingDto,
        );
      }}
      values={billingData}
    >
      <AutoFormSubmit className="float-right">
        {languageData["Edit.Save"]}
      </AutoFormSubmit>
    </AutoForm>
  );
}

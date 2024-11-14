"use client";
import { toast } from "@/components/ui/sonner";
import type { UniRefund_CRMService_Merchants_MerchantProfileDto } from "@ayasofyazilim/saas/CRMService";
import type { UniRefund_FinanceService_Billings_CreateBillingDto } from "@ayasofyazilim/saas/FinanceService";
import { $UniRefund_FinanceService_Billings_CreateBillingDto } from "@ayasofyazilim/saas/FinanceService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
  createFieldConfigWithResource,
  CustomCombobox,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useRouter } from "next/navigation";
import { postBillingApi } from "src/app/[lang]/app/actions/FinanceService/post-actions";
import type { FinanceServiceResource } from "src/language-data/FinanceService";
import { getBaseLink } from "src/utils";

const billingSchema = createZodObject(
  $UniRefund_FinanceService_Billings_CreateBillingDto,
);

export default function Page({
  languageData,
  merchantsData,
}: {
  languageData: FinanceServiceResource;
  merchantsData: UniRefund_CRMService_Merchants_MerchantProfileDto[];
}) {
  const router = useRouter();

  async function createBilling(
    data: UniRefund_FinanceService_Billings_CreateBillingDto,
  ) {
    const response = await postBillingApi({ requestBody: data });
    if (response.type === "error" || response.type === "api-error") {
      toast.error(
        response.type + (response.message || languageData["Billing.New.Error"]),
      );
    } else {
      toast.success([languageData["Billing.New.Success"]]);
      router.push(getBaseLink(`/app/admin/finance/billing`));
    }
  }

  const translatedForm = createFieldConfigWithResource({
    schema: $UniRefund_FinanceService_Billings_CreateBillingDto,
    resources: languageData,
    extend: {
      merchantId: {
        renderer: (props) => (
          <CustomCombobox<UniRefund_CRMService_Merchants_MerchantProfileDto>
            childrenProps={props}
            emptyValue={languageData["Merchant.Select"]}
            list={merchantsData}
            searchPlaceholder={languageData["Select.Placeholder"]}
            searchResultLabel={languageData["Select.ResultLabel"]}
            selectIdentifier="id"
            selectLabel="name"
          />
        ),
      },
    },
  });

  return (
    <AutoForm
      fieldConfig={translatedForm}
      formSchema={billingSchema}
      onSubmit={(val) => {
        void createBilling(
          val as UniRefund_FinanceService_Billings_CreateBillingDto,
        );
      }}
      stickyChildren
    >
      <AutoFormSubmit className="float-right px-8 py-4">
        {languageData.Save}
      </AutoFormSubmit>
    </AutoForm>
  );
}

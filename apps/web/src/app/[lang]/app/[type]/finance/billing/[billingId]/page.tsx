"use server";
import { getBillingDetailApi } from "src/app/[lang]/app/actions/FinanceService/actions";
import { getResourceData } from "src/language-data/FinanceService";
import Form from "./form";

export default async function Page({
  params,
}: {
  params: { lang: string; billingId: string };
}) {
  const { languageData } = await getResourceData(params.lang);
  const billing = await getBillingDetailApi(params.billingId);

  if (billing.type !== "success") {
    return (
      <div className="error-message">
        {billing.message || languageData["Billing.Fetch.Fail"]}
      </div>
    );
  }

  const billingList = billing.data;

  return (
    <Form
      billingData={billingList}
      billingId={params.billingId}
      languageData={languageData}
    />
  );
}

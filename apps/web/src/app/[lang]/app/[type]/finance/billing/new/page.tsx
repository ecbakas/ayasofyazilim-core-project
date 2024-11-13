"use server";

import { getMerchantsApi } from "src/app/[lang]/app/actions/CrmService/actions";
import { getResourceData } from "src/language-data/FinanceService";
import Form from "./form";

export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData } = await getResourceData(params.lang);
  const merchant = await getMerchantsApi();
  const merchantsList =
    (merchant.type === "success" && merchant.data.items) || [];
  return <Form languageData={languageData} merchantsData={merchantsList} />;
}

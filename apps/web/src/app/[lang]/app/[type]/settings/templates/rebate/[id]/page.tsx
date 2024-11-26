"use server";
import { getResourceData } from "src/language-data/ContractService";
import RebateForm from "../rebate-form";

export default async function Page({
  params,
}: {
  params: { lang: string; type: string; id: string };
}) {
  const { languageData } = await getResourceData(params.lang);
  return <RebateForm formType="update" languageData={languageData} />;
}

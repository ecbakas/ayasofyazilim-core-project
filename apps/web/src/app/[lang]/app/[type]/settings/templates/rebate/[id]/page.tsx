"use server";
import { notFound } from "next/navigation";
import { getResourceData } from "src/language-data/ContractService";
import { getRebateTableHeadersByIdApi } from "src/app/[lang]/app/actions/ContractService/action";
import RebateForm from "../rebate-form";

export default async function Page({
  params,
}: {
  params: { lang: string; type: string; id: string };
}) {
  const { languageData } = await getResourceData(params.lang);
  const details = await getRebateTableHeadersByIdApi(params.id);
  if (details.type !== "success") return notFound();

  return (
    <RebateForm
      formData={details.data}
      formType="update"
      id={params.id}
      languageData={languageData}
    />
  );
}

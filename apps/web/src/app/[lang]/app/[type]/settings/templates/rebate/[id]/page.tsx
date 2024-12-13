"use server";
import { notFound } from "next/navigation";
import { getResourceData } from "src/language-data/ContractService";
import { getRebateTableHeadersByIdApi } from "src/app/[lang]/app/actions/ContractService/action";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
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
    <PagePolicy
      lang={params.lang}
      requiredPolicies={[
        "ContractService.RebateTableDetail.Create",
        "ContractService.RebateTableDetail.Edit",
        "ContractService.RebateTableDetail.Delete",
        "ContractService.RebateTableHeader.Create",
        "ContractService.RebateTableHeader.Edit",
        "ContractService.RebateTableHeader.Delete",
      ]}
    >
      <RebateForm
        formData={details.data}
        formType="update"
        id={params.id}
        languageData={languageData}
      />
    </PagePolicy>
  );
}

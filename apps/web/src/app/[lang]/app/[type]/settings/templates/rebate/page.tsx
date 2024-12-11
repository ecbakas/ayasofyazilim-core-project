import { notFound } from "next/navigation";
import { getResourceData } from "src/language-data/ContractService";
import { getRebateTableHeadersApi } from "src/app/[lang]/app/actions/ContractService/action";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import RebateTable from "./table";

export default async function Page({
  params,
}: {
  params: { lang: string; type: string };
}) {
  const { languageData } = await getResourceData(params.lang);
  const templates = await getRebateTableHeadersApi({});
  if (templates.type !== "success") return notFound();
  return (
    <PagePolicy
      requiredPolicies={[
        "ContractService.RebateTableHeader",
        "ContractService.RebateTableDetail",
      ]}
    >
      <RebateTable
        lang={params.lang}
        languageData={languageData}
        templates={templates.data}
      />
    </PagePolicy>
  );
}

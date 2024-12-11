"use server";

import type { GetApiContractServiceRefundTablesRefundTableHeadersData } from "@ayasofyazilim/saas/ContractService";
import { notFound } from "next/navigation";
import { getResourceData } from "src/language-data/ContractService";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import { getRefundTableHeadersApi } from "../../../../actions/ContractService/action";
import RefundTable from "./table";

export default async function Page(props: {
  params: { lang: string };
  searchParams: Promise<GetApiContractServiceRefundTablesRefundTableHeadersData>;
}) {
  const searchParams = await props.searchParams;
  const response = await getRefundTableHeadersApi(searchParams);
  if (response.type !== "success") return notFound();

  const { languageData } = await getResourceData(props.params.lang);

  return (
    <PagePolicy
      requiredPolicies={[
        "ContractService.RefundTableHeader",
        "ContractService.RefundTableDetail",
      ]}
    >
      <RefundTable
        languageData={languageData}
        locale={props.params.lang}
        response={response.data}
      />
    </PagePolicy>
  );
}

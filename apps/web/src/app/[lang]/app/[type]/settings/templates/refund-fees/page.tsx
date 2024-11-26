"use server";

import type { GetApiContractServiceRefundTablesRefundFeeHeadersData } from "@ayasofyazilim/saas/ContractService";
import { notFound } from "next/navigation";
import { getResourceData } from "src/language-data/ContractService";
import { getRefundTableFeeHeadersApi } from "../../../../actions/ContractService/action";
import Table from "./table";

export default async function Page(props: {
  params: { lang: string };
  searchParams: Promise<GetApiContractServiceRefundTablesRefundFeeHeadersData>;
}) {
  const searchParams = await props.searchParams;
  const response = await getRefundTableFeeHeadersApi(searchParams);
  if (response.type !== "success") return notFound();

  const { languageData } = await getResourceData(props.params.lang);

  return (
    <Table
      languageData={languageData}
      locale={props.params.lang}
      response={response.data}
    />
  );
}

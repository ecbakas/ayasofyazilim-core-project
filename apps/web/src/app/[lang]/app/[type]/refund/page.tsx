"use server";

import type { GetApiRefundServiceRefundsData } from "@ayasofyazilim/saas/RefundService";
import { notFound } from "next/navigation";
import { getResourceData } from "src/language-data/ContractService";
import { getRefundApi } from "../../actions/RefundService/actions";
import RefundTable from "./table";

export default async function Page(props: {
  params: { lang: string };
  searchParams?: Promise<GetApiRefundServiceRefundsData>;
}) {
  const searchParams = await props.searchParams;
  const response = await getRefundApi(searchParams);
  if (response.type !== "success") return notFound();

  const { languageData } = await getResourceData(props.params.lang);

  return (
    <RefundTable
      languageData={languageData}
      locale={props.params.lang}
      response={response.data}
    />
  );
}

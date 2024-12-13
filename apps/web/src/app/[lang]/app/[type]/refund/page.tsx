"use server";

import type { GetApiRefundServiceRefundsData } from "@ayasofyazilim/saas/RefundService";
import { isUnauthorized } from "src/app/[lang]/page-policy/page-policy";
import { isErrorOnRequest } from "src/app/[lang]/page-policy/utils";
import { getResourceData } from "src/language-data/ContractService";
import { getRefundApi } from "../../actions/RefundService/actions";
import RefundTable from "./table";

export default async function Page(props: {
  params: { lang: string };
  searchParams?: Promise<GetApiRefundServiceRefundsData>;
}) {
  const unauthorized = isUnauthorized({
    requiredPolicies: ["RefundService.Refunds"],
    lang: props.params.lang,
  });
  if (await unauthorized) {
    return;
  }

  const searchParams = await props.searchParams;

  const response = await getRefundApi(searchParams);
  if (isErrorOnRequest(response, props.params.lang)) return;

  const { languageData } = await getResourceData(props.params.lang);

  return (
    <RefundTable
      languageData={languageData}
      locale={props.params.lang}
      response={response.data}
    />
  );
}

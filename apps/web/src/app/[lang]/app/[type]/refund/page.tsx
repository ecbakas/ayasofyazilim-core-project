"use server";

import type { GetApiRefundServiceRefundsData } from "@ayasofyazilim/saas/RefundService";
import { notFound } from "next/navigation";
import { getRefundApi } from "../../actions/RefundService/actions";
import RefundTable from "./table";

export default async function Page(props: {
  searchParams?: Promise<GetApiRefundServiceRefundsData>;
}) {
  const searchParams = await props.searchParams;
  const response = await getRefundApi(searchParams);
  if (response.type !== "success") return notFound();

  return <RefundTable response={response.data} />;
}

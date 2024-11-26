"use server";

import type { PostApiContractServiceRefundTablesRefundTableHeadersData } from "@ayasofyazilim/saas/ContractService";
import { structuredError } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function postRefundTableHeadersApi(
  data: PostApiContractServiceRefundTablesRefundTableHeadersData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success" as const,
      data: requests.templates.postRefundTableHeaders(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}

"use server";

import type { PostApiContractServiceRefundTablesRefundTableHeadersData } from "@ayasofyazilim/saas/ContractService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function postRefundTableHeadersApi(
  data: PostApiContractServiceRefundTablesRefundTableHeadersData,
) {
  try {
    const requests = await getApiRequests();
    const response = await requests.templates.postRefundTableHeaders(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

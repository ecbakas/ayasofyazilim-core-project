"use server";
import type { PutApiContractServiceRefundTablesRefundTableHeadersByIdData } from "@ayasofyazilim/saas/ContractService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function putRefundTableHeadersApi(
  data: PutApiContractServiceRefundTablesRefundTableHeadersByIdData,
) {
  try {
    const requests = await getApiRequests();
    const response = await requests.templates.putRefundTableHeaders(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

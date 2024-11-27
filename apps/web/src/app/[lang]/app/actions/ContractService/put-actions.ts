"use server";
import { PutApiContractServiceRefundTablesRefundTableHeadersByIdData } from "@ayasofyazilim/saas/ContractService";
import { getApiRequests } from "../api-requests";
import { structuredError, structuredResponse } from "src/lib";

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

"use server";
import type {
  PutApiContractServiceRebateTablesRebateTableHeadersByIdData,
  PutApiContractServiceRefundTablesRefundFeeHeadersByIdData,
  PutApiContractServiceRefundTablesRefundTableHeadersByIdData,
} from "@ayasofyazilim/saas/ContractService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function putRebateTableHeadersApi(
  data: PutApiContractServiceRebateTablesRebateTableHeadersByIdData,
) {
  try {
    const requests = await getApiRequests();
    const response = await requests.templates.putRebateTableHeaders(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

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
export async function putRefundFeeHeadersApi(
  data: PutApiContractServiceRefundTablesRefundFeeHeadersByIdData,
) {
  try {
    const requests = await getApiRequests();
    const response = await requests.templates.putRefundFeeHeadersApi(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

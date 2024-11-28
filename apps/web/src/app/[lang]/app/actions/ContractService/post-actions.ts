"use server";

import type {
  PostApiContractServiceRebateTablesRebateTableHeadersTemplatesData,
  PostApiContractServiceRefundTablesRefundFeeHeadersByIdRefundFeeDetailsData,
  PostApiContractServiceRefundTablesRefundFeeHeadersData,
  PostApiContractServiceRefundTablesRefundTableHeadersByIdRefundTableDetailsData,
  PostApiContractServiceRefundTablesRefundTableHeadersData,
} from "@ayasofyazilim/saas/ContractService";
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
export async function postRefundTableHeadersRefundTableDetailsApi(
  data: PostApiContractServiceRefundTablesRefundTableHeadersByIdRefundTableDetailsData,
) {
  try {
    const requests = await getApiRequests();
    const response =
      await requests.templates.postRefundTableHeadersRefundTableDetails(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function postRebateTableHeadersApi(
  data: PostApiContractServiceRebateTablesRebateTableHeadersTemplatesData,
) {
  try {
    const requests = await getApiRequests();
    const response = await requests.templates.postRebateTableHeaders(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function postRefundFeeHeadersApi(
  data: PostApiContractServiceRefundTablesRefundFeeHeadersData,
) {
  try {
    const requests = await getApiRequests();
    const response = await requests.templates.postRefundFeeHeaders(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function postRefundFeeHeadersRefundFeeDetailsApi(
  data: PostApiContractServiceRefundTablesRefundFeeHeadersByIdRefundFeeDetailsData,
) {
  try {
    const requests = await getApiRequests();
    const response =
      await requests.templates.postRefundFeeHeadersRefundTableDetails(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

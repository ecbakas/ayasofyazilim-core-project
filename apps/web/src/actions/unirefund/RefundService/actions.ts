"use server";
import type { GetApiRefundServiceRefundsData } from "@ayasofyazilim/saas/RefundService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../../api-requests";

export async function getRefundApi(data: GetApiRefundServiceRefundsData = {}) {
  try {
    const requests = await getApiRequests();
    const response = await requests.refund.get(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

"use server";
import type { PostApiFinanceServiceBillingsData } from "@ayasofyazilim/saas/FinanceService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../../api-requests";

export async function postBillingApi(data: PostApiFinanceServiceBillingsData) {
  try {
    const requests = await getApiRequests();
    const dataResponse = await requests.billing.post(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

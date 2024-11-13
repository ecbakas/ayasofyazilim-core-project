"use server";
import type { GetApiFinanceServiceBillingsData } from "@ayasofyazilim/saas/FinanceService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function getBillingApi(data: GetApiFinanceServiceBillingsData) {
  try {
    const requests = await getApiRequests();
    const dataResponse = await requests.billing.get(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

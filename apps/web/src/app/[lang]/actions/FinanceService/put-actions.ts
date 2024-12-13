"use server";
import type { PutApiFinanceServiceBillingsByIdData } from "@ayasofyazilim/saas/FinanceService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function putBillingApi(
  data: PutApiFinanceServiceBillingsByIdData,
) {
  try {
    const requests = await getApiRequests();
    const dataResponse = await requests.billing.put(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

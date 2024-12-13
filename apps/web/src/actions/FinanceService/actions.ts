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
export async function getBillingDetailApi(id: string) {
  try {
    const requests = await getApiRequests();
    const dataResponse = await requests.billing.getDetail(id);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function deleteBillingApi(id: string) {
  try {
    const requests = await getApiRequests();
    const dataResponse = await requests.billing.deleteRow(id);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

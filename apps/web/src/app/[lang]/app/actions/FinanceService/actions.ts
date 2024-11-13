"use server";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function getBillingDetailApi(id: string) {
  try {
    const requests = await getApiRequests();
    const dataResponse = await requests.billing.getDetail(id);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

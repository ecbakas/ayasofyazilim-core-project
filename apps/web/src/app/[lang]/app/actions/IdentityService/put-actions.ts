"use server";
import type { PutApiOpeniddictApplicationsByIdTokenLifetimeData } from "@ayasofyazilim/saas/IdentityService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function putApplicationTokenLifetimeApi(
  data: PutApiOpeniddictApplicationsByIdTokenLifetimeData,
) {
  try {
    const requests = await getApiRequests();
    const dataResponse = await requests.applications.putTokenLifetime(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

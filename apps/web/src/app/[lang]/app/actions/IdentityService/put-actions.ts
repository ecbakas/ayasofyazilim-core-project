"use server";
import type {
  PutApiIdentityUsersByIdChangePasswordData,
  PutApiIdentityUsersByIdTwoFactorByEnabledData,
  PutApiOpeniddictApplicationsByIdTokenLifetimeData,
} from "@ayasofyazilim/saas/IdentityService";
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

export async function putUserChangePasswordApi(
  data: PutApiIdentityUsersByIdChangePasswordData,
) {
  try {
    const requests = await getApiRequests();
    const dataResponse = await requests.users["change-password"](data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function putUserTwoFactorApi(
  data: PutApiIdentityUsersByIdTwoFactorByEnabledData,
) {
  try {
    const requests = await getApiRequests();
    const dataResponse = await requests.users["two-factor-enable"](data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

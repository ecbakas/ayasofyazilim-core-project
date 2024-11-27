"use server";
import type { PutApiPermissionManagementPermissionsData } from "@ayasofyazilim/saas/AdministrationService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function putPermissionsApi(
  data: PutApiPermissionManagementPermissionsData,
) {
  try {
    const requests = await getApiRequests();
    const dataResponse = await requests.permissions.putPermissions(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

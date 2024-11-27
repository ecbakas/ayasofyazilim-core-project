"use server";
import type { GetApiPermissionManagementPermissionsData } from "@ayasofyazilim/saas/AdministrationService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function getPermissionsApi(
  data: GetApiPermissionManagementPermissionsData,
) {
  try {
    const requests = await getApiRequests();
    const dataResponse = await requests.permissions.getPermissions(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

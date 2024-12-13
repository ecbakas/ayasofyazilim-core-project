"use server";
import type {
  PutApiPermissionManagementPermissionsData,
  UniRefund_AdministrationService_CountrySettings_SetCountrySettingsByListDto,
} from "@ayasofyazilim/saas/AdministrationService";
import {
  getAdministrationServiceClient,
  structuredError,
  structuredResponse,
} from "src/lib";
import { getApiRequests } from "../../api-requests";

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
export async function putCountrySettingsApi(
  data: UniRefund_AdministrationService_CountrySettings_SetCountrySettingsByListDto,
) {
  try {
    const client = await getAdministrationServiceClient();
    const dataResponse =
      await client.countrySetting.putApiAdministrationServiceCountrySettingsSetValues(
        {
          requestBody: data,
        },
      );
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

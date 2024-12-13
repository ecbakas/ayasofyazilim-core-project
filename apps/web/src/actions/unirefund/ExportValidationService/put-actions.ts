"use server";
import type { PutApiExportValidationServiceExportValidationByIdData } from "@ayasofyazilim/saas/ExportValidationService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../../api-requests";

export async function putExportValidationApi(
  data: PutApiExportValidationServiceExportValidationByIdData,
) {
  try {
    const requests = await getApiRequests();
    const response = await requests["export-validation"].put(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

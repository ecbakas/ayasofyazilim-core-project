"use server";
import type { PostApiExportValidationServiceExportValidationData } from "@ayasofyazilim/saas/ExportValidationService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function postExportValidationApi(
  data: PostApiExportValidationServiceExportValidationData,
) {
  try {
    const requests = await getApiRequests();
    const response = await requests["export-validation"].post(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

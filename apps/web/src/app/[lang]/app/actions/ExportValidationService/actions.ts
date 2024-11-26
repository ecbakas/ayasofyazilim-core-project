"use server";
import type { GetApiExportValidationServiceExportValidationData } from "@ayasofyazilim/saas/ExportValidationService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function getExportValidationApi(
  data: GetApiExportValidationServiceExportValidationData = {},
) {
  try {
    const requests = await getApiRequests();
    const response = await requests["export-validation"].get(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function getExportValidationDetailApi(id: string) {
  try {
    const requests = await getApiRequests();
    const response = await requests["export-validation"].getDetail(id);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function deleteExportValidationApi(id: string) {
  try {
    const requests = await getApiRequests();
    const response = await requests["export-validation"].deleteRow(id);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

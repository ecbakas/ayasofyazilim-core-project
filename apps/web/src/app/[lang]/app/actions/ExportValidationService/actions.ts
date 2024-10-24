"use server";
import type { GetApiExportValidationServiceExportValidationData } from "@ayasofyazilim/saas/ExportValidationService";
import { structuredError } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function getExportValidationApi(
  data: GetApiExportValidationServiceExportValidationData = {},
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests["export-validation"].get(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}

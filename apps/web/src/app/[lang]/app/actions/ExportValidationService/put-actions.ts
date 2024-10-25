"use server";
import type { PutApiExportValidationServiceExportValidationByIdData } from "@ayasofyazilim/saas/ExportValidationService";
import { structuredError } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function putExportValidationApi(
  data: PutApiExportValidationServiceExportValidationByIdData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: requests["export-validation"].put(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}

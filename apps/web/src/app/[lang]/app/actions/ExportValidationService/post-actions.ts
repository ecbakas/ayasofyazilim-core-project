"use server";
import type { PostApiExportValidationServiceExportValidationData } from "@ayasofyazilim/saas/ExportValidationService";
import { structuredError } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function postExportValidationApi(
  data: PostApiExportValidationServiceExportValidationData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: requests["export-validation"].post(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}

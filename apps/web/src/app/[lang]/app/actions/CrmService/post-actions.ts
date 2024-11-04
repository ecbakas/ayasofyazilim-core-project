"use server";

import type { PostApiCrmServiceMerchantsByIdAffiliationsData } from "@ayasofyazilim/saas/CRMService";
import { structuredError } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function postAffiliationsApi(
  partyType:
    | "merchants"
    | "refund-points"
    | "customs"
    | "tax-free"
    | "tax-offices",
  data: PostApiCrmServiceMerchantsByIdAffiliationsData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success" as const,
      data: requests[partyType].postAffiliations(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}

"use server";

import type {
  PutApiCrmServiceMerchantsByIdAddressesByAddressIdData,
  PutApiCrmServiceMerchantsByIdData,
  PutApiCrmServiceMerchantsByIdEmailsByEmailIdData,
  PutApiCrmServiceMerchantsByIdOrganizationsByOrganizationIdData,
  PutApiCrmServiceMerchantsByIdTelephonesByTelephoneIdData,
} from "@ayasofyazilim/saas/CRMService";
import { structuredError } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function putMerchantBaseApi(
  data: PutApiCrmServiceMerchantsByIdData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success" as const,
      data: await requests.merchants.putMerchantBase(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function putCrmAddressApi(
  partyName:
    | "merchants"
    | "refund-points"
    | "customs"
    | "tax-offices"
    | "tax-free",
  data: PutApiCrmServiceMerchantsByIdAddressesByAddressIdData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success" as const,
      data: await requests[partyName].putAddress(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function putCrmEmailAddressApi(
  partyName:
    | "merchants"
    | "refund-points"
    | "customs"
    | "tax-offices"
    | "tax-free",
  data: PutApiCrmServiceMerchantsByIdEmailsByEmailIdData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success" as const,
      data: await requests[partyName].putEmailAddress(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function putCrmTelephoneApi(
  partyName:
    | "merchants"
    | "refund-points"
    | "customs"
    | "tax-offices"
    | "tax-free",
  data: PutApiCrmServiceMerchantsByIdTelephonesByTelephoneIdData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success" as const,
      data: await requests[partyName].putTelephone(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function putCrmOrganizationApi(
  partyName:
    | "merchants"
    | "refund-points"
    | "customs"
    | "tax-offices"
    | "tax-free",
  data: PutApiCrmServiceMerchantsByIdOrganizationsByOrganizationIdData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success" as const,
      data: await requests[partyName].putOrganization(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}

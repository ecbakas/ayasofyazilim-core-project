import type { ApiError } from "@ayasofyazilim/saas/AccountService";
import { AccountServiceClient } from "@ayasofyazilim/saas/AccountService";
import { AdministrationServiceClient } from "@ayasofyazilim/saas/AdministrationService";
import { BackerServiceClient } from "@ayasofyazilim/saas/BackerService";
import { CRMServiceClient } from "@ayasofyazilim/saas/CRMService";
import { IdentityServiceClient } from "@ayasofyazilim/saas/IdentityService";
import { ProjectServiceClient } from "@ayasofyazilim/saas/ProjectService";
import { SaasServiceClient } from "@ayasofyazilim/saas/SaasService";
import { SettingServiceClient } from "@ayasofyazilim/saas/SettingService";
import { ContractServiceClient } from "@ayasofyazilim/saas/ContractService";
import { TravellerServiceClient } from "@ayasofyazilim/saas/TravellerService";
import { TagServiceClient } from "@ayasofyazilim/saas/TagService";
import { LocationServiceClient } from "@ayasofyazilim/saas/LocationService";
import { ExportValidationServiceClient } from "@ayasofyazilim/saas/ExportValidationService";
import { FinanceServiceClient } from "@ayasofyazilim/saas/FinanceService";
import { RefundServiceClient } from "@ayasofyazilim/saas/RefundService";
import type { Session } from "next-auth";
import { auth } from "auth";
import { isApiError } from "./app/api/util";

const HEADERS = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json",
};
export async function getIdentityServiceClient(session?: Session | null) {
  const token = session?.access_token || (await auth())?.access_token; // will be removed in future
  return new IdentityServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getAccountServiceClient(
  customHeaders?: Record<string, string>,
  session?: Session | null,
) {
  const token = session?.access_token || (await auth())?.access_token; // will be removed in future
  return new AccountServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS: { ...HEADERS, ...customHeaders },
  });
}

export async function getProjectServiceClient(session?: Session | null) {
  const token = session?.access_token || (await auth())?.access_token; // will be removed in future
  return new ProjectServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL ?? "",
    HEADERS,
  });
}

export async function getSaasServiceClient(session?: Session | null) {
  const token = session?.access_token || (await auth())?.access_token; // will be removed in future
  return new SaasServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getSettingServiceClient(
  session?: Session | null,
): Promise<SettingServiceClient> {
  const token = session?.access_token || (await auth())?.access_token; // will be removed in future
  return new SettingServiceClient({
    BASE: process.env.BASE_URL,
    TOKEN: token,
    HEADERS,
  });
}

export async function getContractServiceClient(
  session?: Session | null,
): Promise<ContractServiceClient> {
  const token = session?.access_token || (await auth())?.access_token; // will be removed in future
  return new ContractServiceClient({
    BASE: process.env.BASE_URL,
    TOKEN: token,
    HEADERS,
  });
}

export async function getAdministrationServiceClient(session?: Session | null) {
  const token = session?.access_token || (await auth())?.access_token; // will be removed in future
  return new AdministrationServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getBackerServiceClient(
  session?: Session | null,
): Promise<BackerServiceClient> {
  const token = session?.access_token || (await auth())?.access_token; // will be removed in future
  return new BackerServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getCRMServiceClient(
  session?: Session | null,
): Promise<CRMServiceClient> {
  const token = session?.access_token || (await auth())?.access_token; // will be removed in future
  return new CRMServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getTravellersServiceClient(session?: Session | null) {
  const token = session?.access_token || (await auth())?.access_token; // will be removed in future
  return new TravellerServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getTagServiceClient(session?: Session | null) {
  const token = session?.access_token || (await auth())?.access_token; // will be removed in future
  return new TagServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getLocationServiceClient(session?: Session | null) {
  const token = session?.access_token || (await auth())?.access_token; // will be removed in future
  return new LocationServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getExportValidationServiceClient(
  session?: Session | null,
) {
  const token = session?.access_token || (await auth())?.access_token; // will be removed in future
  return new ExportValidationServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getFinanceServiceClient(session?: Session | null) {
  const token = session?.access_token || (await auth())?.access_token; // will be removed in future
  return new FinanceServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getRefundServiceClient(session?: Session | null) {
  const token = session?.access_token || (await auth())?.access_token; // will be removed in future
  return new RefundServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export type ServerResponse<T = undefined> = BaseServerResponse &
  (ErrorTypes | SuccessServerResponse<T>);

export type ErrorTypes = BaseServerResponse &
  (ErrorServerResponse | ApiErrorServerResponse);

export interface BaseServerResponse {
  status: number;
  message: string;
}

export interface SuccessServerResponse<T> {
  type: "success";
  data: T;
}
export interface ApiErrorServerResponse {
  type: "api-error";
  data: ApiError["message"];
}
export interface ErrorServerResponse {
  type: "error";
  data: unknown;
}

export function structuredError(error: unknown): ErrorTypes {
  if (isApiError(error)) {
    const body = error.body as
      | {
          error: { message?: string; details?: string };
        }
      | undefined;
    const errorDetails = body?.error || {};
    return {
      type: "api-error",
      data: errorDetails.message || error.statusText || "Something went wrong",
      status: error.status,
      message:
        errorDetails.details ||
        errorDetails.message ||
        error.statusText ||
        "Something went wrong",
    };
  }
  return {
    type: "error",
    data: error,
    status: 500,
    message: "An error occurred",
  };
}

export interface PagedResult<T> {
  items?: T[] | null;
  totalCount: number;
}

export function structuredResponse<T>(data: T): ServerResponse<T> {
  return {
    type: "success",
    data,
    status: 200,
    message: "",
  };
}

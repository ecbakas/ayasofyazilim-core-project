"use server";
import type {
  GetApiContractServiceMerchantsByIdContractsContractHeadersData,
  PostApiContractServiceMerchantsByIdContractsContractHeadersData,
} from "@ayasofyazilim/saas/ContractService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function getMerchantContractHeadersByMerchantIdApi(
  data: GetApiContractServiceMerchantsByIdContractsContractHeadersData,
) {
  try {
    const requests = await getApiRequests();
    const dataResponse =
      await requests.merchants.getContractHeadersByMerchantId(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
export async function getMerchantContractHeaderMissingStepsByIdApi(
  data: GetApiContractServiceMerchantsByIdContractsContractHeadersData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests.merchants.getContractHeaderMissingStepsById(data.id),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function postMerchantContractHeadersByMerchantIdApi(
  data: PostApiContractServiceMerchantsByIdContractsContractHeadersData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests.merchants.postContractHeadersById(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function getMerchantContractHeaderByIdApi(id: string) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests.merchants.getContractHeaderById(id),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}

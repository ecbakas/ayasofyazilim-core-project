"use server";
import type {
  GetApiContractServiceMerchantsByIdContractsContractHeadersData,
  GetApiContractServiceMerchantsContractsContractHeadersByIdContractSettingsData,
  GetApiContractServiceRefundTablesRefundFeeHeadersData,
  GetApiContractServiceRefundTablesRefundTableHeadersData,
  PostApiContractServiceMerchantsByIdContractsContractHeadersData,
  PostApiContractServiceMerchantsContractsContractHeadersByIdContractSettingsData,
  PutApiContractServiceMerchantsContractsContractHeadersByIdSetDefaultSettingData,
  PutApiContractServiceMerchantsContractsContractSettingsByIdData,
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
export async function getMerchantContractHeaderContractSettingsByHeaderIdApi(
  data: GetApiContractServiceMerchantsContractsContractHeadersByIdContractSettingsData,
) {
  try {
    const requests = await getApiRequests();
    return structuredResponse(
      await requests.merchants.getContractHeaderContractSettingsByHeaderId(
        data,
      ),
    );
  } catch (error) {
    return structuredError(error);
  }
}
export async function postMerchantContractHeaderContractSettingsByHeaderIdApi(
  data: PostApiContractServiceMerchantsContractsContractHeadersByIdContractSettingsData,
) {
  try {
    const requests = await getApiRequests();
    return structuredResponse(
      await requests.merchants.postContractHeaderContractSettingsByHeaderId(
        data,
      ),
    );
  } catch (error) {
    return structuredError(error);
  }
}
export async function putMerchantContractContractSettingsByIdApi(
  data: PutApiContractServiceMerchantsContractsContractSettingsByIdData,
) {
  try {
    const requests = await getApiRequests();
    return structuredResponse(
      await requests.merchants.putContractSettingsById(data),
    );
  } catch (error) {
    return structuredError(error);
  }
}
export async function deleteMerchantContractContractSettingsByIdApi(
  id: string,
) {
  try {
    const requests = await getApiRequests();
    return structuredResponse(
      await requests.merchants.deleteContractSettingsById(id),
    );
  } catch (error) {
    return structuredError(error);
  }
}
export async function putMerchantContractContractHeaderSetDefaultContractSettingByHeaderIdApi(
  data: PutApiContractServiceMerchantsContractsContractHeadersByIdSetDefaultSettingData,
) {
  try {
    const requests = await getApiRequests();
    return structuredResponse(
      await requests.merchants.putContractHeaderSetDefaultContractSettingByHeaderId(
        data,
      ),
    );
  } catch (error) {
    return structuredError(error);
  }
}

export async function getRefundTableHeadersApi(
  data: GetApiContractServiceRefundTablesRefundTableHeadersData,
) {
  try {
    const requests = await getApiRequests();
    return structuredResponse(
      await requests.templates.getRefundTableHeaders(data),
    );
  } catch (error) {
    return structuredError(error);
  }
}
export async function getRefundTableFeeHeadersApi(
  data: GetApiContractServiceRefundTablesRefundFeeHeadersData,
) {
  try {
    const requests = await getApiRequests();
    return structuredResponse(
      await requests.templates.getRefundTableFeeHeaders(data),
    );
  } catch (error) {
    return structuredError(error);
  }
}

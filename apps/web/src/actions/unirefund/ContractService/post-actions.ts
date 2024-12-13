"use server";

import type {
  PostApiContractServiceMerchantsContractsContractHeadersByIdContractStoresData,
  PostApiContractServiceMerchantsContractsContractHeadersByIdRebateSettingsData,
  PostApiContractServiceRebateTablesRebateTableHeadersTemplatesData,
  PostApiContractServiceRefundPointsByIdContractsContractHeadersData,
  PostApiContractServiceRefundTablesRefundFeeHeadersByIdRefundFeeDetailsData,
  PostApiContractServiceRefundTablesRefundFeeHeadersData,
  PostApiContractServiceRefundTablesRefundTableHeadersByIdRefundTableDetailsData,
  PostApiContractServiceRefundTablesRefundTableHeadersData,
} from "@ayasofyazilim/saas/ContractService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../../api-requests";

export async function postRefundTableHeadersApi(
  data: PostApiContractServiceRefundTablesRefundTableHeadersData,
) {
  try {
    const requests = await getApiRequests();
    const response = await requests.templates.postRefundTableHeaders(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function postRefundTableHeadersRefundTableDetailsApi(
  data: PostApiContractServiceRefundTablesRefundTableHeadersByIdRefundTableDetailsData,
) {
  try {
    const requests = await getApiRequests();
    const response =
      await requests.templates.postRefundTableHeadersRefundTableDetails(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function postRebateTableHeadersApi(
  data: PostApiContractServiceRebateTablesRebateTableHeadersTemplatesData,
) {
  try {
    const requests = await getApiRequests();
    const response = await requests.templates.postRebateTableHeaders(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function postRefundFeeHeadersApi(
  data: PostApiContractServiceRefundTablesRefundFeeHeadersData,
) {
  try {
    const requests = await getApiRequests();
    const response = await requests.templates.postRefundFeeHeaders(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function postRefundFeeHeadersRefundFeeDetailsApi(
  data: PostApiContractServiceRefundTablesRefundFeeHeadersByIdRefundFeeDetailsData,
) {
  try {
    const requests = await getApiRequests();
    const response =
      await requests.templates.postRefundFeeHeadersRefundTableDetails(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function postMerchantContractHeaderRebateSettingByHeaderIdApi(
  data: PostApiContractServiceMerchantsContractsContractHeadersByIdRebateSettingsData,
) {
  try {
    const requests = await getApiRequests();
    return structuredResponse(
      await requests.merchants.postContractHeaderRebateSettingByHeaderId(data),
    );
  } catch (error) {
    return structuredError(error);
  }
}

export async function postMerchantContractHeaderValidateByHeaderIdApi(
  id: string,
) {
  try {
    const requests = await getApiRequests();
    return structuredResponse(
      await requests.merchants.postContractHeaderValidateByHeaderId(id),
    );
  } catch (error) {
    return structuredError(error);
  }
}

export async function postMerchantContractHeaderContractStoresByHeaderIdApi(
  data: PostApiContractServiceMerchantsContractsContractHeadersByIdContractStoresData,
) {
  try {
    const requests = await getApiRequests();
    return structuredResponse(
      await requests.merchants.postContractHeadersContractStoresByHeaderId(
        data,
      ),
    );
  } catch (error) {
    return structuredError(error);
  }
}

export async function postRefundPointContractHeadersById(
  data: PostApiContractServiceRefundPointsByIdContractsContractHeadersData,
) {
  try {
    const requests = await getApiRequests();
    return structuredResponse(
      await requests["refund-points"].postContractHeadersById(data),
    );
  } catch (error) {
    return structuredError(error);
  }
}
export async function postRefundPointContractHeaderValidateByHeaderId(
  id: string,
) {
  try {
    const requests = await getApiRequests();
    return structuredResponse(
      await requests["refund-points"].postContractHeaderValidateByHeaderId(id),
    );
  } catch (error) {
    return structuredError(error);
  }
}

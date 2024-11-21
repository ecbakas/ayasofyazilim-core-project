"use server";

import type { FilterColumnResult } from "@repo/ayasofyazilim-ui/molecules/tables/types";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests, getTableData } from "../api-requests";

export async function getTravellers(page: number, filter?: FilterColumnResult) {
  const response = await getTableData("travellers", page, 10, filter);
  if (response.type === "success") {
    const data = response.data;
    return {
      type: "success",
      data: { items: data.items || [], totalCount: data.totalCount || 0 },
    };
  }
  return {
    type: response.type,
    data: { items: [], totalCount: 0 },
  };
}

export async function getTravellersDetailsApi(id: string) {
  try {
    const requests = await getApiRequests();
    const dataResponse = await requests.travellers.getDetail(id);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function deleteTravellerPersonalIdentificationApi(id: string) {
  try {
    const requests = await getApiRequests();
    const dataResponse =
      await requests.travellers.deleteTravellerPersonalIdentification(id);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

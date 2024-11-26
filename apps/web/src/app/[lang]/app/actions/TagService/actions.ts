"use server";
import type { GetApiTagServiceTagData } from "@ayasofyazilim/saas/TagService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function getTagsApi(data: GetApiTagServiceTagData = {}) {
  try {
    const requests = await getApiRequests();
    const response = await requests.tags.get(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

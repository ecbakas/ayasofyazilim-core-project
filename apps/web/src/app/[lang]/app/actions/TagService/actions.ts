"use server";
import type { GetApiTagServiceTagData } from "@ayasofyazilim/saas/TagService";
import { structuredError } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function getTagsApi(data: GetApiTagServiceTagData = {}) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests.tags.get(data),
    };
  } catch (error) {
    return structuredError(error);
  }
}

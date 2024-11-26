"use server";
import type { PostApiTravellerServiceTravellersData } from "@ayasofyazilim/saas/TravellerService";
import { structuredError, structuredResponse } from "../../../../../lib";
import { getApiRequests } from "../api-requests";

export async function postTravellerApi(
  data: PostApiTravellerServiceTravellersData,
) {
  try {
    const client = await getApiRequests();
    const response = await client.travellers.post(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

"use server";
import type { PostApiTravellerServiceTravellersData } from "@ayasofyazilim/saas/TravellerService";
import { structuredError } from "../../../../../lib";
import { getApiRequests } from "../api-requests";

export async function postTravellerApi(
  data: PostApiTravellerServiceTravellersData,
) {
  try {
    const client = await getApiRequests();
    const response = await client.travellers.post(data);
    return {
      type: "success",
      data: response,
      status: 200,
      message: "Traveller created successfully",
    };
  } catch (error) {
    return structuredError(error);
  }
}

import type { PostApiTravellerServiceTravellersWithComponentsData } from "@ayasofyazilim/saas/TravellerService";
import { getApiRequests } from "../api-requests";
import { structuredError } from "../../../../../lib";

export async function postTravellerApi(
  data: PostApiTravellerServiceTravellersWithComponentsData,
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

"use server";

import type {
  PostApiTravellerServiceTravellersWithComponentsData,
  UniRefund_TravellerService_Travellers_CreateTravellerResponseDto,
} from "@ayasofyazilim/saas/TravellerService";
import { FilterColumnResult } from "@repo/ayasofyazilim-ui/molecules/tables";
import type { ErrorTypes, ServerResponse } from "src/lib";
import { getTravellersServiceClient, structuredError } from "src/lib";
import { getTableData } from "../../../actions/api-requests";

export async function createTravellerWithComponents(
  body: PostApiTravellerServiceTravellersWithComponentsData,
): Promise<
  | ServerResponse<UniRefund_TravellerService_Travellers_CreateTravellerResponseDto>
  | ErrorTypes
> {
  try {
    const client = await getTravellersServiceClient();
    const response =
      await client.traveller.postApiTravellerServiceTravellersWithComponents(
        body,
      );
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


export async function getTravellers (page: number, filter?: FilterColumnResult) {
  const response = await getTableData("travellers", page, 10, filter);
  if (response.type === "success") {
    const data = response.data;
    return {
      type: "success",
      data: { items: data.items || [], totalCount: data.totalCount || 0 },
    };
  }
  return {
    type: "success",
    data: { items: [], totalCount: 0 },
  };
}
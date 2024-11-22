"use server";
import type {
  PutApiTravellerServiceTravellersByIdUpsertPersonalIdentificationData,
  PutApiTravellerServiceTravellersByIdUpsertPersonalPreferenceData,
  PutApiTravellerServiceTravellersByIdUpsertPersonalSummaryData,
} from "@ayasofyazilim/saas/TravellerService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function putTravellerPersonalIdentificationApi(
  data: PutApiTravellerServiceTravellersByIdUpsertPersonalIdentificationData,
) {
  try {
    const requests = await getApiRequests();
    const dataResponse =
      await requests.travellers.putPersonalIdentification(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function putTravellerPersonalPreferenceApi(
  data: PutApiTravellerServiceTravellersByIdUpsertPersonalPreferenceData,
) {
  try {
    const requests = await getApiRequests();
    const dataResponse = await requests.travellers.putPersonalPreference(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function putTravellerPersonalSummaryApi(
  data: PutApiTravellerServiceTravellersByIdUpsertPersonalSummaryData,
) {
  try {
    const requests = await getApiRequests();
    const dataResponse = await requests.travellers.putPersonalSummary(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

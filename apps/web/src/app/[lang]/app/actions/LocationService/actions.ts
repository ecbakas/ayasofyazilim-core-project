"use server";

import type {
  GetApiLocationServiceCitiesData,
  GetApiLocationServiceCitiesGetListByRegionByRegionIdData,
  GetApiLocationServiceCountriesData,
  GetApiLocationServiceRegionsGetListByCountryByCountryIdData,
} from "@ayasofyazilim/saas/LocationService";
import { structuredError } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function getCountriesApi(
  data: GetApiLocationServiceCountriesData = { maxResultCount: 250 },
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests.locations.getCountries(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function getRegionsByCountryIdApi(
  data: GetApiLocationServiceRegionsGetListByCountryByCountryIdData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests.locations.getRegionsByCountryId(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function getDefaultRegionsByCountryIdApi(
  data: GetApiLocationServiceRegionsGetListByCountryByCountryIdData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests.locations.getDefaultRegionsByCountryId(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function getCitiesByRegionId(
  data: GetApiLocationServiceCitiesGetListByRegionByRegionIdData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests.locations.getCitiesByRegionId(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function getCitiesApi(data: GetApiLocationServiceCitiesData = {}) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests.locations.getCities(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}

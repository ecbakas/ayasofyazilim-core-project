"use server";

import type { GetApiTravellerServiceTravellersData } from "@ayasofyazilim/saas/TravellerService";
import type { ColumnFilter } from "@repo/ayasofyazilim-ui/molecules/tables/types";
import { getResourceData } from "src/language-data/TravellerService";
import { getTravellerFilters } from "./utils";

export type DetailedFilterTraveller = ColumnFilter & {
  name: keyof GetApiTravellerServiceTravellersData;
};

export async function getTravellerFiltersServer(lang: string) {
  const { languageData } = await getResourceData(lang);
  return getTravellerFilters(languageData);
}

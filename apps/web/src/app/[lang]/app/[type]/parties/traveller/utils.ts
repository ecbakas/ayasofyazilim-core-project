import { $UniRefund_TravellerService_Travellers_TravellerListProfileDto } from "@ayasofyazilim/saas/TravellerService";
import type { TravellerServiceResource } from "src/language-data/TravellerService";
import { getResourceDataClient } from "src/language-data/TravellerService";
import type { DetailedFilterTraveller } from "./utils.server";

export type TravllersKeys =
  keyof typeof $UniRefund_TravellerService_Travellers_TravellerListProfileDto.properties;
const travellerKeys: TravllersKeys[] = [
  "id",
  "userAccountId",
  "residenceCountryCode2",
  "nationalityCountryCode2",
];

export const travellerTableSchema: {
  excludeList: TravllersKeys[];
  schema: typeof $UniRefund_TravellerService_Travellers_TravellerListProfileDto;
} = {
  excludeList: travellerKeys,
  schema: $UniRefund_TravellerService_Travellers_TravellerListProfileDto,
};

export function getTravellerFilterClient(lang: string) {
  const languageData = getResourceDataClient(lang);
  return getTravellerFilters(languageData);
}

export function getTravellerFilters(
  languageData: TravellerServiceResource,
): DetailedFilterTraveller[] {
  const filters: DetailedFilterTraveller[] = [
    {
      name: "showExpired",
      displayName: languageData["Travellers.ShowExpired"],
      type: "boolean",
      value: "",
    },
    {
      name: "fullName",
      displayName: languageData.FullName,
      type: "string",
      value: "",
    },
    {
      name: "fullName",
      displayName: languageData.FirstName,
      type: "string",
      value: "",
    },
    {
      name: "fullName",
      displayName: languageData.LastName,
      type: "string",
      value: "",
    },
    {
      name: "travelDocumentNumber",
      displayName: languageData["Travellers.TravelDocumentNumber"],
      type: "string",
      value: "",
    },
    {
      name: "username",
      displayName: languageData.UserName,
      type: "string",
      value: "",
    },
    {
      name: "phoneNumber",
      displayName: languageData.PhoneNumber,
      type: "string",
      value: "",
    },
  ];

  return filters;
}

import { $UniRefund_TravellerService_Travellers_TravellerListProfileDto } from "@ayasofyazilim/saas/TravellerService";
import type { TravellerServiceResource } from "src/language-data/TravellerService";
import { getResourceDataClient } from "src/language-data/TravellerService";
import { getCountriesApi } from "../../../actions/LocationService/actions";
import type { DetailedFilterTraveller } from "./utils.server";

export type TravllersKeys =
  keyof typeof $UniRefund_TravellerService_Travellers_TravellerListProfileDto.properties;
const travellerKeys: TravllersKeys[] = [
  "id",
  "userAccountId",
  "firstName",
  "middleName",
  "lastName",
  "residenceCountryCode2",
  "nationalityCountryCode2",
  "hasUserAccount",
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

async function getcountries() {
  "use server";
  const response = await getCountriesApi({
    maxResultCount: 300,
    sorting: "name",
  });
  if (response.type === "success") {
    return {
      type: "success",
      data: {
        items: response.data.items || [],
      },
    };
  }
  return {
    type: response.type,
    data: { items: [] },
  };
}

export async function getTravellerFilters(
  languageData: TravellerServiceResource,
): Promise<DetailedFilterTraveller[]> {
  const nationalitiesResponse = await getcountries();

  const nationalitiesData =
    nationalitiesResponse.type === "success"
      ? nationalitiesResponse.data
      : { items: [], totalCount: 0 };

  const filters: DetailedFilterTraveller[] = [
    {
      name: "showExpired",
      displayName: languageData["Travellers.ShowExpired"],
      type: "boolean",
      value: "false",
    },
    {
      name: "travelDocumentNumber",
      displayName: languageData["Travellers.TravelDocumentNumber"],
      type: "string",
      value: "",
    },
    {
      name: "fullName",
      displayName: languageData.FullName,
      type: "string",
      value: "",
    },
    {
      name: "nationalities",
      displayName: languageData.Nationalities,
      type: "select-multiple",
      value: "",
      multiSelectProps: {
        options: [
          ...nationalitiesData.items.map((item) => ({
            label: item.name,
            value: item.code2,
          })),
        ],
      },
    },
    {
      name: "residences",
      displayName: languageData.Residences,
      type: "select-multiple",
      value: "",
      multiSelectProps: {
        options: [
          ...nationalitiesData.items.map((item) => ({
            label: item.name,
            value: item.code2,
          })),
        ],
      },
    },
  ];

  return filters;
}

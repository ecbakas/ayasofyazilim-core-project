import { $UniRefund_TravellerService_Travellers_TravellerListProfileDto } from "@ayasofyazilim/saas/TravellerService";

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

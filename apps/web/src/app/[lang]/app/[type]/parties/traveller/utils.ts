import { $UniRefund_TravellerService_Travellers_TravellerListProfileDto } from "@ayasofyazilim/saas/TravellerService";

export const travellerTableSchema = {
  excludeList: [
    "id",
    "userAccountId",
    "residenceCountryCode2",
    "nationalityCountryCode2",
  ],
  schema: $UniRefund_TravellerService_Travellers_TravellerListProfileDto,
};

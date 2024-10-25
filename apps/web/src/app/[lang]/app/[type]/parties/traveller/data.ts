import type {
  UniRefund_TravellerService_AddressTypes_CreateAddressTypeWithComponentsDto,
  UniRefund_TravellerService_EmailCommonDatas_CreateEmailCommonDataWithComponentsDto,
  UniRefund_TravellerService_NameCommonDatas_CreateNameCommonDataDto,
  UniRefund_TravellerService_PersonalIdentificationCommonDatas_CreatePersonalIdentificationCommonDataDto,
  UniRefund_TravellerService_PersonalPreferencesTypes_CreatePersonalPreferencesTypeDto,
  UniRefund_TravellerService_PersonalSummaries_CreatePersonalSummaryDto,
  UniRefund_TravellerService_TelephoneTypes_CreateTelephoneTypeWithComponentsDto,
} from "@ayasofyazilim/saas/TravellerService";
import { $UniRefund_TravellerService_Travellers_CreateWithComponentsTravellerDto } from "@ayasofyazilim/saas/TravellerService";
import { localNumber } from "../table-data";

export interface CreateTravellerDTO {
  name: UniRefund_TravellerService_NameCommonDatas_CreateNameCommonDataDto;
  personalSummaries: UniRefund_TravellerService_PersonalSummaries_CreatePersonalSummaryDto;
  telephone: UniRefund_TravellerService_TelephoneTypes_CreateTelephoneTypeWithComponentsDto;
  email: UniRefund_TravellerService_EmailCommonDatas_CreateEmailCommonDataWithComponentsDto;
  address: UniRefund_TravellerService_AddressTypes_CreateAddressTypeWithComponentsDto;
  personalIdentificationCommonDatas: UniRefund_TravellerService_PersonalIdentificationCommonDatas_CreatePersonalIdentificationCommonDataDto;
  personalPreferencesTypes: UniRefund_TravellerService_PersonalPreferencesTypes_CreatePersonalPreferencesTypeDto;
}

export const createTravellerSchema = {
  type: "object",
  properties: {
    name: $UniRefund_TravellerService_Travellers_CreateWithComponentsTravellerDto
      .properties.entityInformationTypes.items.properties.individuals.items
      .properties.name,
    personalSummaries:
      $UniRefund_TravellerService_Travellers_CreateWithComponentsTravellerDto
        .properties.entityInformationTypes.items.properties.individuals.items
        .properties.personalSummaries.items,
    telephone: {
      ...$UniRefund_TravellerService_Travellers_CreateWithComponentsTravellerDto
        .properties.entityInformationTypes.items.properties.individuals.items
        .properties.contactInformations.items.properties.telephones.items,
      properties: {
        ...$UniRefund_TravellerService_Travellers_CreateWithComponentsTravellerDto
          .properties.entityInformationTypes.items.properties.individuals.items
          .properties.contactInformations.items.properties.telephones.items
          .properties,
        localNumber,
      },
    },
    email:
      $UniRefund_TravellerService_Travellers_CreateWithComponentsTravellerDto
        .properties.entityInformationTypes.items.properties.individuals.items
        .properties.contactInformations.items.properties.emails.items,
    address:
      $UniRefund_TravellerService_Travellers_CreateWithComponentsTravellerDto
        .properties.entityInformationTypes.items.properties.individuals.items
        .properties.contactInformations.items.properties.addresses.items,
    personalIdentificationCommonDatas:
      $UniRefund_TravellerService_Travellers_CreateWithComponentsTravellerDto
        .properties.personalIdentificationCommonDatas.items,
    personalPreferencesTypes:
      $UniRefund_TravellerService_Travellers_CreateWithComponentsTravellerDto
        .properties.personalPreferencesTypes.items,
  },
};

export const NameSubPosition = ["firstName", "lastName"];
export const personalSummaries = [
  "date",
  "birthDate",
  "ethnicity",
  "maritalStatusCode",
  "religiousAffiliationName",
  "genderTypeCode",
];
export const TelephoneSubPosition = ["localNumber", "typeCode"];
export const AddressSubPosition = [
  "countryId",
  "regionId",
  "cityId",
  "postalCode",
  "addressLine",
  "fullAddress",
  "type",
];
export const EmailSubPosition = ["emailAddress", "typeCode"];

export const personalIdentificationCommonDatas = [
  "firstName",
  "lastName",
  "travelDocumentNumber",
  "birthDate",
  "issueDate",
  "expirationDate",
  "residenceCountryCode2",
  "nationalityCountryCode2",
  "identificationType",
];
export const personalPreferencesTypes = ["languagePreferenceCode"];

export const formPositions = [
  "name",
  "email",
  "telephone",
  "personalSummaries",
  "address",
  "personalIdentificationCommonDatas",
  "personalPreferencesTypes",
];

export const formSubPositions = {
  name: NameSubPosition,
  personalSummaries,
  telephone: TelephoneSubPosition,
  address: AddressSubPosition,
  email: EmailSubPosition,
  personalIdentificationCommonDatas,
  personalPreferencesTypes,
};

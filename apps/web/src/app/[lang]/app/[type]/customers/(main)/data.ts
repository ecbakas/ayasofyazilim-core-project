import {
  $UniRefund_CRMService_Merchants_CreateMerchantDto,
  $UniRefund_CRMService_Merchants_MerchantProfileDto,
} from "@ayasofyazilim/saas/CRMService";
import type { DataConfigArray } from "src/types";
import { localNumber } from "../../parties/table-data";

const CommonOrganizationFields = ["name", "taxpayerId", "branchId"];
const OrganizationFields = ["customerNumber", "legalStatusCode"];
const TelephoneSubPosition = ["localNumber", "typeCode"];
const AddressSubPosition = [
  "country",
  "terriority",
  "city",
  "postalCode",
  "addressLine",
  "fullAddress",
  "typeCode",
];
const EmailSubPosition = ["emailAddress", "typeCode"];

const MerchantsFormSubPositions = {
  organization: [...CommonOrganizationFields, ...OrganizationFields],
  telephone: TelephoneSubPosition,
  address: AddressSubPosition,
  email: EmailSubPosition,
};
const createMerchantsScheme = {
  type: "object",
  properties: {
    organization:
      $UniRefund_CRMService_Merchants_CreateMerchantDto.properties
        .entityInformationTypes.items.properties.organizations.items,
    telephone: {
      ...$UniRefund_CRMService_Merchants_CreateMerchantDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.telephones.items,
      properties: {
        ...$UniRefund_CRMService_Merchants_CreateMerchantDto.properties
          .entityInformationTypes.items.properties.organizations.items
          .properties.contactInformations.items.properties.telephones.items
          .properties,
        localNumber,
      },
    },
    address:
      $UniRefund_CRMService_Merchants_CreateMerchantDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.addresses.items,
    email:
      $UniRefund_CRMService_Merchants_CreateMerchantDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.emails.items,
  },
};
export const dataCustomers: DataConfigArray = {
  customers: {
    displayName: "customers",
    default: "customers",
    pages: {
      customers: {
        title: "customers",
        createFormSchema: {
          schema: createMerchantsScheme,
          formPositions: ["organization", "telephone", "address", "email"],
          formSubPositions: MerchantsFormSubPositions,
        },
        tableSchema: {
          excludeList: [
            "id",
            "organizationId",
            "individualId",
            "parentCompanyId",
          ],
          schema: $UniRefund_CRMService_Merchants_MerchantProfileDto,
        },
      },
    },
  },
};

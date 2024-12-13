import type { AbpUiNavigationResource } from "./AbpUiNavigation";
import type { ContractServiceResource } from "./ContractService";
import type { CRMServiceServiceResource } from "./CRMService";
import type { DefaultResource } from "./Default";
import type { IdentityServiceResource } from "./IdentityService";
import type { SettingServiceResource } from "./SettingService";
import type { TravellerServiceResource } from "./TravellerService";

export type LanguageDataResourceType = DefaultResource &
  (
    | AbpUiNavigationResource
    | ContractServiceResource
    | CRMServiceServiceResource
    | IdentityServiceResource
    | SettingServiceResource
    | TravellerServiceResource
    | undefined
  );

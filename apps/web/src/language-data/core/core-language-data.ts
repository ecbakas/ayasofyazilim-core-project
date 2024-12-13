import type { AbpUiNavigationResource } from "./AbpUiNavigation";
import type { IdentityServiceResource } from "./IdentityService";
import type { SettingServiceResource } from "./SettingService";

export type CoreLanguageDataResourceType =
  | AbpUiNavigationResource
  | IdentityServiceResource
  | SettingServiceResource
  | undefined;

"use server";

import {
  getAllOrganizationUnitsApi,
  getRolesApi,
  getUsersApi,
} from "src/actions/core/IdentityService/actions";
import ErrorComponent from "src/app/[lang]/(main)/_components/error-component";
import { getResourceData } from "src/language-data/core/IdentityService";
import { isUnauthorized } from "src/utils/page-policy/page-policy";
import { isErrorOnRequest } from "src/utils/page-policy/utils";
import OrganizationComponent from "./organization";

export default async function Page({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const { lang } = params;
  const { languageData } = await getResourceData(lang);
  await isUnauthorized({
    requiredPolicies: ["AbpIdentity.Roles"],
    lang,
  });
  const organizationResponse = await getAllOrganizationUnitsApi();
  if (isErrorOnRequest(organizationResponse, lang, false)) {
    return (
      <ErrorComponent
        languageData={languageData}
        message={organizationResponse.message}
      />
    );
  }

  const usersResponse = await getUsersApi({
    maxResultCount: 10,
    skipCount: 0,
  });
  if (isErrorOnRequest(usersResponse, lang, false)) {
    return (
      <ErrorComponent
        languageData={languageData}
        message={usersResponse.message}
      />
    );
  }

  const roleResponse = await getRolesApi({
    maxResultCount: 10,
    skipCount: 0,
  });
  if (isErrorOnRequest(roleResponse, lang, false)) {
    return (
      <ErrorComponent
        languageData={languageData}
        message={roleResponse.message}
      />
    );
  }

  return (
    <OrganizationComponent
      languageData={languageData}
      organizationUnitList={organizationResponse.data}
    />
  );
}

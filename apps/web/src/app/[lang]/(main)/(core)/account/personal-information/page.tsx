"use server";

import { getPersonalInfomationApi } from "src/actions/core/AccountService/actions";
import { getResourceData } from "src/language-data/core/AccountService";
import { isErrorOnRequest } from "src/utils/page-policy/utils";
import PersonalInformation from "./personal-information";

export default async function Page(props: { params: { lang: string } }) {
  const { languageData } = await getResourceData(props.params.lang);
  const response = await getPersonalInfomationApi();
  if (isErrorOnRequest(response, props.params.lang)) return;
  return (
    <PersonalInformation
      languageData={languageData}
      personalInformationData={response.data}
    />
  );
}

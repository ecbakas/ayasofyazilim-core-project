"use server";

import ForgotPasswordForm from "@repo/ui/theme/auth/forgot-password";
import {getTenantByNameApi, sendPasswordResetCodeApi} from "src/actions/core/AccountService/actions";
import {getResourceData} from "src/language-data/core/AccountService";

export default async function Page({params}: {params: {lang: string}}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);
  const isTenantDisabled = process.env.FETCH_TENANT !== "true";

  return (
    <ForgotPasswordForm
      isTenantDisabled={isTenantDisabled}
      languageData={languageData}
      onSubmitAction={sendPasswordResetCodeApi}
      onTenantSearchAction={getTenantByNameApi}
    />
  );
}

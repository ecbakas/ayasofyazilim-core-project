"use server";
import { auth } from "../auth/auth";
import { notFound, permanentRedirect, RedirectType } from "next/navigation";
import { ServerResponse } from "../api/types";
import { Policy } from "./types";

export function isErrorOnRequest<T>(
  response: ServerResponse<T>,
  lang: string,
  redirectToNotFound = true,
): response is {
  type: "api-error";
  message: string;
  data: string;
} {
  if (response.type === "success") return false;

  if (response.data === "Forbidden") {
    return permanentRedirect(`/${lang}/unauthorized`, RedirectType.replace);
  }

  if (redirectToNotFound) {
    return notFound();
  }
  return true;
}

export default async function PagePolicy({
  requiredPolicies,
  children,
  lang,
}: {
  requiredPolicies: Policy[];
  children: JSX.Element;
  lang: string;
}) {
  const sessions = await auth();
  const grantedPolicies = sessions?.grantedPolicies;

  const missingPolicies = requiredPolicies.filter(
    (policy) => !grantedPolicies?.[policy],
  );
  if (missingPolicies.length > 0) {
    return permanentRedirect(`/${lang}/unauthorized`, RedirectType.replace);
  }

  return children;
}

export async function isUnauthorized({
  requiredPolicies,
  lang,
}: {
  requiredPolicies: Policy[];
  lang: string;
}) {
  const sessions = await auth();
  const grantedPolicies = sessions?.grantedPolicies;

  const missingPolicies = requiredPolicies.filter(
    (policy) => !grantedPolicies?.[policy],
  );
  if (missingPolicies.length > 0) {
    return permanentRedirect(`/${lang}/unauthorized`, RedirectType.replace);
  }
  return false;
}

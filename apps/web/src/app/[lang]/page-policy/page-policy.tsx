"use server";
import { notFound } from "next/navigation";
import { auth } from "auth";
import type { Policy } from "src/types";

export default async function PagePolicy({
  requiredPolicies,
  children,
}: {
  requiredPolicies: Policy[];
  children: JSX.Element;
}) {
  const sessions = await auth();
  const grantedPolicies = sessions?.grantedPolicies;

  const missingPolicies = requiredPolicies.filter(
    (policy) => !grantedPolicies?.[policy],
  );
  if (missingPolicies.length > 0) {
    return notFound();
  }

  return children;
}

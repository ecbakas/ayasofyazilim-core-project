"use client";
import type { Policy } from "src/types";

export default function isActionGranted(
  requiredPolicies: Policy[],
  grantedPolicies: Record<Policy, boolean>,
) {
  const missingPolicies = requiredPolicies.filter(
    (policy) => !grantedPolicies[policy],
  );
  if (missingPolicies.length > 0) {
    return false;
  }
  return true;
}

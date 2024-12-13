"use client";

import { useSession } from "next-auth/react";
import policies from "src/utils/page-policy/policies.json";
import type { Policy } from "src/utils/page-policy/utils";

function useGrantedPolicies() {
  const { data: session } = useSession();
  const grantedPolicies = session?.grantedPolicies
    ? (session.grantedPolicies as Record<Policy, boolean>)
    : policies;

  return grantedPolicies;
}

export default useGrantedPolicies;

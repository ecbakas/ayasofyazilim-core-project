"use client";

import { useSession } from "next-auth/react";
import policies from "src/app/[lang]/page-policy/policies.json";
import type { Policy } from "src/types";

function useGrantedPolicies() {
  const { data: session } = useSession();
  const grantedPolicies = session?.grantedPolicies
    ? (session.grantedPolicies as Record<Policy, boolean>)
    : policies;

  return grantedPolicies;
}

export default useGrantedPolicies;

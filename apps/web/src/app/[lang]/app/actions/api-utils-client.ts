"use client";

import { toast } from "@/components/ui/sonner";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handlePutResponse = (
  response: { type: "success" | "error" | "api-error"; message: string },
  router: AppRouterInstance,
) => {
  if (response.type === "success") {
    toast.success("Updated successfully");
    router.refresh();
  } else {
    toast.error(response.message);
  }
};

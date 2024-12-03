"use client";

import { toast } from "@/components/ui/sonner";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handlePutResponse = (
  response: { type: "success" | "error" | "api-error"; message: string },
  router: AppRouterInstance,
  redirectTo?: string,
) => {
  if (response.type === "success") {
    toast.success("Updated successfully");
    redirectTo ? router.push(redirectTo) : router.refresh();
  } else {
    toast.error(response.message);
  }
};

export const handlePostResponse = (
  response: { type: "success" | "error" | "api-error"; message: string },
  router: AppRouterInstance,
  redirectTo?: string,
) => {
  if (response.type === "success") {
    toast.success("Created successfully");
    redirectTo ? router.push(redirectTo) : router.refresh();
  } else {
    toast.error(response.message);
  }
};
export const handleDeleteResponse = (
  response: { type: "success" | "error" | "api-error"; message: string },
  router: AppRouterInstance,
  redirectTo?: string,
) => {
  if (response.type === "success") {
    toast.success("Deleted successfully");
    redirectTo ? router.push(redirectTo) : router.refresh();
  } else {
    toast.error(response.message);
  }
};
export const handleGetResponseError = (response: {
  type: "success" | "error" | "api-error";
  message: string;
}) => {
  if (response.type !== "success") {
    toast.error(response.message);
  }
};

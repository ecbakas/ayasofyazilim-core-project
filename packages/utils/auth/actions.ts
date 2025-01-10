"use server";
import { Session } from "next-auth";
import { auth } from "./auth";
import { AccountServiceClient } from "@ayasofyazilim/core-saas/AccountService";
const HEADERS = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json",
};
export async function getAccountServiceClient(
  customHeaders?: Record<string, string>,
  session?: Session | null,
) {
  const userData = session || (await auth());
  const token = userData?.access_token;
  return new AccountServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS: { ...HEADERS, ...customHeaders },
  });
}

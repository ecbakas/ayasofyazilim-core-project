"use server";
import { isApiError } from "api";
import { getAccountServiceClient, signIn } from "auth";

interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details: string | null;
    data: Record<string, unknown>;
    validationErrors: string | null;
  };
}

export async function signInServer({
  userIdentifier,
  password,
  tenantId,
}: {
  userIdentifier: string;
  password: string;
  tenantId?: string;
}) {
  try {
    await signIn("credentials", {
      username: userIdentifier,
      password,
      tenantId,
      redirect: false,
    });
    return {
      status: 200,
    };
  } catch (error) {
    if (error !== null && typeof error === "object" && "message" in error) {
      return {
        status: 400,
        description: error.message,
      };
    }
    return {
      status: 400,
      description: "Unknown error",
    };
  }
}
export async function signUpServer({
  userName,
  email,
  password,
}: {
  userName: string;
  email: string;
  password: string;
}) {
  try {
    const client = await getAccountServiceClient({
      __tenant: process.env.TENANT_ID || "",
    });
    await client.account.postApiAccountRegister({
      requestBody: {
        userName,
        emailAddress: email,
        password,
        appName: process.env.APP_NAME || "",
      },
    });
    return {
      status: 200,
    };
  } catch (error: unknown) {
    if (isApiError(error)) {
      const errorBody = error.body as ApiErrorResponse;
      return {
        status: error.status,
        description: `SignUp server error ${error.statusText}: ${errorBody.error.message.split(",").join("\n")}`,
      };
    }
    return {
      status: 500,
      description: "Unknown error while signing up",
    };
  }
}
export async function sendPasswordResetCodeServer({
  email,
}: {
  email: string;
}) {
  try {
    const client = await getAccountServiceClient({
      __tenant: process.env.TENANT_ID || "F3B84A96-8A04-87B7-D3C3-3A1675322587",
    });
    await client.account.postApiAccountSendPasswordResetCode({
      requestBody: {
        email,
        appName: process.env.APP_NAME || "",
      },
    });
    return {
      status: 200,
    };
  } catch (error: unknown) {
    if (isApiError(error)) {
      return {
        status: error.status,
        description: error.statusText,
      };
    }
    return {
      status: 500,
      description: "Unknown error while sending password reset code",
    };
  }
}

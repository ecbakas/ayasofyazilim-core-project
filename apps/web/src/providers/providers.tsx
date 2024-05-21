"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useParams } from "next/navigation";
import { ConfigProvider } from "./configuration";
import { LocaleProvider } from "./locale";
import { UserProvider } from "./user";
import AuthSession from "./auth";
import { Toaster } from "@/components/ui/sonner";

export default function Providers({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const params = useParams();
  const lang = params?.lang?.toString();
  if (!lang) return <></>;

  return (
    <div>
      <Toaster richColors />
      <AuthSession>
        <ConfigProvider>
          <TooltipProvider>
            <LocaleProvider lang={lang}>{children}</LocaleProvider>
          </TooltipProvider>
        </ConfigProvider>
      </AuthSession>
    </div>
  );
}

"use server";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Providers from "src/providers/providers";
import "./globals.css";

interface RootLayoutProps {
  params: { lang: string };
  children: JSX.Element;
}
const appName = process.env.APPLICATION_NAME || "UNIREFUND";
const title = appName.charAt(0).toUpperCase() + appName.slice(1).toLowerCase();
export async function generateMetadata(): Promise<Metadata> {
  await Promise.resolve();
  return {
    title,
    description:
      "Core project is a core web app for managing multi-tenant apps.",
  };
}
export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  await Promise.resolve();
  const { lang } = params;
  return (
    <html className="h-full overflow-hidden" lang={lang}>
      <body className={GeistSans.className} data-app-name={appName}>
        <Providers lang={lang}>{children}</Providers>
      </body>
    </html>
  );
}

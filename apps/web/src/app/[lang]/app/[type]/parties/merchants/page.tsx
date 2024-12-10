"use server";

import type { GetApiCrmServiceMerchantsData } from "@ayasofyazilim/saas/CRMService";
import { notFound } from "next/navigation";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import { getResourceData } from "src/language-data/CRMService";
import { getMerchantsApi } from "../../../actions/CrmService/actions";
import MerchantsTable from "./table";

interface SearchParamType {
  ids?: string;
  name?: string;
  maxResultCount?: number;
  skipCount?: number;
  sorting?: string;
  typeCode?: string;
}

export default async function Page(props: {
  params: { lang: string };
  searchParams?: Promise<SearchParamType>;
}) {
  const searchParams = await props.searchParams;
  const response = await getMerchantsApi({
    typeCodes: searchParams?.typeCode?.split(",") || [],
    name: searchParams?.name || "",
    maxResultCount: searchParams?.maxResultCount || 10,
    skipCount: searchParams?.skipCount || 0,
  } as GetApiCrmServiceMerchantsData);

  if (response.type !== "success") return notFound();

  const { languageData } = await getResourceData(props.params.lang);
  return (
    <PagePolicy requiredPolicies={["CRMService.Merchants"]}>
      <MerchantsTable languageData={languageData} response={response.data} />
    </PagePolicy>
  );
}

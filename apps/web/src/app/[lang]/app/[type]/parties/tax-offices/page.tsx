"use server";

import type { GetApiCrmServiceTaxOfficesData } from "@ayasofyazilim/saas/CRMService";
import { notFound } from "next/navigation";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import { getResourceData } from "src/language-data/CRMService";
import { getTaxOfficesApi } from "../../../actions/CrmService/actions";
import TaxOfficesTable from "./table";

interface SearchParamType {
  maxResultCount?: number;
  skipCount?: number;
  sorting?: string;
  name?: string;
}

export default async function Page(props: {
  params: { lang: string };
  searchParams?: Promise<SearchParamType>;
}) {
  const searchParams = await props.searchParams;
  const response = await getTaxOfficesApi({
    name: searchParams?.name || "",
    maxResultCount: searchParams?.maxResultCount || 10,
    skipCount: searchParams?.skipCount || 0,
  } as GetApiCrmServiceTaxOfficesData);

  if (response.type !== "success") return notFound();

  const { languageData } = await getResourceData(props.params.lang);
  return (
    <PagePolicy
      lang={props.params.lang}
      requiredPolicies={["CRMService.TaxOffices"]}
    >
      <TaxOfficesTable languageData={languageData} response={response.data} />
    </PagePolicy>
  );
}

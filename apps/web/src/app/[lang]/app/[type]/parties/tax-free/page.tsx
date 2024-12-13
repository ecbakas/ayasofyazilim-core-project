"use server";

import type { GetApiCrmServiceTaxFreesData } from "@ayasofyazilim/saas/CRMService";
import { notFound } from "next/navigation";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import { getResourceData } from "src/language-data/CRMService";
import { getTaxFreesApi } from "../../../actions/CrmService/actions";
import TaxFreeTable from "./table";

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
  const response = await getTaxFreesApi({
    name: searchParams?.name || "",
    maxResultCount: searchParams?.maxResultCount || 10,
    skipCount: searchParams?.skipCount || 0,
  } as GetApiCrmServiceTaxFreesData);

  if (response.type !== "success") return notFound();

  const { languageData } = await getResourceData(props.params.lang);
  return (
    <PagePolicy
      lang={props.params.lang}
      requiredPolicies={["CRMService.TaxFrees"]}
    >
      <TaxFreeTable languageData={languageData} response={response.data} />
    </PagePolicy>
  );
}

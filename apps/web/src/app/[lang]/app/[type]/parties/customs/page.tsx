"use server";

import type { GetApiCrmServiceCustomsData } from "@ayasofyazilim/saas/CRMService";
import { notFound } from "next/navigation";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import { getResourceData } from "src/language-data/CRMService";
import { getCustomsApi } from "../../../actions/CrmService/actions";
import CustomsTable from "./table";

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
  const response = await getCustomsApi({
    name: searchParams?.name || "",
    maxResultCount: searchParams?.maxResultCount || 10,
    skipCount: searchParams?.skipCount || 0,
  } as GetApiCrmServiceCustomsData);

  if (response.type !== "success") return notFound();

  const { languageData } = await getResourceData(props.params.lang);
  return (
    <PagePolicy
      lang={props.params.lang}
      requiredPolicies={["CRMService.Customs"]}
    >
      <CustomsTable languageData={languageData} response={response.data} />
    </PagePolicy>
  );
}

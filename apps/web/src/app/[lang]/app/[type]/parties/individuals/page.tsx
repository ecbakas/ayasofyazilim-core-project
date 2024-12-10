"use server";

import type { GetApiCrmServiceIndividualsData } from "@ayasofyazilim/saas/CRMService";
import { notFound } from "next/navigation";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import { getResourceData } from "src/language-data/CRMService";
import { getIndividualsApi } from "../../../actions/CrmService/actions";
import IndividualsTable from "./table";

interface SearchParamType {
  ids?: string;
  name?: string;
  maxResultCount?: number;
  skipCount?: number;
  sorting?: string;
  typeCode?: string;
  entityPartyTypeCode?: string;
}

export default async function Page(props: {
  params: { lang: string };
  searchParams?: Promise<SearchParamType>;
}) {
  const searchParams = await props.searchParams;
  const response = await getIndividualsApi({
    ...searchParams,
    typeCodes: searchParams?.typeCode?.split(",") || [],
  } as GetApiCrmServiceIndividualsData);

  if (response.type !== "success") return notFound();

  const { languageData } = await getResourceData(props.params.lang);
  return (
    <PagePolicy requiredPolicies={["CRMService.Merchants"]}>
      <IndividualsTable languageData={languageData} response={response.data} />
    </PagePolicy>
  );
}

"use server";

import { notFound } from "next/navigation";
import { getResourceData } from "src/language-data/TravellerService";
import { getTravellersDetailsApi } from "src/app/[lang]/app/actions/TravellerService/actions";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import Form from "./form";

export default async function Page({
  params,
}: {
  params: { travellerId: string; lang: string };
}) {
  const { languageData } = await getResourceData(params.lang);
  const traveller = await getTravellersDetailsApi(params.travellerId);

  if (traveller.type !== "success") return notFound();
  const travellerData = traveller.data;

  return (
    <>
      <PagePolicy
        lang={params.lang}
        requiredPolicies={["TravellerService.Travellers.Edit"]}
      >
        <Form
          languageData={languageData}
          travellerData={travellerData}
          travellerId={params.travellerId}
        />
      </PagePolicy>
      <div className="hidden" id="page-title">
        {`${languageData.Traveller} (${travellerData.personalIdentifications[0].fullName})`}
      </div>
      <div className="hidden" id="page-description">
        {languageData["Travellers.Edit.Description"]}
      </div>
    </>
  );
}

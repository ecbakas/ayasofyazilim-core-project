"use server";

import type { UniRefund_TravellerService_Travellers_TravellerDetailProfileDto } from "@ayasofyazilim/saas/TravellerService";
import { getResourceData } from "src/language-data/TravellerService";
import { getTravellersDetailsApi } from "src/app/[lang]/app/actions/TravellerService/actions";
import { getCountriesApi } from "src/app/[lang]/app/actions/LocationService/actions";
import { getBaseLink } from "src/utils";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import Form from "./form";

export default async function Page({
  params,
}: {
  params: { travellerId: string; lang: string };
}) {
  const { languageData } = await getResourceData(params.lang);
  const traveller = await getTravellersDetailsApi(params.travellerId);
  const countries = await getCountriesApi();
  const countryList =
    (countries.type === "success" && countries.data.items) || [];
  const travellerData =
    traveller.data as UniRefund_TravellerService_Travellers_TravellerDetailProfileDto;

  return (
    <PagePolicy
      lang={params.lang}
      requiredPolicies={["TravellerService.Travellers.Create"]}
    >
      <>
        <Form
          countryList={{
            data: countryList,
            success: countries.type === "success",
          }}
          languageData={languageData}
          travellerId={params.travellerId}
        />
        <div className="hidden" id="page-title">
          {`${languageData.Traveller} (${travellerData.personalIdentifications[0].fullName})`}
        </div>
        <div className="hidden" id="page-description">
          {languageData["Travellers.Create.Identification.Description"]}
        </div>
        <div className="hidden" id="page-back-link">
          {getBaseLink(`/app/admin/parties/travellers/${params.travellerId}`)}
        </div>
      </>
    </PagePolicy>
  );
}

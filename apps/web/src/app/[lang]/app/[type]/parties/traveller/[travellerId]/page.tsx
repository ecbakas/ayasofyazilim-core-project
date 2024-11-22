"use server";

import { getResourceData } from "src/language-data/TravellerService";
import { getTravellersDetailsApi } from "src/app/[lang]/app/actions/TravellerService/actions";
import Form from "./form";

export default async function Page({
  params,
}: {
  params: { travellerId: string; lang: string };
}) {
  const { languageData } = await getResourceData(params.lang);
  const Traveller = await getTravellersDetailsApi(params.travellerId);

  if (Traveller.type !== "success") {
    return (
      <div className="error-message">
        {Traveller.type + Traveller.message ||
          languageData["Travellers.Fetch.Fail"]}
      </div>
    );
  }
  const travellerData = Traveller.data;

  return (
    <>
      <Form
        languageData={languageData}
        travellerData={travellerData}
        travellerId={params.travellerId}
      />
      <div className="hidden" id="page-title">
        {`${languageData.Traveller} (${travellerData.personalIdentifications[0].fullName})`}
      </div>
      <div className="hidden" id="page-description">
        {languageData["Travellers.Edit.Description"]}
      </div>
    </>
  );
}

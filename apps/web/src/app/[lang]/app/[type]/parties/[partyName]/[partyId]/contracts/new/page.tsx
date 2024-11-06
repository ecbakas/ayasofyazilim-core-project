import { notFound } from "next/navigation";
import {
  getAdressesApi,
  getBasicInformationApi,
} from "src/app/[lang]/app/actions/CrmService/actions";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { getResourceData } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";
import ContractHeaderForm from "../contract-header";

export default async function Page({
  params,
}: {
  params: {
    partyName: "merchants";
    partyId: string;
    lang: string;
  };
}) {
  const basicInformation = await getBasicInformationApi(
    params.partyId,
    params.partyName,
  );
  const addresses = await getAdressesApi(params.partyId, params.partyName);
  if (basicInformation.type !== "success" || addresses.type !== "success") {
    return notFound();
  }
  const { languageData } = await getResourceData(params.lang);
  return (
    <>
      <ContractHeaderForm
        formType="Create"
        languageData={languageData}
        partyId={params.partyId}
        partyName={params.partyName}
        addresses={addresses.data}
        // basicInformation={basicInformation}
      />
      <PageHeader
        languageData={languageData}
        params={params}
        title={basicInformation.data.name || params.partyId}
      />
    </>
  );
}

function PageHeader({
  params,
  title,
  languageData,
}: {
  params: { partyName: string; partyId: string };
  title: string;
  languageData: ContractServiceResource;
}) {
  return (
    <>
      <div className="hidden" id="page-title">
        {languageData["Contracts.Create.Title"]} - {title}
      </div>
      <div className="hidden" id="page-description">
        {languageData["Contracts.Create.Description"]}
      </div>
      <div className="hidden" id="page-back-link">
        {getBaseLink(
          `/app/admin/parties/${params.partyName}/${params.partyId}`,
        )}
      </div>
    </>
  );
}

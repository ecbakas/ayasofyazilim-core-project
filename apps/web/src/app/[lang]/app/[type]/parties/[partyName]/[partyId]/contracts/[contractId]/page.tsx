import { notFound } from "next/navigation";
import {
  getMerchantContractHeaderByIdApi,
  getMerchantContractHeaderMissingStepsByIdApi,
} from "src/app/[lang]/app/actions/ContractService/action";
import { getAdressesApi } from "src/app/[lang]/app/actions/CrmService/actions";
import { getResourceData } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";
import Details from "./details";

export default async function Page({
  params,
}: {
  params: {
    contractId: string;
    partyName: "merchants";
    partyId: string;
    lang: string;
  };
}) {
  const contractHeaderDetails = await getMerchantContractHeaderByIdApi(
    params.contractId,
  );
  const missingSteps = await getMerchantContractHeaderMissingStepsByIdApi({
    id: params.contractId,
  });
  const addresses = await getAdressesApi(params.partyId, params.partyName);
  if (
    addresses.type !== "success" ||
    contractHeaderDetails.type !== "success" ||
    missingSteps.type !== "success"
  ) {
    return notFound();
  }

  const { languageData } = await getResourceData(params.lang);
  return (
    <>
      <Details
        addresses={addresses.data}
        contractHeaderDetails={contractHeaderDetails.data}
        languageData={languageData}
        missingSteps={missingSteps.data}
        partyId={params.partyId}
        partyName={params.partyName}
      />
      <div className="hidden" id="page-title">
        {languageData["Contracts.Edit.Title"]} - (
        {contractHeaderDetails.data.name})
      </div>
      <div className="hidden" id="page-description">
        {languageData["Contracts.Edit.Description"]}
      </div>
      <div className="hidden" id="page-back-link">
        {getBaseLink(
          `/app/admin/parties/${params.partyName}/${params.partyId}`,
        )}
      </div>
    </>
  );
}

import { notFound } from "next/navigation";
import {
  getMerchantContractHeaderByIdApi,
  getMerchantContractHeaderContractSettingsByHeaderIdApi,
  getMerchantContractHeaderMissingStepsByIdApi,
  getRebateTableHeadersApi,
} from "src/app/[lang]/app/actions/ContractService/action";
import {
  getAdressesApi,
  getSubMerchantsByMerchantIdApi,
} from "src/app/[lang]/app/actions/CrmService/actions";
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
  const contractSettings =
    await getMerchantContractHeaderContractSettingsByHeaderIdApi({
      id: params.contractId,
    });
  const missingSteps = await getMerchantContractHeaderMissingStepsByIdApi({
    id: params.contractId,
  });
  const rebateTables = await getRebateTableHeadersApi({});
  const subMerchants = await getSubMerchantsByMerchantIdApi({
    id: params.partyId,
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
        contractSettings={{
          data:
            contractSettings.type === "success"
              ? contractSettings.data
              : { items: [] },
          success: contractSettings.type === "success",
          message: contractSettings.message,
        }}
        lang={params.lang}
        languageData={languageData}
        missingSteps={missingSteps.data}
        partyId={params.partyId}
        partyName={params.partyName}
        rebateTables={{
          data:
            rebateTables.type === "success"
              ? rebateTables.data.items || []
              : [],
          success: rebateTables.type === "success",
          message: rebateTables.message,
        }}
        subMerchants={{
          data:
            subMerchants.type === "success"
              ? subMerchants.data.items || []
              : [],
          success: subMerchants.type === "success",
          message: subMerchants.message,
        }}
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

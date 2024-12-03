import { notFound } from "next/navigation";
import {
  getAdressesApi,
  getMerchantByIdApi,
} from "src/app/[lang]/app/actions/CrmService/actions";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { getResourceData } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";
import { getRefundTableHeadersApi } from "src/app/[lang]/app/actions/ContractService/action";
import ContractHeaderForm from "../contract-header-form";

export default async function Page({
  params,
}: {
  params: {
    partyName: "merchants";
    partyId: string;
    lang: string;
  };
}) {
  const addresses = await getAdressesApi(params.partyId, params.partyName);
  const refundTableHeaders = await getRefundTableHeadersApi({});
  const merchantDetails = await getMerchantByIdApi(params.partyId);
  if (
    addresses.type !== "success" ||
    refundTableHeaders.type !== "success" ||
    merchantDetails.type !== "success"
  ) {
    return notFound();
  }
  const { languageData } = await getResourceData(params.lang);
  return (
    <>
      <ContractHeaderForm
        addresses={addresses.data}
        formType="create"
        languageData={languageData}
        partyId={params.partyId}
        partyName={params.partyName}
        refundTableHeaders={refundTableHeaders.data.items || []}
      />
      <PageHeader
        languageData={languageData}
        params={params}
        title={merchantDetails.data.name}
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

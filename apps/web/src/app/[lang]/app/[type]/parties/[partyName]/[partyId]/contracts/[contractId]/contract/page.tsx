import { notFound } from "next/navigation";
import {
  getMerchantContractHeaderByIdApi,
  getRefundTableHeadersApi,
} from "src/app/[lang]/app/actions/ContractService/action";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import { getResourceData } from "src/language-data/ContractService";
import { getAdressesApi } from "src/app/[lang]/app/actions/CrmService/actions";
import { ContractHeader } from "./_components/contract-header";

export default async function Page({
  params,
}: {
  params: {
    lang: string;
    partyName: "merchants";
    partyId: string;
    contractId: string;
  };
}) {
  const { lang, partyName, partyId, contractId } = params;
  const { languageData } = await getResourceData(lang);
  const refundTableHeaders = await getRefundTableHeadersApi({});
  const contractHeaderDetails =
    await getMerchantContractHeaderByIdApi(contractId);
  const addressList = await getAdressesApi(partyId, partyName);
  if (
    refundTableHeaders.type !== "success" ||
    contractHeaderDetails.type !== "success" ||
    addressList.type !== "success"
  ) {
    return notFound();
  }

  return (
    <PagePolicy
      requiredPolicies={["ContractService.ContractHeaderForMerchant.Edit"]}
    >
      <ContractHeader
        addressList={addressList.data}
        contractHeaderDetails={contractHeaderDetails.data}
        languageData={languageData}
        partyId={partyId}
        partyName={partyName}
        refundTableHeaders={refundTableHeaders.data.items || []}
      />
    </PagePolicy>
  );
}

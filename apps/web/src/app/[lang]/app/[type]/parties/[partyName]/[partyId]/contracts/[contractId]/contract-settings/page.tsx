import { notFound } from "next/navigation";
import {
  getMerchantContractHeaderByIdApi,
  getMerchantContractHeaderContractSettingsByHeaderIdApi,
  getRefundTableHeadersApi,
} from "src/app/[lang]/app/actions/ContractService/action";
import { getAdressesApi } from "src/app/[lang]/app/actions/CrmService/actions";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import { getResourceData } from "src/language-data/ContractService";
import { ContractSettings } from "./_components/contract-settings";

export default async function Page({
  params,
}: {
  params: {
    lang: string;
    partyId: string;
    contractId: string;
    partyName: "merchants";
  };
}) {
  const { lang, contractId, partyId, partyName } = params;
  const { languageData } = await getResourceData(lang);
  const contractSettings =
    await getMerchantContractHeaderContractSettingsByHeaderIdApi({
      id: contractId,
    });
  const refundTableHeaders = await getRefundTableHeadersApi({});
  const contractHeaderDetails =
    await getMerchantContractHeaderByIdApi(contractId);
  const addressList = await getAdressesApi(partyId, partyName);
  if (
    contractSettings.type !== "success" ||
    refundTableHeaders.type !== "success" ||
    contractHeaderDetails.type !== "success" ||
    addressList.type !== "success"
  )
    return notFound();
  return (
    <PagePolicy requiredPolicies={["ContractService.ContractSetting.Edit"]}>
      <ContractSettings
        addressList={addressList.data}
        contractHeaderDetails={contractHeaderDetails.data}
        contractSettings={contractSettings.data}
        lang={lang}
        languageData={languageData}
      />
    </PagePolicy>
  );
}

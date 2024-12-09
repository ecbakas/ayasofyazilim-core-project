"use server";
import { TabLayout } from "@repo/ayasofyazilim-ui/templates/tab-layout";
import { notFound } from "next/navigation";
import { getMerchantContractHeaderByIdApi } from "src/app/[lang]/app/actions/ContractService/action";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import { getResourceData } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lang: string;
    contractId: string;
    partyName: "merchants";
    partyId: string;
  };
}) {
  const { lang, contractId, partyId, partyName } = params;
  const { languageData } = await getResourceData(lang);
  const contractHeaderDetails =
    await getMerchantContractHeaderByIdApi(contractId);
  if (contractHeaderDetails.type !== "success") return notFound();
  return (
    <PagePolicy
      requiredPolicies={[
        "ContractService.ContractHeaderForMerchant",
        "ContractService.ContractSetting.Edit",
        "ContractService.RebateSetting.Edit",
        "ContractService.ContractHeaderForMerchant.Edit",
      ]}
    >
      <>
        <TabLayout
          tabList={[
            {
              label: languageData["Contracts.Contract"],
              href: "contract",
            },
            {
              label: languageData["Contracts.RebateSettings"],
              href: "rebate-settings",
            },
            {
              label: languageData["Contracts.Stores"],
              href: "stores",
            },
            {
              label: languageData["Contracts.ContractSettings"],
              href: "contract-settings",
            },
          ]}
        >
          {children}
        </TabLayout>
        <div className="hidden" id="page-title">
          {languageData["Contracts.Edit.Title"]} -
          {contractHeaderDetails.data.name}
        </div>
        <div className="hidden" id="page-description">
          {languageData["Contracts.Edit.Description"]}
        </div>
        <div className="hidden" id="page-back-link">
          {getBaseLink(`/app/admin/parties/${partyName}/${partyId}`)}
        </div>
      </>
    </PagePolicy>
  );
}

// function BadgeWithTooltip({
//   label,
//   languageData,
// }: {
//   label: string;
//   languageData: ContractServiceResource;
// }) {
//   return (
//     <Tooltip>
//       <TooltipTrigger asChild>
//         <div className="flex items-center gap-2">
//           <Circle className="text-destructive w-3" />
//           <span>{label}</span>
//         </div>
//       </TooltipTrigger>
//       <TooltipContent>
//         {languageData["Contracts.MissingSteps.Missing"]}
//       </TooltipContent>
//     </Tooltip>
//   );
// }

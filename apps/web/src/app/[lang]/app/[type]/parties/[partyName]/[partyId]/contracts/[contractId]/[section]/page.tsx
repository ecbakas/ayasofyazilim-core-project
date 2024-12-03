import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { Circle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getMerchantContractHeaderByIdApi,
  getMerchantContractHeaderMissingStepsByIdApi,
} from "src/app/[lang]/app/actions/ContractService/action";
import {
  getResourceData,
  type ContractServiceResource,
} from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";
import { getAdressesApi } from "src/app/[lang]/app/actions/CrmService/actions";
import ContractPage from "./contract/contract-page";
import ContractSettingsPage from "./contract-settings/contract-settings-page";
import RebateSettingsPage from "./rebate-settings/rebate-settings-page";

export default async function Page({
  params,
}: {
  params: {
    lang: string;
    contractId: string;
    partyName: "merchants";
    partyId: string;
    section: string;
  };
}) {
  const { lang, contractId, partyId, partyName, section } = params;
  const { languageData } = await getResourceData(lang);
  const missingSteps = await getMerchantContractHeaderMissingStepsByIdApi({
    id: contractId,
  });
  const contractHeaderDetails =
    await getMerchantContractHeaderByIdApi(contractId);

  const addressList = await getAdressesApi(partyId, partyName);

  if (
    missingSteps.type !== "success" ||
    contractHeaderDetails.type !== "success" ||
    addressList.type !== "success"
  ) {
    return notFound();
  }
  return (
    <>
      <SectionLayout
        defaultActiveSectionId={section}
        linkElement={Link}
        sections={[
          {
            id: "contract",
            link: "contract",
            name: languageData["Contracts.Create.ContractHeader"],
            disabled: false,
          },
          {
            id: "rebate-settings",
            link: "rebate-settings",
            disabled: false,
            ...setSectionOptions(
              "RebateSettings",
              languageData["Contracts.Create.RebateSettings"],
              languageData,
              missingSteps.data,
            ),
          },
          {
            id: "contract-settings",
            link: "contract-settings",
            disabled: false,
            ...setSectionOptions(
              "ContractSetting",
              languageData["Contracts.Create.ContractSettings"],
              languageData,
              missingSteps.data,
            ),
          },
        ]}
        vertical
      >
        <SectionLayoutContent sectionId={section}>
          {section === "contract" && (
            <ContractPage
              {...params}
              addressList={addressList.data}
              contractHeaderDetails={contractHeaderDetails.data}
            />
          )}
          {section === "contract-settings" && (
            <ContractSettingsPage
              {...params}
              addressList={addressList.data}
              contractHeaderDetails={contractHeaderDetails.data}
            />
          )}
          {section === "rebate-settings" && <RebateSettingsPage {...params} />}
        </SectionLayoutContent>
      </SectionLayout>
      <div className="hidden" id="page-title">
        {languageData["Contracts.Edit.Title"]} - (
        {contractHeaderDetails.data.name})
      </div>
      <div className="hidden" id="page-description">
        {languageData["Contracts.Edit.Description"]}
      </div>
      <div className="hidden" id="page-back-link">
        {getBaseLink(`/app/admin/parties/${partyName}/${partyId}`)}
      </div>
    </>
  );
}

function BadgeWithTooltip({
  label,
  languageData,
}: {
  label: string;
  languageData: ContractServiceResource;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2">
          <Circle className="text-destructive w-3" />
          <span>{label}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {languageData["Contracts.MissingSteps.Missing"]}
      </TooltipContent>
    </Tooltip>
  );
}
function setSectionOptions(
  key: string,
  label: string,
  languageData: ContractServiceResource,
  missingSteps: string[] = [],
) {
  const isMissingStep = missingSteps.includes(key);
  const options = {
    name: label,
    className: isMissingStep ? "data-[active=false]:text-xs" : "",
  };
  if (isMissingStep)
    Object.assign(options, {
      children: <BadgeWithTooltip label={label} languageData={languageData} />,
    });
  return options;
}

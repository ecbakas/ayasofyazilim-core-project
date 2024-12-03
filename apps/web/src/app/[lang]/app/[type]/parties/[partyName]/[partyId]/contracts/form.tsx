"use client";

import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as ContractsForMerchantDto,
  PagedResultDto_ContractHeaderDetailForMerchantDto,
} from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as $ContractsForMerchantDto } from "@ayasofyazilim/saas/ContractService";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import { tanstackTableCreateColumnsByRowData as columnsByData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { useRouter } from "next/navigation";
import type { ContractServiceResource } from "src/language-data/ContractService";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import { getBaseLink } from "src/utils";

export default function Contracts({
  languageData,
  contractsData,
  partyId,
  partyName,
  lang,
}: {
  languageData: CRMServiceServiceResource & ContractServiceResource;
  contractsData: PagedResultDto_ContractHeaderDetailForMerchantDto;
  partyId: string;
  partyName: "merchants";
  lang: string;
}) {
  const router = useRouter();
  const customColumns = columnsByData<ContractsForMerchantDto>({
    rows: $ContractsForMerchantDto.properties,
    config: { locale: lang },
    languageData: {
      constantKey: "Contracts",
      languageData,
    },
    badges: {
      name: {
        values: [
          {
            label: languageData["Contracts.draft"],
            conditions: [
              {
                when: (value) => value === true,
                conditionAccessorKey: "isDraft",
              },
            ],
          },
          {
            label: languageData["Contracts.active"],
            conditions: [
              {
                when: (value) => value === true,
                conditionAccessorKey: "isActive",
              },
            ],
          },
        ],
      },
    },
    links: {
      name: {
        prefix: `/app/admin/parties/${partyName}/${partyId}/contracts`,
        targetAccessorKey: "id",
        suffix: "/contract",
      },
    },
    icons: {
      name: {
        icon: OpenInNewWindowIcon,
        position: "before",
      },
    },
  });

  return (
    <SectionLayoutContent sectionId="contracts">
      <TanstackTable
        columnVisibility={{
          type: "show",
          columns: ["name", "validFrom", "validTo"],
        }}
        columns={customColumns}
        data={contractsData.items || []}
        fillerColumn="name"
        tableActions={[
          {
            type: "simple",
            actionLocation: "table",
            cta: languageData["Contracts.New"],
            onClick: () => {
              router.push(
                getBaseLink(
                  `/app/admin/parties/${partyName}/${partyId}/contracts/new/`,
                ),
              );
            },
          },
          {
            type: "simple",
            actionLocation: "table",
            cta: languageData.ExportCSV,
            onClick: () => {
              toast.warning("Not implemented yet");
            },
          },
        ]}
      />
    </SectionLayoutContent>
  );
}

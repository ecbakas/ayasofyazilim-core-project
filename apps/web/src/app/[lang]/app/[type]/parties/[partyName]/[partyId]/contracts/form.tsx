"use client";

import { toast } from "@/components/ui/sonner";
import type {
  PagedResultDto_ContractHeaderDetailForMerchantDto,
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as ContractsForMerchantDto,
} from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantDto as $ContractsForMerchantDto } from "@ayasofyazilim/saas/ContractService";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import type { TableAction } from "@repo/ayasofyazilim-ui/molecules/tables/types";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import type { CellContext } from "@tanstack/react-table";
import { FilePenLine } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getMerchantContractHeadersByMerchantIdApi } from "src/app/[lang]/app/actions/ContractService/action";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import { getBaseLink } from "src/utils";

function cellWithLink(
  cell: CellContext<ContractsForMerchantDto, unknown>,
  partyName: string,
  partyId: string,
) {
  const id = cell.row.original.id;
  return (
    <Link
      className="flex items-center gap-2 font-medium text-blue-700"
      href={getBaseLink(
        `app/admin/parties/${partyName}/${partyId}/contracts/${id}`,
      )}
    >
      <FilePenLine className="w-4" />
      {cell.getValue() as string}
    </Link>
  );
}

export default function Contracts({
  languageData,
  partyName,
  partyId,
}: {
  languageData: CRMServiceServiceResource;
  partyName: "merchants";
  partyId: string;
}) {
  const [contractsData, setContractsData] =
    useState<PagedResultDto_ContractHeaderDetailForMerchantDto>();
  const [loading, setLoading] = useState(true);
  async function getContractsOfMerchant() {
    setLoading(true);
    try {
      const response = await getMerchantContractHeadersByMerchantIdApi({
        id: partyId,
      });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(response.message || response.status);
        return;
      }
      setContractsData(response.data);
    } catch (error) {
      toast.error("An error occurred while fetching contracts.");
    } finally {
      setLoading(false);
    }
  }
  const actionContracts: TableAction[] = [
    {
      cta: languageData[
        `${"Contracts".replaceAll(" ", "")}.New` as keyof typeof languageData
      ],
      type: "NewPage",
      href: `/app/admin/parties/${partyName}/${partyId}/contracts/new/`,
    },
    {
      cta: `Export CSV`,
      callback: () => {
        //  jsonToCSV(contractsData, params.data);
      },
      type: "Action",
    },
  ];
  return (
    <SectionLayoutContent sectionId="contracts">
      <DataTable
        action={actionContracts}
        columnsData={{
          type: "Auto",
          data: {
            tableType: $ContractsForMerchantDto,
            excludeList: [],
            positions: ["name", "contractType"],
            customCells: {
              name: (cell) => cellWithLink(cell, partyName, partyId),
            },
          },
        }}
        data={contractsData?.items || []}
        fetchRequest={getContractsOfMerchant as () => void}
        isLoading={loading}
        rowCount={contractsData?.totalCount}
      />
    </SectionLayoutContent>
  );
}

"use client";

import type { PagedResultDto_ContractHeaderDetailForMerchantDto } from "@ayasofyazilim/saas/ContractService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { useRouter } from "next/navigation";
import type { ContractServiceResource } from "src/language-data/ContractService";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import { tableData } from "./table-data";

export default function Contracts(props: {
  languageData: CRMServiceServiceResource & ContractServiceResource;
  contractsData: PagedResultDto_ContractHeaderDetailForMerchantDto;
  partyId: string;
  partyName: "merchants";
  lang: string;
}) {
  const router = useRouter();
  const columns = tableData.columns({ ...props });
  const table = tableData.table({ ...props, router });

  return (
    <SectionLayoutContent sectionId="contracts">
      <TanstackTable
        columns={columns}
        data={props.contractsData.items || []}
        {...table}
      />
    </SectionLayoutContent>
  );
}

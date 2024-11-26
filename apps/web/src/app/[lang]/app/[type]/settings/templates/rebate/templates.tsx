"use client";
import type { UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as RebateTableHeaderDto } from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as $RebateTableHeaderDto } from "@ayasofyazilim/saas/ContractService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import { tanstackTableCreateColumnsByRowData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import { useRouter } from "next/navigation";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";

export default function Templates({
  languageData,
  templates = [],
}: {
  languageData: ContractServiceResource;
  templates: RebateTableHeaderDto[];
}) {
  const router = useRouter();
  const columns = tanstackTableCreateColumnsByRowData<RebateTableHeaderDto>({
    rows: $RebateTableHeaderDto.properties,
    languageData: {
      constantKey: "RebateTables.Templates.Form",
      languageData,
    },
    links: {
      name: {
        prefix: `/app/admin/settings/templates/rebate`,
        targetAccessorKey: "id",
      },
    },
    badges: {
      name: {
        values: [
          {
            label: languageData["RebateTables.Templates.Form.isTemplate"],
            conditions: [
              {
                conditionAccessorKey: "isTemplate",
                when: (value) => value === true,
              },
            ],
          },
        ],
      },
    },
  });
  return (
    <TanstackTable
      columnVisibility={{
        type: "show",
        columns: ["name", "calculateNetCommissionInsteadOfRefund"],
      }}
      columns={columns}
      data={templates}
      fillerColumn="name"
      tableActions={[
        {
          actionLocation: "table",
          type: "simple",
          onClick: () => {
            router.push(getBaseLink(`app/admin/settings/templates/rebate/new`));
          },
          cta: languageData["RebateTables.Templates.Create"],
        },
      ]}
    />
  );
}

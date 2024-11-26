import type { UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as RebateTableHeaderDto } from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as $RebateTableHeaderDto } from "@ayasofyazilim/saas/ContractService";
import type {
  TanstackTableCreationProps,
  TanstackTableLanguageDataType,
} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import { tanstackTableCreateColumnsByRowData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import { PlusCircle } from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { ContractServiceResource } from "src/language-data/ContractService";

type RebateTableHeaders = TanstackTableCreationProps<RebateTableHeaderDto>;

const rebateTableHeadersColumns = (
  locale: string,
  languageData?: TanstackTableLanguageDataType,
) =>
  tanstackTableCreateColumnsByRowData<RebateTableHeaderDto>({
    rows: $RebateTableHeaderDto.properties,
    languageData,
    config: {
      locale,
    },
    links: {
      name: {
        prefix: `/app/admin/settings/templates/rebate`,
        targetAccessorKey: "id",
      },
    },
  });

const rebateTableHeadersTable = (params: {
  languageData: ContractServiceResource;
  router: AppRouterInstance;
}) => {
  const table: RebateTableHeaders = {
    fillerColumn: "name",
    columnVisibility: {
      type: "show",
      columns: ["name", "calculateNetCommissionInsteadOfRefund"],
    },
    tableActions: [
      {
        actionLocation: "table",
        type: "simple",
        icon: PlusCircle,
        onClick: () => {
          params.router.push(`rebate/new`);
        },
        cta: params.languageData["RebateTables.Templates.Create"],
      },
    ],
  };
  return table;
};

export const tableData = {
  rebateTableHeaders: {
    columns: rebateTableHeadersColumns,
    table: rebateTableHeadersTable,
  },
};

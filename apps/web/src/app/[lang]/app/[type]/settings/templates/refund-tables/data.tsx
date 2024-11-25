import type { UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto } from "@ayasofyazilim/saas/ContractService";
import { $PagedResultDto_RefundTableHeaderDto } from "@ayasofyazilim/saas/ContractService";
import type {
  TanstackTableCreationProps,
  TanstackTableLanguageDataType,
} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import { tanstackTableCreateColumnsByRowData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import { CheckCircle, PlusCircle, XCircle } from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type RefundTableHeaders =
  TanstackTableCreationProps<UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto>;

const booleanOptions = {
  options: [
    {
      value: "true",
      label: "",
      icon: CheckCircle,
      iconClassName: "text-green-700",
    },
    {
      value: "false",
      label: "",
      icon: XCircle,
      iconClassName: "text-red-700",
    },
  ],
};
const refundTableHeadersColumns = (
  locale: string,
  languageData?: TanstackTableLanguageDataType,
) =>
  tanstackTableCreateColumnsByRowData<UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto>(
    {
      rows: $PagedResultDto_RefundTableHeaderDto.properties.items.items
        .properties,
      languageData,
      config: {
        locale,
      },
      faceted: {
        isDefault: booleanOptions,
        isDeleted: booleanOptions,
        isBundling: booleanOptions,
      },
      links: {
        name: {
          prefix: `test`,
          targetAccessorKey: "id",
        },
      },
    },
  );

const refundTableHeadersTable = (params: {
  languageData?: Record<string, string>;
  router: AppRouterInstance;
}) => {
  const table: RefundTableHeaders = {
    fillerColumn: "name",
    columnVisibility: {
      type: "show",
      columns: [
        "name",
        "creationTime",
        "lastModificationTime",
        "isDefault",
        "isDeleted",
        "isBundling",
      ],
    },
    columnOrder: [
      "name",
      "creationTime",
      "lastModificationTime",
      "isDefault",
      "isBundling",
    ],
    tableActions: [
      {
        actionLocation: "table",
        cta: params.languageData?.New || "New",
        icon: PlusCircle,
        type: "simple",
        onClick: () => {
          params.router.push(`refund-tables/new`);
        },
      },
    ],
  };
  return table;
};

export const tableData = {
  refundTableHeaders: {
    columns: refundTableHeadersColumns,
    table: refundTableHeadersTable,
  },
};

import type { UniRefund_RefundService_Refunds_GetListAsync_RefundListItem } from "@ayasofyazilim/saas/RefundService";
import {
  $PagedResultDto_RefundListItem,
  $UniRefund_RefundService_Enums_RefundReconciliationStatus,
  $UniRefund_RefundService_Enums_RefundStatus,
  $UniRefund_TagService_Tags_RefundType,
} from "@ayasofyazilim/saas/RefundService";
import type {
  TanstackTableCreationProps,
  TanstackTableLanguageDataType,
} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import { tanstackTableCreateColumnsByRowData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";

type RefundTable =
  TanstackTableCreationProps<UniRefund_RefundService_Refunds_GetListAsync_RefundListItem>;

const refundColumns = (
  locale: string,
  languageData?: TanstackTableLanguageDataType,
) =>
  tanstackTableCreateColumnsByRowData<UniRefund_RefundService_Refunds_GetListAsync_RefundListItem>(
    {
      rows: $PagedResultDto_RefundListItem.properties.items.items.properties,
      languageData,
      config: {
        locale,
      },
    },
  );

const refundTable = (languageData?: Record<string, string>) => {
  const table: RefundTable = {
    fillerColumn: "userDeviceName",
    filters: {
      facetedFilters: {
        statusesFilterStatuses: {
          title: languageData?.Statuses || "Statuses",
          options: $UniRefund_RefundService_Enums_RefundStatus.enum.map(
            (x) => ({
              label: x,
              value: x,
            }),
          ),
        },
        statusesFilterReconciliationStatuses: {
          title:
            languageData?.ReconciliationStatuses || "ReconciliationStatuses",
          options:
            $UniRefund_RefundService_Enums_RefundReconciliationStatus.enum.map(
              (x) => ({
                label: x,
                value: x,
              }),
            ),
        },
        statusesFilterRefundTypes: {
          title: languageData?.RefundTypes || "RefundTypes",
          options: $UniRefund_TagService_Tags_RefundType.enum.map((x) => ({
            label: x,
            value: x,
          })),
        },
      },
      dateFilters: [
        {
          label: languageData?.CreationTime || "Creation Time",
          startAccessorKey: "timeFilterStartDate",
          endAccessorKey: "timeFilterEndDate",
        },
      ],
    },
  };
  return table;
};
export const tableData = {
  refund: {
    columns: refundColumns,
    table: refundTable,
  },
};

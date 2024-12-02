import { toast } from "@/components/ui/sonner";
import type { UniRefund_FinanceService_Billings_BillingDto } from "@ayasofyazilim/saas/FinanceService";
import { $PagedResultDto_BillingDto } from "@ayasofyazilim/saas/FinanceService";
import type { TanstackTableCreationProps } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import { tanstackTableCreateColumnsByRowData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import { Trash } from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { FinanceServiceResource } from "src/language-data/FinanceService";
import { deleteBillingApi } from "../../../actions/FinanceService/actions";

type BillingTable =
  TanstackTableCreationProps<UniRefund_FinanceService_Billings_BillingDto>;

const billingColumns = (locale: string, languageData: FinanceServiceResource) =>
  tanstackTableCreateColumnsByRowData<UniRefund_FinanceService_Billings_BillingDto>(
    {
      rows: $PagedResultDto_BillingDto.properties.items.items.properties,
      languageData: {
        languageData: languageData as Record<string, string>,
        constantKey: "Form",
      },
      config: {
        locale,
      },

      links: {
        merchantName: {
          prefix: "billing",
          targetAccessorKey: "id",
        },
      },
      badges: {
        merchantName: {
          values: [
            {
              label: languageData["Form.paymentStatus.PAID"],
              badgeClassName: "text-green-500 bg-green-100 border-green-500",
              conditions: [
                {
                  conditionAccessorKey: "paymentStatus",
                  when: (value) => value === "PAID",
                },
              ],
            },
            {
              label: languageData["Form.paymentStatus.NOTPAID"],
              badgeClassName: "text-red-500 bg-red-100 border-red-500",
              conditions: [
                {
                  conditionAccessorKey: "paymentStatus",
                  when: (value) => value === "NOTPAID",
                },
              ],
            },
            {
              label: languageData["Form.paymentStatus.PARTIALLYPAID"],
              badgeClassName: "text-orange-500 bg-orange-100 border-orange-500",
              conditions: [
                {
                  conditionAccessorKey: "paymentStatus",
                  when: (value) => value === "PARTIALLYPAID",
                },
              ],
            },
          ],
        },
      },
      faceted: {
        period: {
          options: [
            {
              label: languageData["Form.period.ONETIMEPERMONTH"],
              value: "ONETIMEPERMONTH",
            },
            {
              label: languageData["Form.period.TWOTIMESPERMONTH"],
              value: "TWOTIMESPERMONTH",
            },
            {
              label: languageData["Form.period.ONETIMEPERWEEK"],
              value: "ONETIMEPERWEEK",
            },
          ],
        },
        status: {
          options: [
            {
              label: languageData["Form.status.CANCELLED"],
              value: "CANCELLED",
            },
            {
              label: languageData["Form.status.CREDITNOTE"],
              value: "CREDITNOTE",
            },
            {
              label: languageData["Form.status.PAID"],
              value: "PAID",
            },
            {
              label: languageData["Form.status.SENT"],
              value: "SENT",
            },
            {
              label: languageData["Form.status.UNFINISHED"],
              value: "UNFINISHED",
            },
          ],
        },
      },
    },
  );

const billingTable = (
  router: AppRouterInstance,
  languageData: FinanceServiceResource,
) => {
  const table: BillingTable = {
    fillerColumn: "merchantName",
    columnVisibility: {
      type: "hide",
      columns: ["id", "merchantId", "paymentStatus"],
    },
    tableActions: [
      {
        type: "simple",
        actionLocation: "table",
        cta: languageData["Billing.New"],
        onClick: () => {
          router.push(`billing/new`);
        },
      },
    ],
    excludeColumns: ["id", "merchantId", "paymentStatus"],
    rowActions: [
      {
        actionLocation: "row",
        type: "confirmation-dialog",
        cta: languageData.Delete,
        confirmationText: languageData.Delete,
        cancelText: languageData.Cancel,
        description: languageData["Delete.Assurance"],
        icon: Trash,
        onConfirm: (row) => {
          void deleteBillingApi(row.id || "").then((response) => {
            if (response.type === "success") {
              toast.success(response.message || languageData["Delete.Success"]);
              router.refresh();
            } else {
              toast.error(response.message || languageData["Delete.Fail"]);
            }
          });
        },
        title: languageData["Billing.Delete"],
      },
    ],
  };
  return table;
};

export const tableData = {
  billing: {
    columns: billingColumns,
    table: billingTable,
  },
};

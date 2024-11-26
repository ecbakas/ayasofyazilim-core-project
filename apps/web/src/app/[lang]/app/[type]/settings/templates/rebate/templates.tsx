"use client";
import { toast } from "@/components/ui/sonner";
import type {
  PagedResultDto_RebateTableHeaderDto,
  UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as RebateTableHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as $RebateTableHeaderDto } from "@ayasofyazilim/saas/ContractService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import { tanstackTableCreateColumnsByRowData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import { useEffect, useState } from "react";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { getRebateTablesRebateTableHeadersTemplates } from "./action";

export default function Templates({
  languageData,
  // params,
}: {
  languageData: ContractServiceResource;
  // params: { lang: string; type: string };
}) {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] =
    useState<PagedResultDto_RebateTableHeaderDto>();
  const getAndSetTemplates = () => {
    setLoading(true);
    void getRebateTablesRebateTableHeadersTemplates({})
      .then((response) => {
        if (response.type === "success") {
          setTemplates(response.data);
        } else if (response.type === "api-error") {
          toast.error(response.message || "Templates loading failed");
        } else {
          toast.error("Fatal error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAndSetTemplates();
  }, []);

  const columns = tanstackTableCreateColumnsByRowData<RebateTableHeaderDto>({
    rows: $RebateTableHeaderDto.properties,
    languageData,
    links: {
      name: {
        prefix: `/app/admin/settings/templates/rebate`,
        targetAccessorKey: "id",
      },
    },
  });
  if (loading) return <>Loading</>;
  return (
    <TanstackTable
      columnVisibility={{
        type: "show",
        columns: [
          "name",
          "select",
          "calculateNetCommissionInsteadOfRefund",
          "isTemplate",
        ],
      }}
      columns={columns}
      data={templates?.items || []}
      fillerColumn="name"
    />
  );
}

"use client";

import type { PagedResultDto_RefundListItem } from "@ayasofyazilim/saas/RefundService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { tableData } from "./data";

function RefundTable({
  locale,
  response,
  languageData,
}: {
  locale: string;
  response: PagedResultDto_RefundListItem;
  languageData: ContractServiceResource;
}) {
  const columns = tableData.refund.columns(locale);
  const table = tableData.refund.table(languageData);

  return (
    <TanstackTable
      {...table}
      columns={columns}
      data={response.items || []}
      rowCount={response.totalCount}
    />
  );
}

export default RefundTable;

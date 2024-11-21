"use client";

import type { PagedResultDto_RefundListItem } from "@ayasofyazilim/saas/RefundService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import { tableData } from "./data";

function RefundTable({
  response,
}: {
  response: PagedResultDto_RefundListItem;
}) {
  const columns = tableData.refund.columns();
  const table = tableData.refund.table;

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

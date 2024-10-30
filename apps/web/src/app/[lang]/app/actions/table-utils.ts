"use server";

import type { FilterColumnResult } from "@repo/ayasofyazilim-ui/molecules/tables";
import type { GetTableDataTypes } from "./api-requests";
import { getTableData } from "./api-requests";

export const tableFetchRequest = async (
  type: GetTableDataTypes,
  page: number,
  filter?: FilterColumnResult,
) => {
  const response = await getTableData(type, page, 10, filter);
  if (response.type === "success") {
    const data = response.data;
    return {
      type: "success",
      data: { items: data.items || [], totalCount: data.totalCount || 0 },
    };
  }
  return {
    type: "error",
    data: { items: [], totalCount: 0 },
  };
};

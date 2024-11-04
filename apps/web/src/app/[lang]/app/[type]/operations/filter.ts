import type { GetApiTagServiceTagData } from "@ayasofyazilim/saas/TagService";
import {
  $UniRefund_TagService_Tags_RefundType,
  $UniRefund_TagService_Tags_TagStatusType,
} from "@ayasofyazilim/saas/TagService";
import type { ColumnFilter } from "@repo/ayasofyazilim-ui/molecules/tables";

export type FilterType = Partial<keyof GetApiTagServiceTagData>;
export type DetailedFilter = ColumnFilter & { name: FilterType };
export type TypedFilter = Partial<Record<FilterType, DetailedFilter>>;

export const CommonFilter: DetailedFilter[] = [
  {
    name: "tagNumber",
    displayName: "Tag Number",
    type: "string",
    value: "",
  },
  {
    name: "travellerDocumentNumber",
    displayName: "Traveller Document Number",
    type: "string",
    value: "",
  },
  {
    name: "travellerFullName",
    displayName: "Traveller Name",
    type: "string",
    value: "",
  },
  {
    name: "invoiceNumber",
    displayName: "Invoice Number",
    type: "string",
    value: "",
  },
  {
    name: "paidEndDate",
    displayName: "Paid End Date",
    type: "date",
    value: "",
  },
  {
    name: "issuedStartDate",
    displayName: "Issued Start Date",
    type: "date",
    value: "",
  },
  {
    name: "paidStartDate",
    displayName: "Paid Start Date",
    type: "date",
    value: "",
  },
  {
    name: "refundTypes",
    displayName: "Refund Types",
    type: "select",
    options: [
      ...$UniRefund_TagService_Tags_RefundType.enum.map((item) => ({
        label: item,
        value: item,
      })),
    ],
    placeholder: "Select Refund Type",
    value: "",
  },
  {
    name: "statuses",
    displayName: "Statuses",
    type: "select",
    value: "",
    options: [
      ...$UniRefund_TagService_Tags_TagStatusType.enum.map((item) => ({
        label: item,
        value: item,
      })),
    ],
    placeholder: "Select Status",
  },
  {
    name: "exportEndDate",
    displayName: "Export End Date",
    type: "date",
    value: "",
  },
  {
    name: "exportStartDate",
    displayName: "Export End Date",
    type: "date",
    value: "",
  },
  {
    name: "issuedEndDate",
    displayName: "Issued End Date",
    type: "date",
    value: "",
  },
  {
    name: "sorting",
    displayName: "Sorting",
    type: "select",
    value: "",
    options: [
      { label: "Ascending", value: "asc" },
      { label: "Descending", value: "desc" },
    ],
    placeholder: "Select Sorting",
  },
];

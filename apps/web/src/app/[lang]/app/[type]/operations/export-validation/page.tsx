"use server";
import type { GetApiExportValidationServiceExportValidationData } from "@ayasofyazilim/saas/ExportValidationService";
import {
  $UniRefund_ExportValidationService_ExportValidations_ExportValidationDto,
  $UniRefund_ExportValidationService_ExportValidations_ExportValidationStatusCode,
  $UniRefund_ExportValidationService_ExportValidations_StampTypeCode,
} from "@ayasofyazilim/saas/ExportValidationService";
import {
  $UniRefund_TagService_Tags_RefundType,
  $UniRefund_TagService_Tags_TagListItemDto,
  $UniRefund_TagService_Tags_TagStatusType,
} from "@ayasofyazilim/saas/TagService";
import type {
  ColumnFilter,
  FilterColumnResult,
} from "@repo/ayasofyazilim-ui/molecules/tables";
import TableComponent from "@repo/ui/TableComponent";
import { getResourceData } from "src/language-data/ExportValidationService";
import { deleteTableRow } from "../../../actions/api-requests";
import { tableFetchRequest } from "../../../actions/table-utils";
import { getTagsApi } from "../../../actions/TagService/actions";

export default async function Page({ params }: { params: { lang: string } }) {
  async function getTags(page: number, filter?: FilterColumnResult) {
    "use server";
    const response = await getTagsApi({
      maxResultCount: 10,
      skipCount: page * 10,
      ...filter,
    });
    if (response.type === "success") {
      return {
        type: "success",
        data: {
          items: response.data.items || [],
          totalCount: response.data.totalCount || 0,
        },
      };
    }
    return {
      type: response.type,
      data: { items: [], totalCount: 0 },
    };
  }
  const { languageData } = await getResourceData(params.lang);
  const { data } = await getTags(0);

  type FilterType = Partial<
    keyof GetApiExportValidationServiceExportValidationData
  >;
  type DetailedFilter = ColumnFilter & { name: FilterType };
  const filters: DetailedFilter[] = [
    {
      name: "tagIds",
      displayName: "Tag",
      type: "select-async",
      value: "",
      rowCount: data.totalCount,
      filterProperty: "id",
      showProperty: "tagNumber",
      data: data.items,
      columnDataType: {
        tableType: $UniRefund_TagService_Tags_TagListItemDto,
        excludeList: ["id"],
      },
      fetchRequest: getTags,
      detailedFilters: [
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
      ],
    },
    {
      name: "referenceId",
      displayName: "Reference Id",
      type: "string",
      value: "",
    },
    {
      name: "statuses",
      displayName: "Statuses",
      type: "select-multiple",
      value: "",
      multiSelectProps: {
        options: [
          ...$UniRefund_ExportValidationService_ExportValidations_ExportValidationStatusCode.enum.map(
            (item) => ({
              label: item,
              value: item,
            }),
          ),
        ],
      },
    },
    {
      name: "stampTypeCodes",
      displayName: "Stamp Type Codes",
      type: "select-multiple",
      value: "",
      multiSelectProps: {
        options: [
          ...$UniRefund_ExportValidationService_ExportValidations_StampTypeCode.enum.map(
            (item) => ({
              label: item,
              value: item,
            }),
          ),
        ],
      },
    },
    {
      name: "exportEndDate",
      displayName: "Export End Date",
      type: "date",
      value: "",
    },
    {
      name: "exportStartDate",
      displayName: "Export Start Date",
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

  return (
    <TableComponent
      createOnNewPage
      createOnNewPageTitle={languageData["ExportValidation.New"]}
      deleteRequest={async (id) => {
        "use server";
        const response = await deleteTableRow("export-validation", id);
        return response;
      }}
      deleteableRow
      detailedFilter={filters}
      editOnNewPage
      fetchRequest={(page, filter) => {
        "use server";
        return tableFetchRequest("export-validation", page, filter);
      }}
      languageData={languageData}
      tableSchema={{
        excludeList: [
          "tenantId",
          "isDeleted",
          "deleterId",
          "deletionTime",
          "lastModificationTime",
          "lastModifierId",
          "creationTime",
          "creatorId",
          "id",
        ],
        schema:
          $UniRefund_ExportValidationService_ExportValidations_ExportValidationDto,
      }}
    />
  );
}

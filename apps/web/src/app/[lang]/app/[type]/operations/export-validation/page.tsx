"use server";
import { $UniRefund_ExportValidationService_ExportValidations_ExportValidationDto } from "@ayasofyazilim/saas/ExportValidationService";
import TableComponent from "@repo/ui/TableComponent";
import { getResourceData } from "src/language-data/ExportValidationService";
import { deleteTableRow } from "../../../actions/api-requests";
import { tableFetchRequest } from "../../../actions/table-utils";

export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData } = await getResourceData(params.lang);

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

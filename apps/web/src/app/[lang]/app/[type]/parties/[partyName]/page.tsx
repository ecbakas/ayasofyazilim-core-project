"use server";

import TableComponent from "@repo/ui/TableComponent";
import { getResourceData } from "src/language-data/CRMService";
import { deleteTableRow } from "../../../actions/api-requests";
import { tableFetchRequest } from "../../../actions/table-utils";
import { dataConfigOfParties } from "../table-data";
import type { PartyNameType } from "../types";

export default async function Page({
  params,
}: {
  params: { partyName: PartyNameType; lang: string };
}) {
  const { languageData } = await getResourceData(params.lang);
  const formData = dataConfigOfParties[params.partyName];
  return (
    <TableComponent
      createOnNewPage
      createOnNewPageTitle={languageData[`${formData.translationKey}.New`]}
      deleteRequest={async (id) => {
        "use server";
        const response = await deleteTableRow(params.partyName, id);
        return response;
      }}
      deleteableRow={params.partyName !== "individuals"}
      detailedFilter={formData.detailedFilters}
      editOnNewPage={params.partyName !== "individuals"}
      fetchRequest={(page, filter) => {
        "use server";
        return tableFetchRequest(params.partyName, page, filter);
      }}
      languageData={languageData}
      tableSchema={formData.tableSchema}
    />
  );
}

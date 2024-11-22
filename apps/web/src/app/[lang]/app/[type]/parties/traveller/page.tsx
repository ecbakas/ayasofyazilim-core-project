"use server";
import TableComponent from "@repo/ui/TableComponent";
import { getResourceData } from "src/language-data/TravellerService";
import { tableFetchRequest } from "../../../actions/table-utils";
import { travellerTableSchema } from "./utils";
import { getTravellerFiltersServer } from "./utils.server";

export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData } = await getResourceData(params.lang);
  const filters = await getTravellerFiltersServer(params.lang);

  return (
    <TableComponent
      createOnNewPage
      createOnNewPageTitle={languageData[`Travellers.New`]}
      detailedFilter={filters}
      editOnNewPage
      fetchRequest={(page, filter) => {
        "use server";
        return tableFetchRequest("travellers", page, filter);
      }}
      languageData={languageData}
      tableSchema={travellerTableSchema}
    />
  );
}

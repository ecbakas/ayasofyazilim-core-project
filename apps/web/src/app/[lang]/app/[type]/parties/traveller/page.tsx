"use server";
import TableComponent from "@repo/ui/TableComponent";
import { getResourceData } from "src/language-data/TravellerService";
import { getCountriesApi } from "../../../actions/LocationService/actions";
import { tableFetchRequest } from "../../../actions/table-utils";
import { getTravellerFilters, travellerTableSchema } from "./utils";

export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData } = await getResourceData(params.lang);

  const nationalitiesResponse = await getCountriesApi();
  const nationalitiesData =
    nationalitiesResponse.type === "success"
      ? nationalitiesResponse.data.items || []
      : [];
  const filters = getTravellerFilters(languageData, nationalitiesData);
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

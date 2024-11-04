"use server";

import { getResourceData } from "src/language-data/TravellerService";
import { getCountriesApi } from "src/app/[lang]/app/actions/LocationService/actions";
import Form from "./form";

export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData } = await getResourceData(params.lang);
  const Countries = await getCountriesApi();
  const CountryList =
    (Countries.type === "success" && Countries.data.items) || [];

  return <Form countryList={CountryList} languageData={languageData} />;
}

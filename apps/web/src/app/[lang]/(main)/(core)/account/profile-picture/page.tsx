"use server";

import { getResourceData } from "src/language-data/core/AccountService";
import PersonalPicture from "./personal-picture";

export default async function Page(props: { params: { lang: string } }) {
  const { languageData } = await getResourceData(props.params.lang);
  return <PersonalPicture languageData={languageData} />;
}

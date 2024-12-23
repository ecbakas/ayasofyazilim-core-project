"use server";

import { getResourceData } from "src/language-data/core/AccountService";
import ChangePassword from "./change-passwod";

export default async function Page(props: { params: { lang: string } }) {
  const { languageData } = await getResourceData(props.params.lang);
  return <ChangePassword languageData={languageData} />;
}

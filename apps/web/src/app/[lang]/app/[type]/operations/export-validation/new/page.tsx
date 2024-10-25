"use server";

import { getCustomsApi } from "src/app/[lang]/app/actions/CrmService/actions";
import { getTagsApi } from "src/app/[lang]/app/actions/TagService/actions";
import { getResourceData } from "src/language-data/ExportValidationService";
import Form from "./form";

export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData } = await getResourceData(params.lang);
  const Customs = await getCustomsApi();
  const CustomsList = (Customs.type === "success" && Customs.data.items) || [];
  const Tag = await getTagsApi();
  const TagsList = (Tag.type === "success" && Tag.data.items) || [];
  return (
    <Form
      CustomsData={CustomsList}
      TagsData={TagsList}
      languageData={languageData}
    />
  );
}

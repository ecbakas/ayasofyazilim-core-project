"use server";

import { isCustomNodeSelected } from "@tiptap-location/lib/utils";
import Landing from "./landing";
import { getConfig } from "./layout";

export default async function Page() {
  let appName = process.env?.APPLICATION_NAME || "konya";
  let config = await getConfig(appName);
  return <Landing config={config} />;
}

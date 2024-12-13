import { RedirectType, permanentRedirect } from "next/navigation";
import { getBaseLink } from "src/utils";

export default function Page({
  params,
}: {
  params: { lang: string; type: string };
}) {
  permanentRedirect(
    getBaseLink(`app/${params.type}/settings/tenant/home`, true, params.lang),
    RedirectType.push,
  );
}

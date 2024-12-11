import { notFound } from "next/navigation";
import { getResourceData } from "src/language-data/ContractService";
import { getRefundTableHeadersById } from "src/app/[lang]/app/actions/ContractService/action";
import PagePolicy from "src/app/[lang]/page-policy/page-policy";
import Form from "./form";
import RefundTableDetailsForm from "./table";

export default async function Page({
  params,
}: {
  params: { lang: string; id: string };
}) {
  const response = await getRefundTableHeadersById({ id: params.id });
  if (response.type !== "success") return notFound();

  const { languageData } = await getResourceData(params.lang);

  return (
    <PagePolicy
      requiredPolicies={[
        "ContractService.RefundTableDetail.Create",
        "ContractService.RefundTableDetail.Edit",
        "ContractService.RefundTableDetail.Delete",
        "ContractService.RefundTableHeader.Create",
        "ContractService.RefundTableHeader.Edit",
        "ContractService.RefundTableHeader.Delete",
      ]}
    >
      <>
        <Form languageData={languageData} response={response.data} />
        <RefundTableDetailsForm
          languageData={languageData}
          response={response.data}
        />
        <div className="hidden" id="page-title">
          {response.data.name}
        </div>
        <div className="hidden" id="page-description">
          {languageData["RefundTables.Edit.Description"]}
        </div>
      </>
    </PagePolicy>
  );
}

"use server";
import TableComponent from "@repo/ui/TableComponent";
import { $UniRefund_FinanceService_Billings_BillingDto } from "@ayasofyazilim/saas/FinanceService";
import { getResourceData } from "src/language-data/FinanceService";
import { deleteTableRow } from "../../../actions/api-requests";
import { tableFetchRequest } from "../../../actions/table-utils";

export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData } = await getResourceData(params.lang);
  return (
    <TableComponent
      createOnNewPage
      createOnNewPageTitle={languageData["Billing.New"]}
      deleteRequest={async (id) => {
        "use server";
        const response = await deleteTableRow("billing", id);
        return response;
      }}
      deleteableRow
      editOnNewPage
      fetchRequest={(page) => {
        "use server";
        return tableFetchRequest("billing", page);
      }}
      languageData={languageData}
      tableSchema={{
        excludeList: ["id"],
        schema: $UniRefund_FinanceService_Billings_BillingDto,
      }}
    />
  );
}

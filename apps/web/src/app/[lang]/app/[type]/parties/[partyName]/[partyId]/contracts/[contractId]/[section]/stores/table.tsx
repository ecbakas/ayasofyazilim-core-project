"use client";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import { useParams } from "next/navigation";
import type { UniRefund_ContractService_ContractsForMerchant_ContractStores_ContractStoreDetailedDto as ContractStoreDetailedDto } from "@ayasofyazilim/saas/ContractService";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { tableData } from "./_components/table-data";

export function ContractStoresTable({
  languageData,
  contractStores,
}: {
  languageData: ContractServiceResource;
  contractStores: ContractStoreDetailedDto[];
}) {
  const { lang } = useParams<{ lang: string }>();
  const columns = tableData.columns({ lang, languageData });
  const table = tableData.table();

  return <TanstackTable columns={columns} data={contractStores} {...table} />;
}

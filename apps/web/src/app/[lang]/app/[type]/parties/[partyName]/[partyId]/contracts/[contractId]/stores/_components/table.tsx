"use client";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import { useParams } from "next/navigation";
import type {
  UniRefund_ContractService_ContractsForMerchant_ContractStores_ContractStoreDetailedDto as ContractStoreDetailedDto,
  UniRefund_ContractService_ContractsForMerchant_ContractSettings_ContractSettingDto as ContractSettingDto,
} from "@ayasofyazilim/saas/ContractService";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { tableData } from "./table-data";

export function ContractStoresTable({
  languageData,
  contractStores,
  contractSettings,
}: {
  languageData: ContractServiceResource;
  contractStores: ContractStoreDetailedDto[];
  contractSettings: ContractSettingDto[];
}) {
  const { lang } = useParams<{ lang: string }>();
  const columns = tableData.columns({
    lang,
    languageData,
    contractSettings,
  });
  const table = tableData.table();
  const [updatedData, setUpdatedData] = useState<ContractStoreDetailedDto[]>(
    [],
  );
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <TanstackTable
        columns={columns}
        data={contractStores}
        editable
        onTableDataChange={(data) => {
          setUpdatedData(data);
        }}
        {...table}
      />
      <Button className="w-full max-w-lg" disabled={updatedData.length === 0}>
        {languageData.Save}
      </Button>
    </div>
  );
}

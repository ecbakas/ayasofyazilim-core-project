import type { UniRefund_ContractService_ContractsForMerchant_ContractStores_ContractStoreDetailedDto as ContractStoreDetailedDto } from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_ContractsForMerchant_ContractStores_ContractStoreDetailedDto as $ContractStoreDetailedDto } from "@ayasofyazilim/saas/ContractService";
import type { TanstackTableCreationProps } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import { tanstackTableCreateColumnsByRowData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import type { ContractServiceResource } from "src/language-data/ContractService";

const contractStoresTableColumns = ({
  languageData,
  lang,
}: {
  languageData: ContractServiceResource;
  lang: string;
}) => {
  return tanstackTableCreateColumnsByRowData<ContractStoreDetailedDto>({
    rows: $ContractStoreDetailedDto.properties,
    config: { locale: lang },
    languageData: {
      constantKey: "Contracts",
      languageData,
    },
  });
};

const contractsTable = () => {
  const table: TanstackTableCreationProps<ContractStoreDetailedDto> = {
    fillerColumn: "name",
    columnVisibility: {
      type: "show",
      columns: [
        "name",
        "fullAddress",
        "manager",
        "contractSetting",
        "receiptType",
      ],
    },
  };
  return table;
};

export const tableData = {
  columns: contractStoresTableColumns,
  table: contractsTable,
};

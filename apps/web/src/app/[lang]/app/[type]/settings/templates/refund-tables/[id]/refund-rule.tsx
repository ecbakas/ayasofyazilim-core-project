import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailCreateDto as RefundTableDetailCreateDto,
  UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto as RefundTableDetailDto,
  UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailUpdateDto as RefundTableDetailUpdateDto,
} from "@ayasofyazilim/saas/ContractService";
import {
  $UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailCreateDto as postRulesSchema,
  $UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto as rulesSchema,
  $UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailUpdateDto as updateRulesSchema,
} from "@ayasofyazilim/saas/ContractService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import type {
  ColumnsType,
  TableAction,
} from "@repo/ayasofyazilim-ui/molecules/tables/types";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { useEffect, useState } from "react";
import type { ContractServiceResource } from "src/language-data/ContractService";
import {
  deleteRefundTableHeadersDetailById,
  postRefundTableHeadersDetailById,
  putRefundTableRefundTableDetailsById,
} from "../../refund/action";

export function RefundRules({
  languageData,
  data,
  isLoading,
  params,
  refreshData,
}: {
  isLoading: boolean;
  languageData: ContractServiceResource;
  data: RefundTableDetailDto[];
  refreshData: () => void;
  params: {
    id: string;
    lang: string;
  };
}): JSX.Element {
  const includeList = [
    "vatRate",
    "minValue",
    "maxValue",
    "refundAmount",
    "refundPercent",
  ];
  const [tableData, setTableData] = useState<RefundTableDetailDto[] | []>(data);
  const [loading, setLoading] = useState(isLoading);
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const createRule: TableAction = {
    type: "Dialog",
    autoFormArgs: {
      formSchema: createZodObject(postRulesSchema),
      fieldConfig: {
        refundTableHeaderId: {
          containerClassName: "sr-only",
        },
      },
      values: {
        refundTableHeaderId: params.id,
      },
      submit: { cta: languageData["RefundTables.Details.Create.Submit"] },
    },
    cta: languageData["RefundTables.Details.Create.Title"],
    callback: (formData: RefundTableDetailCreateDto) => {
      setLoading(true);
      void postRefundTableHeadersDetailById({
        id: params.id,
        requestBody: formData,
      })
        .then((response) => {
          if (response.type === "success") {
            toast.success("Refund table rule created successfully");
          } else if (response.type === "api-error") {
            toast.error(
              response.message || "Refund table rule creation failed",
            );
          } else {
            toast.error("Fatal error");
          }
        })
        .finally(() => {
          setLoading(false);
          refreshData();
        });
    },
    componentType: "Autoform",
    description: languageData["RefundTables.Details.Create.Description"],
  };

  const handleRefundTableHeadersDelete = (row: RefundTableDetailDto) => {
    setLoading(true);
    void deleteRefundTableHeadersDetailById({
      id: row.id || "",
    })
      .then((response) => {
        if (response.type === "success") {
          toast.success("Rule deleted successfully");
        } else if (response.type === "api-error") {
          toast.error("Rule deletion failed");
        } else {
          toast.error("Fatal error");
          toast.warning(`row ${row.id}`);
        }
      })
      .finally(() => {
        refreshData();
      });
  };
  const handleRefundTableHeadersEdit = (
    formData: RefundTableDetailUpdateDto,
    originalRow: unknown,
  ) => {
    void putRefundTableRefundTableDetailsById({
      id: (originalRow as RefundTableDetailDto).id || "",
      requestBody: formData,
    })
      .then((response) => {
        if (response.type === "success") {
          toast.success("Refund table rule updated successfully");
        } else if (response.type === "api-error") {
          toast.error(response.message || "Refund table rule update failed");
        } else {
          toast.error("Fatal error");
        }
      })
      .finally(() => {
        refreshData();
      });
  };
  const columnsData: ColumnsType = {
    type: "Auto",
    data: {
      tableType: rulesSchema,
      excludeList: [],
      positions: includeList,
      actionList: [
        {
          type: "Dialog",
          cta: "Edit",
          autoFormArgs: {
            formSchema: createZodObject(updateRulesSchema),
            fieldConfig: {
              id: { containerClassName: "hidden" },
              refundTableHeaderId: { containerClassName: "hidden" },
              isLoyalty: {
                inputProps: { required: false },
              },
            },
            values: { refundTableHeaderId: params.id },
            submit: {
              cta: languageData["RefundTables.Details.Edit.Title"],
            },
          },
          callback: handleRefundTableHeadersEdit,
          componentType: "Autoform",
          description: languageData["RefundTables.Details.Edit.Description"],
        },
        {
          type: "Action",
          cta: languageData["RefundTables.Details.Delete"],
          callback: handleRefundTableHeadersDelete,
        },
      ],
    },
  };
  return (
    <DataTable
      action={createRule}
      classNames={{
        container: "h-auto",
        table: {
          container: "h-auto",
          wrapper: "flex-none",
        },
      }}
      columnsData={columnsData}
      data={tableData}
      detailedFilter={[
        {
          name: "vatRate",
          displayName: "Vat Rate",
          placeholder: "Filter by vat rate",
          type: "select",
          value: "",
          options: [
            {
              label: "%1",
              value: "1",
            },
            {
              label: "%8",
              value: "8",
            },
            {
              label: "%18",
              value: "18",
            },
          ],
        },
      ]}
      fetchRequest={({ filter }) => {
        if (Object.keys(filter).length === 0) {
          setTableData(data);
        } else {
          Object.keys(filter).forEach((filterKey: string) => {
            const filteredTable = data.filter(
              (
                tableItem: RefundTableDetailDto,
              ): null | RefundTableDetailDto => {
                if (
                  tableItem[
                    filterKey as keyof RefundTableDetailDto
                  ]?.toString() === filter[filterKey]
                ) {
                  return tableItem;
                }
                return null;
              },
            );
            setTableData(filteredTable);
          });
        }
      }}
      isLoading={loading}
    />
  );
}

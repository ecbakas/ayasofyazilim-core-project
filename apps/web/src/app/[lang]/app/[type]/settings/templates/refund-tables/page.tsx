"use client";
import { toast } from "@/components/ui/sonner";
import type {
  PagedResultDto_RefundTableHeaderDto,
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderCreateDto,
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import {
  $UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto as listSchema,
  $UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderCreateDto as postSchema,
} from "@ayasofyazilim/saas/ContractService";
import type {
  ColumnsType,
  TableAction,
} from "@repo/ayasofyazilim-ui/molecules/tables/types";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getResourceDataClient } from "src/language-data/ContractService";
import { createZodObject, getBaseLink } from "src/utils";
import {
  getRefundTableHeaders,
  postRefundTableHeaders,
} from "../refund/action";

export default function Page({ params }: { params: { lang: string } }) {
  const router = useRouter();
  const [list, setList] = useState<PagedResultDto_RefundTableHeaderDto>();
  const languageData = getResourceDataClient(params.lang);
  const includeList = [
    "name",
    "validFrom",
    "validTo",
    "isDefault",
    "isBundling",
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    void getRefundTableHeaders({})
      .then((response) => {
        if (response.type === "success") {
          setList(response.data);
          return;
        }
        toast.error(response.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const action: TableAction = {
    cta: languageData["RefundTables.Create.Title"],
    type: "Dialog",
    autoFormArgs: {
      formSchema: createZodObject(postSchema, includeList),
      submit: {
        cta: languageData["RefundTables.Create.Title"],
      },
    },
    componentType: "Autoform",
    description: languageData["RefundTables.Create.Description"],

    callback: (
      data: UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderCreateDto,
    ) => {
      void postRefundTableHeaders({
        requestBody: data,
      })
        .then((response) => {
          setLoading(true);
          if (response.type === "success") {
            toast.success(
              response.message || "Refund table created successfully",
            );
            router.push(
              getBaseLink(
                `app/admin/settings/templates/refund-tables/${response.data.id}`,
              ),
            );
          } else {
            toast.error(response.message || "Refund table creation failed");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
  };
  const tableActions: TableAction[] = [
    {
      type: "Action",
      cta: languageData["RefundTables.Details"],
      callback: (
        row: UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto,
      ) => {
        router.push(
          getBaseLink(`app/admin/settings/templates/refund-tables/${row.id}`),
        );
      },
    },
  ];
  const columnsData: ColumnsType = {
    type: "Auto",
    data: {
      tableType: listSchema,
      excludeList: [],
      positions: includeList.concat("lastModifierId", "lastModificationTime"),
      actionList: tableActions,
    },
  };
  return (
    <DataTable
      action={action}
      classNames={{
        table: {
          container: "h-auto",
        },
      }}
      columnsData={columnsData}
      data={loading ? [] : list?.items || []}
      isLoading={loading}
    />
  );
}

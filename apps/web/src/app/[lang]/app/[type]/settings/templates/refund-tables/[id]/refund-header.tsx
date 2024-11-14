"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto as RefundTableDetailDto,
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto as RefundTableHeaderDto,
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderUpdateDto as RefundTableHeaderUpdateDto,
} from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderUpdateDto as editSchema } from "@ayasofyazilim/saas/ContractService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ayasofyazilim-ui/atoms/alert-dialog";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";
import {
  deleteRefundTableHeadersById,
  getRefundTableHeadersById,
  putRefundTableHeadersById,
} from "../../refund/action";
import { RefundRules } from "./refund-rule";

export default function RefundHeader({
  languageData,
  params,
}: {
  languageData: ContractServiceResource;
  params: { lang: string; id: string; type: string };
}): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSaveable, setIsSaveable] = useState(false);
  const [details, setDetails] = useState<RefundTableHeaderDto>();
  const [tableData, setTableData] = useState<RefundTableDetailDto[] | []>([]);
  const router = useRouter();

  const getAndSetDetails = () => {
    setLoading(true);
    void getRefundTableHeadersById({ id: params.id }).then((response) => {
      if (response.type === "success") {
        setDetails(response.data);
        setTableData(response.data.refundTableDetails || []);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getAndSetDetails();
  }, []);

  const handleRefundTableHeadersDelete = () => {
    setLoading(true);
    void deleteRefundTableHeadersById({
      id: params.id,
    }).then((response) => {
      if (response.type === "success") {
        toast.success("Refund table deleted successfully");
      } else {
        toast.error("Refund table deletion failed");
      }
    });
    setDialogOpen(false);
    router.push(getBaseLink("app/admin/settings/templates/refund-tables"));
  };
  const handleRefundTableHeadersEdit = (data: unknown) => {
    //unknown is necessary because get types nullable
    setLoading(true);
    void putRefundTableHeadersById({
      id: params.id,
      requestBody: data as RefundTableHeaderUpdateDto,
    })
      .then((response) => {
        if (response.status === 200 && response.data) {
          toast.success(
            response.message || "Refund table updated successfully",
          );
        } else {
          toast.error(response.message || "Refund table update failed");
        }
      })
      .finally(() => {
        getAndSetDetails();
      });
  };
  return (
    <ScrollArea>
      <div className="h-full space-y-4">
        <AutoForm
          className="grid grid-cols-2 items-start gap-4 space-y-0"
          fieldConfig={{
            name: {
              containerClassName: "block col-span-2",
            },
            validFrom: {
              containerClassName: "h-full bg-red-200",
              inputProps: {
                disabled: true,
                required: false,
              },
            },
            validTo: {
              containerClassName: "h-full bg-red-200",
              inputProps: {
                disabled: true,
                required: false,
              },
            },
            isDefault: { fieldType: "switch" },
            isBundling: { fieldType: "switch" },
          }}
          formClassName="h-max overflow-hidden"
          formSchema={createZodObject(editSchema, [
            "name",
            "isDefault",
            "isBundling",
            //those line above will be implemented with saas
          ])}
          isLoading={loading}
          onParsedValuesChange={() => {
            setIsSaveable(true);
          }}
          onSubmit={handleRefundTableHeadersEdit}
          values={details}
        >
          <div className="flex w-full items-center justify-end gap-4">
            {loading ? (
              <>
                <Skeleton className="inline-flex h-9 w-28" />
                <Skeleton className="inline-flex h-9 w-28" />
              </>
            ) : (
              <>
                <AlertDialog open={dialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setDialogOpen(true);
                      }}
                      variant="outline"
                    >
                      {languageData["RefundTables.Delete"]}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {languageData["RefundTables.Delete.Title"]}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {languageData["RefundTables.Delete.Description"]}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => {
                          setDialogOpen(false);
                        }}
                      >
                        {languageData["RefundTables.Delete.Cancel"]}
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleRefundTableHeadersDelete}
                      >
                        {languageData["RefundTables.Delete.Continue"]}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  disabled={!isSaveable}
                  type="submit"
                  variant={isSaveable ? "default" : "secondary"}
                >
                  {languageData["RefundTables.Save"]}
                </Button>
              </>
            )}
          </div>
        </AutoForm>
        <RefundRules
          data={tableData}
          isLoading={loading}
          languageData={languageData}
          params={params}
          refreshData={getAndSetDetails}
        />
      </div>
    </ScrollArea>
  );
}

"use client";

import { toast } from "@/components/ui/sonner";
import type { PagedResultDto_IdentitySessionDto } from "@ayasofyazilim/saas/AccountService";
import { $Volo_Abp_Identity_IdentitySessionDto } from "@ayasofyazilim/saas/IdentityService";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { useState } from "react";
import {
  deleteUserSessionsApi,
  getUserSessionsApi,
} from "src/app/[lang]/app/actions/IdentityService/actions";
import { getResourceDataClient } from "src/language-data/IdentityService";

export default function SessionsComponent({
  rowId,
  lang,
}: {
  rowId: string;
  lang: string;
}) {
  const languageData = getResourceDataClient(lang);
  const [sessionsData, setSessionsData] =
    useState<PagedResultDto_IdentitySessionDto>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getSessions = async () => {
    setIsLoading(true);
    const response = await getUserSessionsApi({
      userId: rowId,
    });
    if (response.type === "error" || response.type === "api-error") {
      toast.error(
        `${response.status}: ${response.message || languageData["User.Sessions.Get.Fail"]}`,
      );
      return;
    }
    setSessionsData(response.data);
    setIsLoading(false);
  };

  return (
    <DataTable
      columnsData={{
        type: "Auto",
        data: {
          tableType: $Volo_Abp_Identity_IdentitySessionDto,
          excludeList: [
            "id",
            "sessionId",
            "isCurrent",
            "tenantId",
            "tenantName",
            "userId",
            "userName",
            "clientId",
          ],
          actionList: [
            {
              cta: languageData["User.Sessions.Detail"],
              type: "Action",
              callback: () => {
                toast.warning(languageData["User.Sessions.Detail.Empty"]);
              },
            },
            {
              cta: languageData["User.Sessions.Revoke"],
              type: "Action",
              callback: (row: { id: string }) => {
                void deleteUserSessionsApi(row.id).then((response) => {
                  if (
                    response.type === "error" ||
                    response.type === "api-error"
                  ) {
                    toast.error(
                      `${response.status}: ${response.message || languageData["User.Sessions.Revoke.Fail"]}`,
                    );
                  } else {
                    toast.success(languageData["User.Sessions.Revoke.Success"]);
                  }
                });
              },
            },
          ],
        },
      }}
      data={sessionsData?.items || []}
      fetchRequest={void getSessions}
      isLoading={isLoading}
      rowCount={sessionsData?.totalCount || 0}
      showView
    />
  );
}

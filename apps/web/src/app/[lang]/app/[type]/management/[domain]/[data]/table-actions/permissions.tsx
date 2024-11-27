"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";
import type {
  Volo_Abp_PermissionManagement_UpdatePermissionDto,
  Volo_Abp_PermissionManagement_PermissionGrantInfoDto,
  Volo_Abp_PermissionManagement_PermissionGroupDto,
} from "@ayasofyazilim/saas/AdministrationService";
import Progress from "@repo/ayasofyazilim-ui/molecules/progress";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getPermissionsApi } from "src/app/[lang]/app/actions/AdministrationService/actions";
import { putPermissionsApi } from "src/app/[lang]/app/actions/AdministrationService/put-actions";
import { getResourceDataClient } from "src/language-data/IdentityService";

type NormalizedPermissionGroup = Omit<
  Volo_Abp_PermissionManagement_PermissionGroupDto,
  "permissions"
> & {
  permissions: Volo_Abp_PermissionManagement_PermissionGrantInfoDto[];
};

export default function PermissionsComponent({
  rowId,
  params,
  roleName,
}: {
  rowId: string;
  params: {
    lang: string;
    data: string;
  };
  roleName: string;
}) {
  const router = useRouter();
  const languageData = getResourceDataClient(params.lang);
  const [permissionsData, setPermissionsData] = useState<
    NormalizedPermissionGroup[]
  >([]);

  useEffect(() => {
    async function fetchPermissions() {
      const providerKey = params.data === "user" ? rowId : roleName;
      const providerName = params.data === "user" ? "U" : "R";
      const response = await getPermissionsApi({
        providerKey,
        providerName,
      });

      if (response.type === "success") {
        const normalizedGroups: NormalizedPermissionGroup[] =
          response.data.groups?.map((group) => ({
            ...group,
            permissions: group.permissions ?? [],
          })) || [];
        setPermissionsData(normalizedGroups);
      } else {
        toast.error(
          `${response.status}: ${
            response.message || languageData["Permissions.Get.Fail"]
          }`,
        );
      }
    }
    void fetchPermissions();
  }, [rowId, roleName, params.data, params.lang]);

  const updatePermissions = async () => {
    const formattedPermissions: Volo_Abp_PermissionManagement_UpdatePermissionDto[] =
      permissionsData.flatMap((group) =>
        group.permissions.map((permission) => ({
          name: permission.name || "",
          isGranted: permission.isGranted,
        })),
      );
    const providerKey = params.data === "user" ? rowId : roleName;
    const providerName = params.data === "user" ? "U" : "R";
    const response = await putPermissionsApi({
      providerKey,
      providerName,
      requestBody: {
        permissions: formattedPermissions,
      },
    });

    if (response.type === "success") {
      toast.success(
        response.message || languageData["Permissions.Update.Success"],
      );
      router.refresh();
    } else {
      toast.error(
        `${response.status}: ${
          response.message || languageData["Permissions.Update.Fail"]
        }`,
      );
    }
  };

  const togglePermission = useCallback(
    (groupName: string, permissionName: string) => {
      setPermissionsData((prevData) =>
        prevData.map((group) => {
          if (group.name === groupName) {
            return {
              ...group,
              permissions: group.permissions.map((permission) =>
                permission.name === permissionName
                  ? { ...permission, isGranted: !permission.isGranted }
                  : permission,
              ),
            };
          }
          return group;
        }),
      );
    },
    [],
  );

  const toggleGroupPermissions = (groupName: string, isGranted: boolean) => {
    setPermissionsData((prevData) =>
      prevData.map((group) => {
        if (group.name === groupName) {
          return {
            ...group,
            permissions: group.permissions.map((permission) => ({
              ...permission,
              isGranted,
            })),
          };
        }
        return group;
      }),
    );
  };

  const toggleAllPermissions = (isGranted: boolean) => {
    setPermissionsData((prevData) =>
      prevData.map((group) => ({
        ...group,
        permissions: group.permissions.map((permission) => ({
          ...permission,
          isGranted,
        })),
      })),
    );
  };

  const renderPermissions = useCallback(
    (groupName: string, parentName: string | null) => {
      const group = permissionsData.find(
        (currentGroup) => currentGroup.name === groupName,
      );
      if (!group) return null;

      const permissions = group.permissions.filter(
        (permission) => permission.parentName === parentName,
      );

      return (
        <div className={parentName ? "ml-8" : "ml-8"}>
          {permissions.map((permission) => (
            <div className="mb-2 gap-2" key={permission.name}>
              <Checkbox
                checked={permission.isGranted || false}
                className="mr-2"
                onCheckedChange={() => {
                  togglePermission(groupName, permission.name || "");
                }}
              />
              <span>{permission.displayName}</span>
              {renderPermissions(groupName, permission.name || "")}
            </div>
          ))}
        </div>
      );
    },
    [permissionsData, togglePermission],
  );

  if (!permissionsData.length) {
    return <Progress value={100} variant="success" />;
  }

  return (
    <div className="relative flex h-screen flex-col justify-between pb-20">
      <div className="mt-4 flex items-center gap-2 pb-2">
        <Checkbox
          checked={permissionsData.every((group) =>
            group.permissions.every((p) => p.isGranted),
          )}
          onCheckedChange={(checked) => {
            toggleAllPermissions(Boolean(checked));
          }}
        />
        <span className="text-sm font-medium">
          {languageData["Grant.All.Permissions"]}
        </span>
      </div>

      <SectionLayout
        sections={permissionsData.map((group) => ({
          name: `${group.displayName} (${
            group.permissions.filter((p) => p.isGranted).length
          })`,
          id: group.name || "",
        }))}
        vertical
      >
        {permissionsData.map((group) => (
          <SectionLayoutContent key={group.name} sectionId={group.name || ""}>
            <div className="flex items-center gap-2 ">
              <Checkbox
                checked={group.permissions.every((p) => p.isGranted)}
                onCheckedChange={(checked) => {
                  toggleGroupPermissions(group.name || "", Boolean(checked));
                }}
              />
              <span className="text-sm font-medium">
                {languageData["Select.All"]}
              </span>
            </div>
            <div className="my-2 border-t border-gray-200" />
            {renderPermissions(group.name || "", null)}
          </SectionLayoutContent>
        ))}
      </SectionLayout>

      <div className="bottom-0 left-0 flex w-full justify-end bg-white p-4 shadow-md">
        <Button onClick={() => void updatePermissions()} variant="default">
          {languageData["Edit.Save"]}
        </Button>
      </div>
    </div>
  );
}

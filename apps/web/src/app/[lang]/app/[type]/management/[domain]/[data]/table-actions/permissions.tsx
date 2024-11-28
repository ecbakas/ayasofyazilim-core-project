"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";
import type {
  Volo_Abp_PermissionManagement_PermissionGrantInfoDto,
  Volo_Abp_PermissionManagement_PermissionGroupDto,
  Volo_Abp_PermissionManagement_UpdatePermissionDto,
} from "@ayasofyazilim/saas/AdministrationService";
import Progress from "@repo/ayasofyazilim-ui/molecules/progress";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
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
  const languageData = getResourceDataClient(params.lang);
  const [permissionsData, setPermissionsData] = useState<
    NormalizedPermissionGroup[]
  >([]);
  const [updatedPermissions, setUpdatedPermissions] = useState<
    Volo_Abp_PermissionManagement_UpdatePermissionDto[]
  >([]);
  const [loadingError, setLoadingError] = useState(false);
  const isUserPage = params.data === "user";

  useEffect(() => {
    async function fetchPermissions() {
      const providerKey = isUserPage ? rowId : roleName;
      const providerName = isUserPage ? "U" : "R";
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
        setLoadingError(false);
      } else {
        setLoadingError(true);
        toast.error(
          `${response.status}: ${
            response.message || languageData["Permissions.Get.Fail"]
          }`,
        );
      }
    }
    void fetchPermissions();
  }, [rowId, roleName, isUserPage, params.lang]);

  const handleUpdatePermissions = async () => {
    const providerKey = isUserPage ? rowId : roleName;
    const providerName = isUserPage ? "U" : "R";
    const response = await putPermissionsApi({
      providerKey,
      providerName,
      requestBody: {
        permissions: updatedPermissions,
      },
    });

    if (response.type === "success") {
      toast.success(
        response.message || languageData["Permissions.Update.Success"],
      );
      window.location.reload();
    } else {
      toast.error(
        `${response.status}: ${
          response.message || languageData["Permissions.Update.Fail"]
        }`,
      );
    }
  };

  const updateChangedPermission = (
    permissionName: string,
    isGranted: boolean,
  ) => {
    setUpdatedPermissions((prevPermissions) => {
      const existingPermissionIndex = prevPermissions.findIndex(
        (p) => p.name === permissionName,
      );
      if (existingPermissionIndex >= 0) {
        const updatedPermissionsList = [...prevPermissions];
        updatedPermissionsList[existingPermissionIndex] = {
          name: permissionName,
          isGranted,
        };
        return updatedPermissionsList;
      }
      return [...prevPermissions, { name: permissionName, isGranted }];
    });
  };

  const togglePermission = useCallback(
    (groupName: string, permissionName: string) => {
      setPermissionsData((prevData) =>
        prevData.map((group) => {
          if (group.name === groupName) {
            return {
              ...group,
              permissions: group.permissions.map((permission) => {
                const hasRoleProvider = permission.grantedProviders?.some(
                  (provider) => provider.providerName === "R",
                );

                if (isUserPage && hasRoleProvider) return permission;

                if (permission.name === permissionName) {
                  const updatedPermission = {
                    ...permission,
                    isGranted: !permission.isGranted,
                  };
                  updateChangedPermission(
                    permissionName,
                    updatedPermission.isGranted,
                  );
                  if (!updatedPermission.isGranted) {
                    updateChildPermissions(groupName, permissionName, false);
                  } else {
                    updateParentPermissions(
                      groupName,
                      permission.parentName || "",
                      true,
                    );
                  }
                  return updatedPermission;
                }
                return permission;
              }),
            };
          }
          return group;
        }),
      );
    },
    [isUserPage],
  );

  const updateChildPermissions = (
    groupName: string,
    parentName: string,
    isGranted: boolean,
  ) => {
    setPermissionsData((prevData) =>
      prevData.map((group) => {
        if (group.name === groupName) {
          return {
            ...group,
            permissions: group.permissions.map((permission) => {
              if (
                permission.parentName === parentName &&
                (!isUserPage ||
                  !permission.grantedProviders?.some(
                    (provider) => provider.providerName === "R",
                  ))
              ) {
                updateChangedPermission(permission.name || "", isGranted);
                return {
                  ...permission,
                  isGranted,
                };
              }
              return permission;
            }),
          };
        }
        return group;
      }),
    );
  };

  const updateParentPermissions = (
    groupName: string,
    parentName: string | null,
    isGranted: boolean,
  ) => {
    if (!parentName) return;
    setPermissionsData((prevData) =>
      prevData.map((group) => {
        if (group.name === groupName) {
          return {
            ...group,
            permissions: group.permissions.map((permission) => {
              if (
                permission.name === parentName &&
                (!isUserPage ||
                  !permission.grantedProviders?.some(
                    (provider) => provider.providerName === "R",
                  ))
              ) {
                const updatedPermission = {
                  ...permission,
                  isGranted,
                };
                updateChangedPermission(
                  parentName,
                  updatedPermission.isGranted,
                );
                updateParentPermissions(
                  groupName,
                  permission.parentName || "",
                  isGranted,
                );
                return updatedPermission;
              }
              return permission;
            }),
          };
        }
        return group;
      }),
    );
  };

  const toggleGroupPermissions = (groupName: string, isGranted: boolean) => {
    setPermissionsData((prevData) =>
      prevData.map((group) => {
        if (group.name === groupName) {
          return {
            ...group,
            permissions: group.permissions.map((permission) => {
              const hasRoleProvider = permission.grantedProviders?.some(
                (provider) => provider.providerName === "R",
              );
              if (isUserPage && hasRoleProvider) {
                return permission;
              }
              return {
                ...permission,
                isGranted,
              };
            }),
          };
        }
        return group;
      }),
    );
    const groupPermissions = permissionsData.find(
      (group) => group.name === groupName,
    );
    if (groupPermissions) {
      groupPermissions.permissions.forEach((permission) => {
        const hasRoleProvider = permission.grantedProviders?.some(
          (provider) => provider.providerName === "R",
        );
        if (!isUserPage || !hasRoleProvider) {
          updateChangedPermission(permission.name || "", isGranted);
        }
      });
    }
  };

  const toggleAllPermissions = (isGranted: boolean) => {
    setPermissionsData((prevData) =>
      prevData.map((group) => ({
        ...group,
        permissions: group.permissions.map((permission) => {
          const hasRoleProvider = permission.grantedProviders?.some(
            (provider) => provider.providerName === "R",
          );
          if (isUserPage && hasRoleProvider) {
            return permission;
          }
          return {
            ...permission,
            isGranted,
          };
        }),
      })),
    );
    setUpdatedPermissions(() => {
      const allPermissions = permissionsData.flatMap((group) =>
        group.permissions
          .filter((permission) => {
            const hasRoleProvider = permission.grantedProviders?.some(
              (provider) => provider.providerName === "R",
            );
            return !isUserPage || !hasRoleProvider;
          })
          .map((permission) => ({
            name: permission.name || "",
            isGranted,
          })),
      );
      return allPermissions;
    });
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
          {permissions.map((permission) => {
            const hasRoleProvider = permission.grantedProviders?.some(
              (provider) => provider.providerName === "R",
            );

            return (
              <div className="mb-2 gap-2" key={permission.name}>
                <Checkbox
                  checked={permission.isGranted || false}
                  className="mr-2"
                  disabled={isUserPage ? hasRoleProvider : undefined}
                  onCheckedChange={() => {
                    togglePermission(groupName, permission.name || "");
                  }}
                />
                <span>{permission.displayName}</span>
                {renderPermissions(groupName, permission.name || "")}
              </div>
            );
          })}
        </div>
      );
    },
    [permissionsData, togglePermission, isUserPage],
  );

  if (!permissionsData.length) {
    return (
      <Progress value={100} variant={loadingError ? "error" : "success"} />
    );
  }

  return (
    <div className="relative flex h-screen flex-col justify-between pb-20">
      <div className="mt-4 flex items-center gap-2 pb-2">
        <Checkbox
          checked={permissionsData.every((group) =>
            group.permissions.every((p) => p.isGranted),
          )}
          disabled={
            isUserPage
              ? permissionsData.every((group) =>
                  group.permissions.every((p) =>
                    p.grantedProviders?.some(
                      (provider) => provider.providerName === "R",
                    ),
                  ),
                )
              : undefined
          }
          onCheckedChange={(checked) => {
            toggleAllPermissions(checked === true);
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
                disabled={
                  isUserPage
                    ? group.permissions.every((p) =>
                        p.grantedProviders?.some(
                          (provider) => provider.providerName === "R",
                        ),
                      )
                    : undefined
                }
                onCheckedChange={(checked) => {
                  toggleGroupPermissions(group.name || "", checked === true);
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
        <Button
          onClick={() => void handleUpdatePermissions()}
          variant="default"
        >
          {languageData["Edit.Save"]}
        </Button>
      </div>
    </div>
  );
}

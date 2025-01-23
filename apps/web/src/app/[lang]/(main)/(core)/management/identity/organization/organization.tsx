"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type {
  PagedResultDto_OrganizationUnitWithDetailsDto,
  Volo_Abp_Identity_OrganizationUnitWithDetailsDto,
} from "@ayasofyazilim/saas/IdentityService";
import { $Volo_Abp_Identity_OrganizationUnitCreateDto } from "@ayasofyazilim/saas/IdentityService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import type { TableActionCustomDialog } from "@repo/ayasofyazilim-ui/molecules/dialog";
import AutoformDialog from "@repo/ayasofyazilim-ui/molecules/dialog";
import { TreeView } from "@repo/ayasofyazilim-ui/molecules/tree-view";
import { useRouter } from "next/navigation";
import type { TreeViewElement } from "node_modules/@repo/ayasofyazilim-ui/src/molecules/tree-view/tree-view-api";
import { useState } from "react";
import { handlePostResponse } from "src/actions/core/api-utils-client";
import { postOrganizationUnitsApi } from "src/actions/core/IdentityService/post-actions";
import type { IdentityServiceResource } from "src/language-data/core/IdentityService";

function getChildrens(
  parentId: string,
  data: Volo_Abp_Identity_OrganizationUnitWithDetailsDto[],
) {
  const childrens: TreeViewElement[] = [];
  data
    .filter((i) => i.parentId === parentId)
    .forEach((i) => {
      const childData: TreeViewElement = {
        id: i.id || "",
        name: i.displayName || "",
        children: [],
        isSelectable: true,
      };
      childData.children = getChildrens(i.id || "", data);
      childrens.push(childData);
    });
  return childrens;
}

export default function OrganizationComponent({
  languageData,
  organizationUnitList,
}: {
  languageData: IdentityServiceResource;
  organizationUnitList: PagedResultDto_OrganizationUnitWithDetailsDto;
}) {
  const initializeOrganizationTree = () => {
    const parentUnits =
      organizationUnitList.items?.filter((i) => !i.parentId) || [];
    return parentUnits.map((parent) => ({
      id: parent.id || "",
      name: parent.displayName || "",
      children: getChildrens(parent.id || "", organizationUnitList.items || []),
      isSelectable: true,
    }));
  };
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState<string | undefined>();
  const [triggerData, setTriggerData] = useState<
    Record<string, string> | undefined
  >(undefined);
  const [organizationTreeElements, setOrganizationTreeElements] = useState<
    TreeViewElement[]
  >(initializeOrganizationTree());
  const [organizationUnits, setOrganizationUnits] = useState<
    Volo_Abp_Identity_OrganizationUnitWithDetailsDto[]
  >(organizationUnitList.items || []);
  const [action, setAction] = useState<TableActionCustomDialog | undefined>(
    undefined,
  );

  const handleAddUnit = (parentUnitId: string | null) => {
    const selectedUnit = parentUnitId
      ? organizationUnits.find((i) => i.id === parentUnitId)
      : null;
    setAction({
      type: "Dialog",
      componentType: "Autoform",
      cta: "New organization unit",
      description: selectedUnit
        ? `Parent: ${selectedUnit.displayName}`
        : "Create a new organization unit",
      autoFormArgs: {
        formSchema: createZodObject(
          $Volo_Abp_Identity_OrganizationUnitCreateDto,
          ["displayName"],
        ),
        fieldConfig: {
          all: {
            withoutBorder: true,
          },
        },
      },
      callback: (e: { displayName: string }, _triggerData) => {
        void postOrganizationUnitsApi({
          requestBody: {
            displayName: e.displayName,
            parentId: parentUnitId,
          },
        }).then((res) => {
          handlePostResponse(res, router);
          if (res.type === "success") {
            setOrganizationUnits([...organizationUnits, res.data]);
            setOrganizationTreeElements(initializeOrganizationTree());
            setTriggerData({});
            setOpen(false);
          }
        });
      },
    });
    setTriggerData({ id: parentUnitId || "" });
    setOpen(true);
  };

  return (
    <>
      <div className="flex min-h-[60vh] w-full flex-row">
        <Card className="m-2 max-h-[70vh] w-1/2 overflow-y-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl">Organization Tree</h2>
              <Button
                className="bg-primary rounded px-4 py-2 text-white"
                onClick={() => {
                  setSelectedUnitId(undefined);
                  setTriggerData({});
                  handleAddUnit(null);
                }}
              >
                + Add root unit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {organizationUnits.length > 0 ? (
              <TreeView
                elements={organizationTreeElements}
                optionsDropdownContent={
                  <>
                    <DropdownMenuItem>{languageData.Edit}</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleAddUnit(selectedUnitId || "");
                      }}
                    >
                      Add Sub-unit
                    </DropdownMenuItem>
                    <DropdownMenuItem>Move all Users</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </>
                }
                selectedId={selectedUnitId}
                setSelectedId={setSelectedUnitId}
              />
            ) : (
              <p>No organization units available</p>
            )}
          </CardContent>
        </Card>
      </div>
      {open
        ? action !== undefined && (
            <AutoformDialog
              action={action}
              onOpenChange={setOpen}
              open={open}
              triggerData={triggerData}
            />
          )
        : null}
    </>
  );
}

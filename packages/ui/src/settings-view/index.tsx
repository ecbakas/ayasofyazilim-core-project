"use client";
import {
  UniRefund_SettingService_Bonds_BondDto,
  UniRefund_SettingService_CountrySettings_CountrySettingDto,
  UniRefund_SettingService_Groups_GroupDto,
  UniRefund_SettingService_Items_GroupItemDto,
} from "@ayasofyazilim/saas/SettingService";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ayasofyazilim-ui/atoms/tooltip";
import {
  JsonSchema,
  SchemaType,
  createZodObject,
} from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
  Dependency,
  DependencyType,
  FieldConfig,
  ZodObjectOrWrapped,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { TabLayout } from "@repo/ayasofyazilim-ui/templates/tab-layout";
import { usePathname } from "next/navigation";

export type AllowedValueTypeModelNameStringEnum =
  | "ToggleStringValueType"
  | "FreeTextStringValueType"
  | "SelectionStringValueType"
  | "BooleanValueType"
  | "NumericValueType"
  | ""
  | null;

export function isGroupDto(
  object: any,
): object is UniRefund_SettingService_Groups_GroupDto {
  return "isEnabled" in object;
}

function createConfig(
  item: UniRefund_SettingService_Items_GroupItemDto,
  resources: any,
) {
  const key = item?.key || "";
  let config = {
    [key]: {
      description: description(
        resources?.SettingService?.texts?.[item?.description || ""] ??
          item.description,
      ),
      displayName:
        resources?.SettingService?.texts?.[item?.displayName || ""] ??
        item.displayName,
    },
  };

  if (
    item?.valueType?.name &&
    convertValueTypeNameToFieldType(
      item.valueType.name as AllowedValueTypeModelNameStringEnum,
    )
  ) {
    const key = item?.key || "";
    Object.assign(config, {
      [key]: {
        fieldType: convertValueTypeNameToFieldType(
          item.valueType.name as AllowedValueTypeModelNameStringEnum,
        ),
        displayName:
          resources?.SettingService?.texts?.[item?.displayName || ""] ??
          item.displayName,
      },
    });
  }
  return config;
}
function subField(
  item: UniRefund_SettingService_Items_GroupItemDto,
  resources: any,
) {
  if (item.subItems && item.subItems.length > 0) {
    let subitemconfigs = item.subItems.map(
      (subitem: UniRefund_SettingService_Items_GroupItemDto) => {
        if (subitem.subItems && subitem.subItems.length > 0) {
          let subsubitemconfigs = subitem.subItems.map(
            (subsubitem: UniRefund_SettingService_Items_GroupItemDto) => {
              return createConfig(subsubitem, resources);
            },
          );
          const key = subitem?.key || "";
          return {
            [key]: {
              ...Object.assign({}, ...Object.values(subsubitemconfigs)),
              displayName:
                resources?.SettingService?.texts?.[
                  subitem?.displayName || ""
                ] ?? subitem.displayName,
              description: description(
                resources?.SettingService?.texts?.[
                  subitem?.description || ""
                ] ?? subitem.description,
              ),
            },
          };
        }
        return createConfig(subitem, resources);
      },
    );
    const key = item?.key || "";
    let subs = {
      [key]: {
        ...Object.assign({}, ...Object.values(subitemconfigs)),
        displayName:
          resources?.SettingService?.texts?.[item?.displayName || ""] ??
          item.displayName,
        description: description(
          resources?.SettingService?.texts?.[item?.description || ""] ??
            item.description,
        ),
      },
    };
    return subs;
  } else {
    return createConfig(item, resources);
  }
}
function createFieldConfig(
  object: UniRefund_SettingService_Groups_GroupDto,
  resources: any,
): FieldConfig<{ [x: string]: any }> {
  let configs = object?.items?.map(
    (item: UniRefund_SettingService_Items_GroupItemDto) => {
      if (item.subItems && item.subItems.length > 0) {
        return subField(item, resources);
      } else {
        return createConfig(item, resources);
      }
    },
  );
  let config = Object.assign({}, ...Object.values(configs || {}));
  return config;
}

type createBondType = {
  bonds: UniRefund_SettingService_Bonds_BondDto[];
  targetField: string;
  parentField?: string;
};
type bondType = {
  sourceField: string;
  targetField: string;
  type?: DependencyType;
  hasParentField: boolean;
  when: (val: any) => boolean;
};

function createSafeRegex(val: any, pattern: string | undefined | null) {
  let x = val;
  try {
    x = new RegExp(pattern || "").test(val);
  } catch (error) {
    x = "";
  } finally {
    return x;
  }
}
function createBonds(sett: createBondType): bondType[] {
  return sett.bonds.map((bond) => {
    let sourceField = sett.parentField
      ? `${sett.parentField}.${bond.key}`
      : bond.key;
    let createdBond: bondType = {
      sourceField: sourceField ?? "", //bond.key is not nullable fix it
      targetField: sett.targetField,
      type: bond.type as DependencyType,
      hasParentField: sett.parentField ? true : false,
      when: (val: any) => createSafeRegex(val, bond.pattern),
    };
    return createdBond;
  });
}
function createDependencies(
  group: UniRefund_SettingService_Groups_GroupDto,
): Dependency<{ [x: string]: any }>[] {
  let bonds = group?.items?.map(
    (item: UniRefund_SettingService_Items_GroupItemDto) => {
      if (item.subItems && item.subItems.length > 0) {
        let subitembonds = item.subItems.map(
          (subitem: UniRefund_SettingService_Items_GroupItemDto) => {
            return createBonds({
              bonds: subitem.bonds || [],
              targetField: subitem.key || "",
              parentField: item.key || "",
            });
          },
        );
        let x = createBonds({
          bonds: item.bonds || [],
          targetField: item.key || "",
        });
        subitembonds.push(x);
        return subitembonds.filter((bond: bondType[]) => bond).flat();
      } else {
        if (item.bonds && item.bonds.length > 0) {
          return createBonds({
            bonds: item.bonds,
            targetField: item.key || "",
          });
        }
      }
    },
  );
  // @ts-ignore
  return bonds.filter((x) => x).flat();
}
function convertValueTypeNameToFieldType(
  type: AllowedValueTypeModelNameStringEnum,
) {
  switch (type) {
    case "ToggleStringValueType":
      return "switch";
    case "FreeTextStringValueType":
    case "SelectionStringValueType":
    default:
      return undefined;
  }
}
function convertValueTypeNameToSchemaType(
  type: AllowedValueTypeModelNameStringEnum | undefined,
) {
  switch (type) {
    case "ToggleStringValueType":
      return "boolean";
    case "FreeTextStringValueType":
      return "string";
    case "SelectionStringValueType":
      return "select";
    case "BooleanValueType":
      return "boolean";
    default:
      return "string";
  }
}
function createProperties(
  item: UniRefund_SettingService_Items_GroupItemDto,
): any {
  const key = item?.key || "";
  if (!item.valueType) return;
  if (item.subItems && item.subItems.length > 0)
    return { [key]: createSchema(undefined, item) };
  return {
    [key]: createJsonSchema(item),
  };
}
//Creates item & parent schema
function createSchema(
  group?: UniRefund_SettingService_Groups_GroupDto,
  item?: UniRefund_SettingService_Items_GroupItemDto,
): SchemaType {
  var properties: any = {};
  if (group) {
    properties = Object.assign(
      {},
      ...(group?.items?.map(
        (item: UniRefund_SettingService_Items_GroupItemDto) => {
          return createProperties(item);
        },
      ) || []),
    );
  } else if (item) {
    if (item.subItems && item.subItems.length > 0) {
      //appliable ve child var
    }
    if (item.subItems && item.subItems.length > 0) {
      properties = Object.assign(
        {},
        ...(item.subItems.map(
          (subitem: UniRefund_SettingService_Items_GroupItemDto) => {
            return createProperties(subitem);
          },
        ) || []),
      );
    }
  }
  const key = (group ? group.key : item ? item.key : "") || "";
  return {
    displayName: key,
    required: [key],
    type: "object",
    properties: properties,
    additionalProperties: false,
  };
}
//Creates item schema
function createJsonSchema(
  item: UniRefund_SettingService_Items_GroupItemDto,
): JsonSchema {
  let schema: JsonSchema = {
    type: convertValueTypeNameToSchemaType(
      item.valueType?.name as AllowedValueTypeModelNameStringEnum,
    ),
    isRequired: item.isRequired ?? false,
    isReadOnly: item.isActive ?? false,
    maxLength: item.valueType?.validator?.properties?.maxValue,
    default: item.defaultValue,
    displayName: (item.displayName ?? item.key) || "",
  };
  if (item.valueType && item.valueType.name === "SelectionStringValueType") {
    schema = {
      ...schema,
      enum: item.valueType?.itemSource?.items?.map((x: any) => x.value),
    };
  }
  return schema;
}

function description(text: string) {
  if (!text) return text;
  if (text.length < 100)
    return <div className="text-muted-foreground text-sm">{text}</div>;
  return (
    <Tooltip>
      <TooltipTrigger className="text-muted-foreground">
        {text.substring(0, 100) + "..."}
      </TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  );
}

export function SettingsView({
  list,
  tabList,
  resources,
  onSubmit,
}: {
  list: UniRefund_SettingService_CountrySettings_CountrySettingDto;
  tabList: Array<{
    label: string;
    href: string;
  }>;
  resources?: any;
  onSubmit: (data: any) => void;
}) {
  if (!list || !list.groups || !list.isEnabled) return null;
  const pathname = usePathname();
  const activeGroup = list.groups.find(
    (x) => x.key === pathname.split("/").at(-1),
  );
  if (!activeGroup) return null;
  let schema = createSchema(activeGroup);
  const formSchema = createZodObject(
    schema,
    activeGroup.items?.map(
      (item: UniRefund_SettingService_Items_GroupItemDto) => item.key,
    ) || [],
  ) as ZodObjectOrWrapped;
  const fieldConfig = createFieldConfig(activeGroup, resources);
  const dependencies = createDependencies(activeGroup);
  return (
    <TabLayout tabList={tabList}>
      <AutoForm
        className="w-full"
        formSchema={formSchema}
        onSubmit={(data) => {
          onSubmit({
            countrySettings: Object.keys(data).map((key) => {
              return {
                key: key,
                value: data[key],
              };
            }),
          });
        }}
        fieldConfig={fieldConfig}
        dependencies={dependencies}
        stickyChildren
      >
        <AutoFormSubmit className="float-right" />
      </AutoForm>
    </TabLayout>
  );
}

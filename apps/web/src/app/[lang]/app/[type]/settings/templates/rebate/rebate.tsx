/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument -- TODO: we need to fix this*/
"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderCreateDto as RebateTableHeaderCreateDto,
  UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as RebateTableHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderUpdateDto as RebateTableHeaderUpdateSchema } from "@ayasofyazilim/saas/ContractService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import Button from "@repo/ayasofyazilim-ui/molecules/button";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ContractServiceResource } from "src/language-data/ContractService";

function NameCell({
  getValue,
  row: { index },
  column: { id },
  table,
  placeholder,
}: any) {
  const name = getValue() || "";
  const [value, setValue] = useState(name);

  const onBlur = (): void => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(name);
  }, [name]);

  return (
    <Input
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      placeholder={placeholder}
      type="text"
      value={value as string}
    />
  );
}

function AmountCell({
  getValue,
  row: { index },
  column: { id },
  table,
  placeholder,
}: any) {
  const amount = getValue();
  const [value, setValue] = useState(amount);

  const onBlur = (): void => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(amount);
  }, [amount]);

  return (
    <Input
      min={0}
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      placeholder={placeholder}
      type="number"
      value={value as number}
    />
  );
}

const feescolumns = ({
  languageData,
}: {
  languageData: ContractServiceResource;
}) => {
  return [
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          aria-label="Select all"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(Boolean(value));
          }}
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={() => {
            row.toggleSelected();
          }}
        />
      ),
    },
    {
      accessorKey: "name",
      header: () => (
        <div className="text-center">
          {languageData["RebateTables.Templates.Column.Name"]}
        </div>
      ),
      cell: (props: any) => (
        <NameCell
          {...props}
          placeholder={languageData["RebateTables.Templates.Column.Name"]}
        />
      ),
    },
    {
      accessorKey: "amount",
      header: () => (
        <div className="text-center">
          {languageData["RebateTables.Templates.Column.Amount"]}
        </div>
      ),
      cell: (props: any) => (
        <AmountCell
          {...props}
          placeholder={languageData["RebateTables.Templates.Column.Amount"]}
        />
      ),
    },
    {
      accessorKey: "actions",
      enableHiding: false,
      cell: ({ row, table }: any) => (
        <Button
          onClick={() => {
            table.options.meta?.removeRow(
              row.index,
              languageData["RebateTables.Templates.Column.Actions"],
              null,
            );
          }}
          variant="ghost"
        >
          <Trash2Icon className="h-4 w-4 text-red-500" />
        </Button>
      ),
    },
  ];
};

function SetupCell({
  getValue,
  row: { index },
  column: { id },
  table,
  languageData,
}: any) {
  const setupValue = getValue() as string | undefined;
  const [value, setValue] = useState<string | undefined>(setupValue || "");

  const onChange = (newValue: string): void => {
    setValue(newValue);
    table.options.meta?.updateData(index, id, newValue);
  };

  useEffect(() => {
    setValue(setupValue || "");
  }, [setupValue]);

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full text-center">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">
          {languageData["RebateTables.Templates.RefundMethod.Option.All"]}
        </SelectItem>
        <SelectItem value="CASH">
          {languageData["RebateTables.Templates.RefundMethod.Option.Cash"]}
        </SelectItem>
        <SelectItem value="CREDITORDEBITCARD">
          {
            languageData[
              "RebateTables.Templates.RefundMethod.Option.CreditOrDebitCard"
            ]
          }
        </SelectItem>
        <SelectItem value="ALIPAY">
          {languageData["RebateTables.Templates.RefundMethod.Option.Alipay"]}
        </SelectItem>
        <SelectItem value="WECHAT">
          {languageData["RebateTables.Templates.RefundMethod.Option.WeChat"]}
        </SelectItem>
        <SelectItem value="CASHVIAPARTNER">
          {
            languageData[
              "RebateTables.Templates.RefundMethod.Option.CashViaPartner"
            ]
          }
        </SelectItem>
        <SelectItem value="REFUNDLATER">
          {
            languageData[
              "RebateTables.Templates.RefundMethod.Option.RefundLater"
            ]
          }
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

function Fixedfee({ getValue, row: { index }, column: { id }, table }: any) {
  const fixedFeeValue = getValue();
  const [value, setValue] = useState(fixedFeeValue);
  const onBlur = (): void => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(fixedFeeValue);
  }, [fixedFeeValue]);

  return (
    <Input
      min={0}
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type="number"
      value={value}
    />
  );
}

function Variablefee({ getValue, row: { index }, column: { id }, table }: any) {
  const variableFeeValue = getValue() as string | undefined;
  const [value, setValue] = useState<string | undefined>(
    variableFeeValue || "",
  );
  const onChange = (newValue: string): void => {
    setValue(newValue);
    table.options.meta?.updateData(index, id, newValue);
  };

  useEffect(() => {
    setValue(variableFeeValue || "");
  }, [variableFeeValue]);
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full text-center">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PERCENTOFGC">% of GC</SelectItem>
        <SelectItem value="PERCENTOFGCWITHOUTVAT">
          % of GC without VAT
        </SelectItem>
        <SelectItem value="PERCENTOVAT">% of VAT</SelectItem>
        <SelectItem value="PERCENTOSIS">% of SIS</SelectItem>
      </SelectContent>
    </Select>
  );
}

function PercentCell({ getValue, row: { index }, column: { id }, table }: any) {
  const percentValue = getValue();
  const [value, setValue] = useState(percentValue);

  const onBlur = (): void => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(percentValue);
  }, [percentValue]);

  return (
    <Input
      min={0}
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type="number"
      value={value as string}
    />
  );
}

const setupcolumns = ({
  languageData,
}: {
  languageData: ContractServiceResource;
}) => {
  return [
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          aria-label="Select all"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(Boolean(value));
          }}
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      accessorKey: "refundMethod",
      header: () => (
        <div className="text-center">
          {languageData["RebateTables.Templates.Column.RefundMethod"]}
        </div>
      ),
      cell: (props: any) => (
        <SetupCell {...props} languageData={languageData} />
      ),
    },
    {
      accessorKey: "fixedFeeValue",
      header: () => (
        <div className="text-center">
          {languageData["RebateTables.Templates.Column.FixedFee"]}
        </div>
      ),
      cell: (props: any) => <Fixedfee {...props} />,
    },
    {
      accessorKey: "variableFee",
      header: () => (
        <div className="text-center">
          {languageData["RebateTables.Templates.Column.VariableFee"]}
        </div>
      ),
      cell: (props: any) => <Variablefee {...props} />,
    },
    {
      accessorKey: "percentFeeValue",
      header: () => (
        <div className="text-center">
          %{languageData["RebateTables.Templates.Column.Percent"]}
        </div>
      ),
      cell: (props: any) => <PercentCell {...props} />,
    },
    {
      accessorKey: "actions",
      enableHiding: false,
      cell: ({ row, table }: any) => (
        <Button
          onClick={() => {
            table.options.meta?.removeRow(
              row.index,
              languageData["RebateTables.Templates.Column.Actions"],
              null,
            );
          }}
          variant="ghost"
        >
          <Trash2Icon className="h-4 w-4 text-red-500" />
        </Button>
      ),
    },
  ];
};
interface Test {
  refundMethod: string;
  fixedFeeValue: number;
  variableFee: string;
  percentFeeValue: number;
}
export default function Rebate({
  type = "Create",
  languageData,
  initialFeesData = [],
  initialSetupData = [],
  details,
  onSubmit,
}: {
  type?: "Create" | "Edit";
  languageData: ContractServiceResource;
  initialFeesData: any[];
  initialSetupData: any[];
  details?: RebateTableHeaderDto;
  onSubmit: (data: RebateTableHeaderCreateDto) => void;
}) {
  const formSchema = createZodObject(RebateTableHeaderUpdateSchema, [
    "name",
    "validFrom",
    "validTo",
    "calculateNetCommissionInsteadOfRefund",
  ]);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const triggerSubmit = () => {
    buttonRef.current && buttonRef.current.click();
  };

  const [feesData, setFeesData] = useState<any[]>(initialFeesData);
  const [setupData, setSetupData] = useState<any[]>(initialSetupData);
  const handleSubmit = (newFormData: unknown): void => {
    const filteredFeesData = feesData.filter((row) => !isRowEmpty(row));
    const filteredSetupData = setupData.filter((row) => !isRowEmpty(row));

    const payload: RebateTableHeaderCreateDto = {
      ...(newFormData as Pick<
        RebateTableHeaderCreateDto,
        "name" | "calculateNetCommissionInsteadOfRefund"
      >),
      processingFeeDetails: filteredFeesData,
      rebateTableDetails: filteredSetupData,
    };
    onSubmit(payload);
  };

  const isRowEmpty = (row: any): boolean => {
    return Object.values(row).every((value) => value === "" || value === null);
  };
  const feesHeaders = { name: "", amount: "" };

  const setupHeaders = {
    refundMethod: "",
    fixedFeeValue: 0,
    variableFee: "",
    percentFeeValue: 0,
  };

  return (
    <div className="flex h-full w-full flex-row ">
      <Card className="m-0 w-full overflow-auto border-0 bg-transparent pb-16 shadow-none">
        <CardHeader className="flex flex-row items-center gap-2 text-2xl font-bold">
          <EditIcon className="w-6 text-slate-600" />
          {type === "Edit"
            ? languageData["RebateTables.Templates.Edit.TemplateInformation"]
            : languageData["RebateTables.Templates.Create.TemplateInformation"]}
        </CardHeader>
        <CardContent>
          <AutoForm
            className="grid grid-cols-2 gap-4 space-y-0"
            fieldConfig={{
              withoutBorder: { fieldType: "switch" },
              name: {
                containerClassName: "col-span-2",
              },
              calculateNetCommissionInsteadOfRefund: {
                fieldType: "switch",
              },
            }}
            formSchema={formSchema}
            onSubmit={handleSubmit}
            values={details}
          >
            <button className="hidden" ref={buttonRef} />
          </AutoForm>

          <div className="mt-4">
            <div className="relative flex items-center">
              <span className="text-lg font-medium">
                {type === "Edit"
                  ? languageData["RebateTables.Templates.Edit.ProcessingFees"]
                  : languageData[
                      "RebateTables.Templates.Create.ProcessingFees"
                    ]}
              </span>
              <div className="ml-4 flex-grow border-t border-gray-300" />
            </div>
            <div className="overflow-auto">
              <DataTable
                Headertable={feesHeaders}
                classNames={{
                  table: {
                    container: "h-auto",
                  },
                }}
                columnsData={{
                  type: "Custom",
                  data: { columns: feescolumns({ languageData }) },
                }}
                data={feesData}
                editable
                onDataUpdate={(data) => {
                  setFeesData(data);
                }}
                showView={false}
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="relative flex items-center">
              <span className="text-lg font-medium">
                {type === "Edit"
                  ? languageData["RebateTables.Templates.Edit.RebateSetup"]
                  : languageData["RebateTables.Templates.Create.RebateSetup"]}
              </span>
              <div className="ml-4 flex-grow border-t border-gray-300" />
            </div>
            <div className="overflow-auto">
              <DataTable
                Headertable={setupHeaders}
                classNames={{
                  table: {
                    container: "h-auto",
                  },
                }}
                columnsData={{
                  type: "Custom",
                  data: {
                    columns: setupcolumns({ languageData }),
                  },
                }}
                data={setupData}
                editable
                onDataUpdate={(data: Test[]) => {
                  data.map((row) => {
                    return {
                      ...row,
                      fixedFeeValue: Number(row.fixedFeeValue),
                      percentFeeValue: Number(row.percentFeeValue),
                    };
                  });
                  setSetupData(data);
                }}
                showView={false}
              />
            </div>
          </div>

          <div className="sticky bottom-0 z-10 mt-4 flex justify-end gap-5">
            {/* <Button className=" w-40 ">              {type === "Edit"
                ? languageData["RebateTables.Templates.Edit.Cancel"]
                : languageData["RebateTables.Templates.Create.Cancel"]}</Button> */}
            <Button className="w-40" onClick={triggerSubmit}>
              {type === "Edit"
                ? languageData["RebateTables.Templates.Edit.Save"]
                : languageData["RebateTables.Templates.Create.Save"]}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantCreateDto as ContractHeaderForMerchantCreateDto,
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantUpdateDto as ContractHeaderForMerchantUpdateDto,
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto as RefundTableHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import {
  $UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantCreateDto as $ContractHeaderForMerchantCreateDto,
  $UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantUpdateDto as $ContractHeaderForMerchantUpdateDto,
} from "@ayasofyazilim/saas/ContractService";
import type { UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressTypeDto } from "@ayasofyazilim/saas/LocationService";
import { Combobox } from "@repo/ayasofyazilim-ui/molecules/combobox";
import { SchemaForm } from "@repo/ayasofyazilim-ui/organisms/schema-form";
import { createUiSchemaWithResource } from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import { toastOnSubmit } from "@repo/ui/toast-on-submit";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRefundTableHeaders } from "src/app/[lang]/app/[type]/settings/templates/refund/action";
import { postMerchantContractHeadersByMerchantIdApi } from "src/app/[lang]/app/actions/ContractService/action";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";
import { MerchantAddressWidget, RefundTableWidget } from "./contract-widgets";

interface BaseContractHeaderFormProps<TForm> {
  partyName: "merchants";
  partyId: string;
  languageData: ContractServiceResource;
  addresses: AddressTypeDto[];
  //   basicInformation: MerchantBasicInformationDto;
  formData?: TForm;
  formType: "Create" | "Update";
}

const isUpdateForm = (
  obj:
    | ContractHeaderForMerchantCreateDto
    | ContractHeaderForMerchantUpdateDto
    | Record<string, never>,
): obj is ContractHeaderForMerchantUpdateDto => "status" in obj;
const isCreateForm = (
  obj:
    | ContractHeaderForMerchantCreateDto
    | ContractHeaderForMerchantUpdateDto
    | Record<string, never>,
): obj is ContractHeaderForMerchantCreateDto => !("status" in obj);

export default function ContractHeaderForm<
  TForm extends
    | ContractHeaderForMerchantCreateDto
    | ContractHeaderForMerchantUpdateDto,
>(props: BaseContractHeaderFormProps<TForm>): JSX.Element {
  const { formType, languageData, partyName, partyId, addresses } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [addressList] = useState<AddressTypeDto[]>(addresses);

  const [defaultRefundTableHeader, setDefaultRefundTableHeader] = useState<
    RefundTableHeaderDto | null | undefined
  >();
  const [defaultRefundTableHeaderMessage, setDefaultRefundTableHeaderMessage] =
    useState<string | undefined>();
  const [selectedRefundTableHeaders, setSelectedRefundTableHeaders] = useState<
    RefundTableHeaderDto[] | undefined
  >([]);
  const [refundTableHeaders, setRefundTableHeaders] =
    useState<RefundTableHeaderDto[]>();
  const [formData, setFormData] = useState<TForm | undefined>(
    formType === "Update" ? props.formData : undefined,
  );

  async function handleContractHeaderSubmit() {
    try {
      if (formData && isCreateForm(formData)) {
        const postResponse = await postMerchantContractHeadersByMerchantIdApi({
          id: partyId,
          requestBody: formData,
        });
        setLoading(true);
        if (postResponse.type === "success") {
          toast.success(languageData["Contracts.Create.Success"]);
          router.push(
            getBaseLink(
              `/app/admin/parties/${partyName}/${partyId}/contracts/${postResponse.data.id}`,
            ),
          );
        } else {
          toast.error(
            postResponse.message || languageData["Contracts.Create.Fail"],
          );
        }
      } else {
        toastOnSubmit(formData || "");
      }
    } catch (error) {
      toast.error(languageData[`Contracts.${formType}.Fail`]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchRefundTableHeaders() {
      setLoading(true);
      const response = await getRefundTableHeaders({ maxResultCount: 100 });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(response.message || response.status);
      } else {
        setRefundTableHeaders(response.data.items || []);
      }
      setLoading(false);
    }
    void fetchRefundTableHeaders();
  }, []);

  const $schema =
    formType === "Create"
      ? $ContractHeaderForMerchantCreateDto
      : $ContractHeaderForMerchantUpdateDto;
  const uiSchema = createUiSchemaWithResource({
    name: "Contracts.Form",
    resources: languageData,
    schema: $schema,
    extend: {
      "ui:options": {
        expandable: false,
      },
      webSite: {
        "ui:className": "md:col-span-2",
        "ui:options": {
          inputType: "url",
        },
      },
      "ui:className": "md:grid md:gap-2 md:grid-cols-2",
      addressCommonDataId: {
        "ui:className": "row-start-2",
        "ui:widget": "address",
      },
      status: {
        "ui:className": "md:col-span-2",
      },
      refundTableHeaders: {
        "ui:className": "md:col-span-2",
        items: {
          displayLabel: false,
          "ui:className": "md:grid md:gap-2 md:grid-cols-2",
          refundTableHeaderId: {
            "ui:className": "md:col-span-2",
            "ui:widget": "refundTable",
          },
        },
      },
    },
  });

  /*
   * This code updates the formData state when the defaultRefundTableHeader changes.
   * It sets the isDefault property to true for the refund table header that matches the defaultRefundTableHeader and preserves the rest of the form data.
   * If the form is an update form, it also preserves the status field.
   * TODO : Make array item component does all the work.
   */
  function handleDefaultRefundTableHeader() {
    if (!defaultRefundTableHeader) {
      setDefaultRefundTableHeaderMessage(
        languageData["Contracts.Form.defaultRefundTableHeader.undefined"],
      );
    } else {
      setDefaultRefundTableHeaderMessage(undefined);
      if (formData && (isUpdateForm(formData) || isCreateForm(formData))) {
        const updatedData = {
          refundTableHeaders: formData.refundTableHeaders?.map((item) => {
            if (item.refundTableHeaderId === defaultRefundTableHeader.id) {
              return { isDefault: true, ...item };
            }
            return item;
          }),
        };
        if (isUpdateForm(formData)) {
          Object.assign(updatedData, { status: formData.status });
        }
        setFormData({
          ...formData,
          ...updatedData,
        });
      }
    }
  }

  useEffect(() => {
    handleDefaultRefundTableHeader();
  }, [defaultRefundTableHeader]);

  return (
    <SchemaForm<TForm>
      className="grid gap-2"
      disabled={loading}
      filter={{
        type: "include",
        sort: true,
        keys: [
          "validFrom",
          "validTo",
          "merchantClassification",
          "addressCommonDataId",
          "webSite",
          "status",
          "refundTableHeaders",
          "refundTableHeaders.validFrom",
          "refundTableHeaders.validTo",
          "refundTableHeaders.refundTableHeaderId",
        ],
      }}
      formData={formData}
      onChange={(data) => {
        if (!data.formData) return;
        const _formData = data.formData;
        const filtered = refundTableHeaders?.filter((t1) => {
          return (
            _formData.refundTableHeaders?.filter(
              (t2: { refundTableHeaderId: string }) => {
                return t2.refundTableHeaderId === t1.id;
              },
            ).length !== 0
          );
        });
        setSelectedRefundTableHeaders(filtered);
        setDefaultRefundTableHeader(
          filtered?.find((t) => t.id === defaultRefundTableHeader?.id) ||
            undefined,
        );
        handleDefaultRefundTableHeader();
        setFormData(_formData);
      }}
      onSubmit={(data) => {
        if (!data.formData || !defaultRefundTableHeader) return;
        void handleContractHeaderSubmit();
      }}
      schema={$schema}
      submitText={languageData["Contracts.Create.Submit"]}
      uiSchema={uiSchema}
      widgets={{
        address: MerchantAddressWidget({
          loading,
          addressList,
          languageData,
        }),
        refundTable: RefundTableWidget({
          loading,
          refundTableHeaders,
          languageData,
        }),
      }}
      withScrollArea
    >
      <Combobox<RefundTableHeaderDto>
        disabled={loading}
        errorMessage={defaultRefundTableHeaderMessage}
        label={languageData["Contracts.Form.defaultRefundTableHeader"]}
        list={selectedRefundTableHeaders}
        onValueChange={setDefaultRefundTableHeader}
        required
        selectIdentifier="id"
        selectLabel="name"
        value={defaultRefundTableHeader}
      />
    </SchemaForm>
  );
}

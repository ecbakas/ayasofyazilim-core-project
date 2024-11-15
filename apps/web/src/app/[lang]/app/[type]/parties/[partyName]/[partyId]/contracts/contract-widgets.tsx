import type { WidgetProps } from "@repo/ayasofyazilim-ui/organisms/schema-form/types";
import { CustomCombobox } from "@repo/ayasofyazilim-ui/organisms/schema-form/widgets";
import type { UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto as RefundTableHeaderDto } from "@ayasofyazilim/saas/ContractService";
import type { UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressTypeDto } from "@ayasofyazilim/saas/LocationService";
import type { ContractServiceResource } from "src/language-data/ContractService";

export function MerchantAddressWidget({
  loading,
  languageData,
  addressList,
}: {
  loading: boolean;
  languageData: ContractServiceResource;
  addressList: AddressTypeDto[] | undefined;
}) {
  function Widget(props: WidgetProps) {
    return (
      <CustomCombobox<AddressTypeDto>
        {...props}
        disabled={loading}
        emptyValue={
          languageData["Contracts.Form.addressCommonDataId.emptyValue"]
        }
        list={addressList}
        searchPlaceholder={
          languageData["Contracts.Form.addressCommonDataId.searchPlaceholder"]
        }
        searchResultLabel={
          languageData["Contracts.Form.addressCommonDataId.searchResultLabel"]
        }
        selectIdentifier="id"
        selectLabel="addressLine"
      />
    );
  }
  return Widget;
}

export function RefundTableWidget({
  loading,
  languageData,
  refundTableHeaders,
}: {
  loading: boolean;
  languageData: ContractServiceResource;
  refundTableHeaders: RefundTableHeaderDto[] | undefined;
}) {
  function Widget(comboboxProps: WidgetProps) {
    return (
      <CustomCombobox<RefundTableHeaderDto>
        {...comboboxProps}
        disabled={loading}
        emptyValue={
          languageData[
            "Contracts.Form.refundTableHeaders.refundTableHeaderId.emptyValue"
          ]
        }
        list={refundTableHeaders}
        searchPlaceholder={
          languageData[
            "Contracts.Form.refundTableHeaders.refundTableHeaderId.searchPlaceholder"
          ]
        }
        searchResultLabel={
          languageData[
            "Contracts.Form.refundTableHeaders.refundTableHeaderId.searchResultLabel"
          ]
        }
        selectIdentifier="id"
        selectLabel="name"
      />
    );
  }
  return Widget;
}

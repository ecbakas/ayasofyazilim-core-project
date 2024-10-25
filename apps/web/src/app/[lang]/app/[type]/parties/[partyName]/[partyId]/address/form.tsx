"use client";

import type {
  UniRefund_CRMService_Individuals_IndividualDto,
  UniRefund_CRMService_Organizations_OrganizationDto,
} from "@ayasofyazilim/saas/CRMService";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { putCrmAddressApi } from "src/app/[lang]/app/actions/CrmService/put-actions";
import type { AddressFormFieldsType } from "src/app/[lang]/app/actions/LocationService/schemas";
import {
  getAddressFieldConfig,
  getAddressSchema,
  handleOnAddressValueChange,
} from "src/app/[lang]/app/actions/LocationService/schemas";
import type {
  AddressUpdateDto,
  CityDto,
  CountryDto,
  RegionDto,
  SelectedAddressField,
} from "src/app/[lang]/app/actions/LocationService/types";
import { getAddressList } from "src/app/[lang]/app/actions/LocationService/utils";
import { handlePutResponse } from "src/app/[lang]/app/actions/api-utils";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import type { PartyNameType } from "../../../types";

function Address({
  languageData,
  partyName,
  countryList,
  partyId,
  organizationData,
}: {
  languageData: CRMServiceServiceResource;
  partyName: Exclude<PartyNameType, "individuals">;
  partyId: string;
  countryList: CountryDto[];
  organizationData:
    | UniRefund_CRMService_Organizations_OrganizationDto
    | UniRefund_CRMService_Individuals_IndividualDto
    | undefined;
}) {
  const router = useRouter();
  const addressData =
    organizationData?.contactInformations?.[0]?.addresses?.[0];
  const [cityList, setCityList] = useState<CityDto[] | undefined>(undefined);
  const [regionList, setRegionList] = useState<RegionDto[] | undefined>(
    undefined,
  );
  const [selectedFields, setSelectedFields] = useState<SelectedAddressField>({
    countryId: addressData?.countryId || "",
    regionId: addressData?.regionId || "",
    cityId: addressData?.cityId || "",
  });

  useEffect(() => {
    getAddressList({
      countryId: selectedFields.countryId,
      regionId: selectedFields.regionId,
      languageData,
      countryList,
      setCityList,
      setRegionList,
    });
  }, []);

  const addressValues = {
    ...organizationData?.contactInformations?.[0]?.addresses?.[0],
    ...selectedFields,
  };
  const hideAddressFields: AddressFormFieldsType[] = ["districtId"];
  if (!regionList || regionList.length === 0) {
    hideAddressFields.push("regionId");
  }
  const addressSchema = getAddressSchema(hideAddressFields);
  const addressSchemaFieldConfig = getAddressFieldConfig({
    cityList,
    regionList,
    countryList,
    languageData,
  });

  function handleSubmit(formData: AddressUpdateDto) {
    void putCrmAddressApi(partyName, {
      requestBody: formData,
      id: partyId,
      addressId: addressValues.id || "",
    }).then((response) => {
      handlePutResponse(response, router);
    });
  }

  return (
    <SectionLayoutContent sectionId="address">
      <AutoForm
        fieldConfig={addressSchemaFieldConfig}
        formClassName="pb-40"
        formSchema={addressSchema}
        onSubmit={(values) => {
          const formData = {
            ...values,
            ...selectedFields,
          } as AddressUpdateDto;
          handleSubmit(formData);
        }}
        onValuesChange={(values) => {
          handleOnAddressValueChange({
            selectedFields,
            setSelectedFields,
            countryList,
            values,
            setRegionList,
            setCityList,
            languageData,
          });
        }}
        values={addressValues}
      >
        <AutoFormSubmit className="float-right">
          {languageData.Save}
        </AutoFormSubmit>
      </AutoForm>
    </SectionLayoutContent>
  );
}

export default Address;

"use client";
import { $UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressDto } from "@ayasofyazilim/saas/LocationService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import type { AutoFormInputComponentProps } from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {
  createFieldConfigWithResource,
  CustomCombobox,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import type { Dispatch, SetStateAction } from "react";
import type { LanguageDataResourceType } from "src/language-data/language-data";
import type {
  CityDto,
  CountryDto,
  RegionDto,
  SelectedAddressField,
} from "./types";
import { getCity, getRegion } from "./utils";

const AddressFormFields: AddressFormFieldsType[] = [
  "type",
  "countryId",
  "regionId",
  "cityId",
  "districtId",
  "neighborhoodId",
  "addressLine",
  "postalCode",
];
export type AddressFormFieldsType =
  | "type"
  | "countryId"
  | "regionId"
  | "cityId"
  | "districtId"
  | "neighborhoodId"
  | "addressLine"
  | "postalCode";

export function getAddressFieldConfig(params: {
  cityList?: CityDto[];
  regionList?: RegionDto[];
  countryList?: CountryDto[];
  languageData: LanguageDataResourceType;
}) {
  const fieldConfig = {
    cityId: {
      renderer: (props: AutoFormInputComponentProps) => (
        <CustomCombobox<CityDto>
          childrenProps={props}
          emptyValue={params.languageData["City.Select"]}
          list={params.cityList}
          selectIdentifier="id"
          selectLabel="name"
        />
      ),
    },
    countryId: {
      renderer: (props: AutoFormInputComponentProps) => (
        <CustomCombobox<CountryDto>
          childrenProps={props}
          emptyValue={params.languageData["Country.Select"]}
          list={params.countryList}
          selectIdentifier="id"
          selectLabel="name"
        />
      ),
    },
    regionId: {
      renderer: (props: AutoFormInputComponentProps) => (
        <CustomCombobox<RegionDto>
          childrenProps={props}
          emptyValue={params.languageData["Region.Select"]}
          list={params.regionList}
          selectIdentifier="id"
          selectLabel="name"
        />
      ),
    },
  };

  const translatedForm = createFieldConfigWithResource({
    schema: AddressDto,
    resources: params.languageData,
    name: "Form.address",
    extend: fieldConfig,
  });

  return translatedForm;
}
export function handleOnAddressValueChange({
  values,
  selectedFields,
  setSelectedFields,
  countryList = [],
  regionList,
  setRegionList,
  setCityList,
  languageData,
}: {
  values: Record<string, string>;
  setCityList: Dispatch<SetStateAction<CityDto[] | undefined>>;
  setRegionList?: Dispatch<SetStateAction<RegionDto[] | undefined>>;
  countryList: CountryDto[];
  regionList?: RegionDto[];
  selectedFields: SelectedAddressField;
  setSelectedFields: Dispatch<SetStateAction<SelectedAddressField>>;
  languageData: LanguageDataResourceType;
}) {
  const val = values as {
    [key in AddressFormFieldsType]: string;
  };

  if (
    setRegionList &&
    val.countryId &&
    val.countryId !== selectedFields.countryId
  ) {
    setRegionList(undefined);
    setCityList(undefined);
    setSelectedFields((current) => ({
      ...current,
      countryId: val.countryId,
      regionId: "",
      cityId: "",
    }));
    void getRegion({
      countryList,
      countryId: val.countryId,
      setRegionList,
      languageData,
    }).then((response) => {
      if (response) {
        setSelectedFields((current) => ({
          ...current,
          regionId: response,
        }));
        void getCity({ regionId: response, setCityList, languageData });
      }
    });
  } else if (selectedFields.regionId && !regionList) {
    void getCity({ regionId: val.regionId, setCityList, languageData });
  } else if (val.regionId && selectedFields.regionId === "" && regionList) {
    setSelectedFields((current) => ({
      ...current,
      regionId: val.regionId,
    }));
    void getCity({ regionId: val.regionId, setCityList, languageData });
  } else if (val.cityId && val.cityId !== selectedFields.cityId) {
    setSelectedFields((current) => ({
      ...current,
      cityId: val.cityId,
    }));
  }
}
export function hideAddressFields(hideFields: AddressFormFieldsType[]) {
  return AddressFormFields.filter((field) => !hideFields.includes(field));
}

export function getAddressSchema(fields: AddressFormFieldsType[] = []) {
  const schema = createZodObject(AddressDto, fields);
  return schema;
}

import { useState, useEffect } from "react";
import type { LanguageDataResourceType } from "src/language-data/language-data";
import type {
  CityDto,
  CountryDto,
  RegionDto,
  SelectedAddressField,
} from "./types";
import { getAddressList } from "./utils";
import type { AddressFormFieldsType } from "./schemas";
import {
  getAddressFieldConfig,
  getAddressSchema,
  handleOnAddressValueChange,
} from "./schemas";

export function useAddressHook({
  countryList,
  selectedFieldsDefaultValue,
  hideAddressFields,
  languageData,
}: {
  countryList: CountryDto[];
  selectedFieldsDefaultValue: SelectedAddressField;
  languageData: LanguageDataResourceType;
  hideAddressFields: AddressFormFieldsType[];
}) {
  const [selectedFields, setSelectedFields] = useState<SelectedAddressField>(
    selectedFieldsDefaultValue,
  );
  const [cityList, setCityList] = useState<CityDto[] | undefined>(undefined);
  const [regionList, setRegionList] = useState<RegionDto[] | undefined>(
    undefined,
  );

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

  function onAddressValueChanged(values: Record<string, string>) {
    handleOnAddressValueChange({
      selectedFields,
      setSelectedFields,
      countryList,
      values,
      setRegionList,
      setCityList,
      languageData,
    });
  }
  return {
    addressSchema,
    addressSchemaFieldConfig,
    setRegionList,
    onAddressValueChanged,
    selectedFields,
  };
}

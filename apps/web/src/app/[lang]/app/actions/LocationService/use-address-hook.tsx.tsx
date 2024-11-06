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
  getAddressSettingsForSchemaForm,
  hideAddressFields,
} from "./schemas";

export function useAddressHook({
  countryList,
  selectedFieldsDefaultValue,
  fieldsToHideInAddressSchema,
  languageData,
}: {
  countryList: CountryDto[];
  selectedFieldsDefaultValue: SelectedAddressField;
  languageData: LanguageDataResourceType;
  fieldsToHideInAddressSchema: AddressFormFieldsType[];
}) {
  const [selectedFields, setSelectedFields] = useState<SelectedAddressField>(
    selectedFieldsDefaultValue,
  );
  const [cityList, setCityList] = useState<CityDto[] | undefined>(undefined);
  const [regionList, setRegionList] = useState<RegionDto[] | undefined>(
    undefined,
  );

  if (!regionList || regionList.length === 0) {
    fieldsToHideInAddressSchema.push("regionId");
  }
  const addressFieldsToShow = hideAddressFields(fieldsToHideInAddressSchema);
  const addressSchema = getAddressSchema(addressFieldsToShow);

  const addressSchemaFieldConfig = getAddressFieldConfig({
    cityList,
    regionList,
    countryList,
    languageData,
  });
  const addressSettings = getAddressSettingsForSchemaForm({
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

  function onAddressValueChanged(
    val: Record<string, string> | Record<string, Record<string, string>>,
  ) {
    let values: Record<string, string>;
    if ("address" in val) {
      values = val.address as Record<string, string>;
    } else {
      values = val as Record<string, string>;
    }
    handleOnAddressValueChange({
      selectedFields,
      setSelectedFields,
      countryList,
      regionList,
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
    addressFieldsToShow,
    selectedFields,
    addressSettings,
  };
}

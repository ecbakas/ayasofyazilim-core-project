"use client";

import { toast } from "@/components/ui/sonner";
import type { Dispatch, SetStateAction } from "react";
import type { LanguageDataResourceType } from "src/language-data/language-data";
import {
  getCitiesByRegionId,
  getDefaultRegionsByCountryIdApi,
  getRegionsByCountryIdApi,
} from "./actions";
import type { CityDto, CountryDto, RegionDto } from "./types";

export async function getRegion({
  countryList,
  countryId,
  setRegionList,
  languageData,
}: {
  countryList: CountryDto[];
  countryId: string;
  setRegionList: Dispatch<SetStateAction<RegionDto[] | undefined>>;
  languageData: LanguageDataResourceType;
}) {
  const selectedCountry = countryList.find(
    (country) => country.id === countryId,
  );
  if (selectedCountry?.hasRegion) {
    const regions = await getRegionsByCountryIdApi({
      countryId,
    });
    if (regions.type !== "success") {
      setRegionList([]);
      toast.error(`location/utils: ${languageData["Fetch.Fail"]}`);
      return false;
    }
    setRegionList(regions.data);
  } else {
    const regions = await getDefaultRegionsByCountryIdApi({
      countryId,
    });
    setRegionList([]);
    if (regions.type !== "success") {
      toast.error(`location/utils/region: ${languageData["Fetch.Fail"]}`);
      return false;
    }
    return regions.data;
  }
  return false;
}
export async function getCity({
  regionId,
  setCityList,
  languageData,
}: {
  regionId: string;
  setCityList: Dispatch<SetStateAction<CityDto[] | undefined>>;
  languageData: LanguageDataResourceType;
}) {
  const cities = await getCitiesByRegionId({ regionId });
  if (cities.type === "success") {
    setCityList(cities.data);
    return;
  }
  setCityList([]);
  toast.error(`location/utils/city: ${languageData["Fetch.Fail"]}`);
}

export function getAddressList({
  countryList,
  countryId,
  regionId,
  setRegionList,
  setCityList,
  languageData,
}: {
  countryList: CountryDto[];
  countryId: string;
  regionId?: string;
  setRegionList: Dispatch<SetStateAction<RegionDto[] | undefined>>;
  setCityList: Dispatch<SetStateAction<CityDto[] | undefined>>;
  languageData: LanguageDataResourceType;
}) {
  if (countryId) {
    void getRegion({
      countryList,
      countryId,
      setRegionList,
      languageData,
    }).then((response) => {
      if (response) {
        void getCity({ regionId: response, setCityList, languageData });
      } else if (regionId) {
        void getCity({ regionId, setCityList, languageData });
      }
    });
  }
}

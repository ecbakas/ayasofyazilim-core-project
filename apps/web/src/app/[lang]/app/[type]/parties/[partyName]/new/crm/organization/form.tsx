"use client";

import { toast } from "@/components/ui/sonner";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { addressSchemaByData } from "@repo/ui/utils/table/form-schemas";
import { getEnumId, type TableData } from "@repo/ui/utils/table/table-utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { UniRefund_CRMService_TaxOffices_TaxOfficeProfileDto } from "@ayasofyazilim/saas/CRMService";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import type { CountryDto } from "src/app/[lang]/app/actions/LocationService/types";
import type { CreatePartiesDto } from "../../../../table-data";
import { dataConfigOfParties } from "../../../../table-data";
import type { PartiesCreateDTOType, PartyNameType } from "../../../../types";
import { createPartyRow } from "../../../action";

export default function CrmOrganization({
  partyName,
  taxOfficeList,
  countryList,
  languageData,
}: {
  partyName: Exclude<PartyNameType, "individuals">;
  taxOfficeList: UniRefund_CRMService_TaxOffices_TaxOfficeProfileDto[];
  countryList: CountryDto[];
  languageData: CRMServiceServiceResource;
}) {
  const searchParams = useSearchParams();
  const parentId = searchParams.get("parentId");
  const router = useRouter();
  const [_formData] = useState<TableData>(dataConfigOfParties[partyName]);

  //temperory solution will be changed next pr
  const citiesEnum = countryList as { name: string; id: string }[];
  const taxOfficesEnum = taxOfficeList as {
    name: string;
    id: string;
  }[];
  function formSchemaByData() {
    const config = dataConfigOfParties[partyName];
    const address = addressSchemaByData([], citiesEnum, [
      "countryId",
      "regionId",
    ]);

    const convertors = {
      ...config.createFormSchema.convertors,
      taxOfficeId: {
        type: "enum",
        data: taxOfficesEnum.map((i) => i.name),
      },
      address: {
        ...address.convertors,
      },
    };
    const formSubPositions = {
      ...config.createFormSchema.formSubPositions,
      address: address.subPositions,
    };
    return createZodObject(
      config.createFormSchema.schema,
      config.createFormSchema.formPositions,
      convertors,
      formSubPositions,
    );
  }

  const handleSave = async (formData: CreatePartiesDto) => {
    const isValid = isPhoneValid(formData.telephone.localNumber);
    if (!isValid) {
      return;
    }
    const phoneData = splitPhone(formData.telephone.localNumber);
    formData.telephone = { ...formData.telephone, ...phoneData };
    const createformData: PartiesCreateDTOType = {
      taxOfficeId: getEnumId(taxOfficesEnum, formData.taxOfficeId),
      typeCode: parentId
        ? dataConfigOfParties[partyName].subEntityType
        : "HEADQUARTER",
      parentId,
      entityInformationTypes: [
        {
          organizations: [
            {
              ...formData.organization,
              contactInformations: [
                {
                  telephones: [{ ...formData.telephone, primaryFlag: true }],
                  emails: [{ ...formData.email, primaryFlag: true }],
                  addresses: [
                    {
                      ...formData.address,
                      countryId: formData.address.countryId || "NULL",
                      regionId: formData.address.regionId || "NULL",
                      cityId: getEnumId(
                        citiesEnum,
                        formData.address.cityId || "",
                      ),
                      primaryFlag: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    try {
      const response = await createPartyRow(partyName, createformData);
      if (response.status === 200) {
        toast.success(`${partyName} added successfully`);
        router.push(getBaseLink(`/app/admin/parties/${partyName}`));
      } else {
        toast.error(response.message || `Failed to add ${partyName}`);
      }
    } catch (error) {
      toast.error(`An error occurred while saving the ${partyName}`);
    }
  };

  return (
    <AutoForm
      className="grid gap-2 space-y-0 md:grid-cols-2 lg:grid-cols-3"
      fieldConfig={{
        address: {
          className: "row-span-2",
        },
        organization: {
          className: "row-span-2",
        },
        email: {
          emailAddress: {
            inputProps: {
              type: "email",
            },
          },
        },
        telephone: {
          localNumber: {
            fieldType: "phone",
            displayName: languageData.Telephone,
            inputProps: {
              showLabel: true,
            },
          },
        },
      }}
      formClassName="pb-4"
      formSchema={formSchemaByData()}
      onSubmit={(val) => {
        void handleSave(val as CreatePartiesDto);
      }}
    >
      <AutoFormSubmit className="float-right">
        {languageData.Save}
      </AutoFormSubmit>
    </AutoForm>
  );
}

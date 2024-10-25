"use client";

import { toast } from "@/components/ui/sonner";
import { $UniRefund_CRMService_Merchants_CreateMerchantDto as CreateMerchantSchema } from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {
  addressSchemaByData,
  ContactFormSubPositions,
} from "@repo/ui/utils/table/form-schemas";
import { getEnumId } from "@repo/ui/utils/table/table-utils";
import { useRouter } from "next/navigation";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import type { CountryDto } from "src/app/[lang]/app/actions/LocationService/types";
import type { CreatePartiesDto } from "../../../table-data";
import { dataConfigOfParties, localNumber } from "../../../table-data";
import type { CreateIndividualDTO } from "../../../types";
import { createPartyRow } from "../../action";

function createScheme(schema: typeof CreateMerchantSchema) {
  return {
    type: "object",
    properties: {
      name: schema.properties.entityInformationTypes.items.properties
        .individuals.items.properties.name,
      personalSummaries:
        schema.properties.entityInformationTypes.items.properties.individuals
          .items.properties.personalSummaries.items,
      telephone: {
        ...schema.properties.entityInformationTypes.items.properties.individuals
          .items.properties.contactInformations.items.properties.telephones
          .items,
        properties: {
          ...schema.properties.entityInformationTypes.items.properties
            .individuals.items.properties.contactInformations.items.properties
            .telephones.items.properties,
          localNumber,
        },
      },
      address:
        schema.properties.entityInformationTypes.items.properties.individuals
          .items.properties.contactInformations.items.properties.addresses
          .items,
      email:
        schema.properties.entityInformationTypes.items.properties.individuals
          .items.properties.contactInformations.items.properties.emails.items,
    },
  };
}

export default function Individual({
  partyName,
  countryList,
  languageData,
}: {
  partyName: "individuals";
  countryList: CountryDto[];
  languageData: CRMServiceServiceResource;
}) {
  const router = useRouter();

  //temperory solution will be changed next pr
  const citiesEnum = countryList as { name: string; id: string }[];
  function formSchemaByData() {
    const config = dataConfigOfParties[partyName];
    const schema = createScheme(CreateMerchantSchema);
    const address = addressSchemaByData([], citiesEnum, [
      "countryId",
      "regionId",
    ]);

    const convertors = {
      address: {
        ...address.convertors,
      },
    };
    const formSubPositions = {
      ...config.createFormSchema.formSubPositions,
      address: address.subPositions,
      telephone: ContactFormSubPositions.telephone,
      email: ContactFormSubPositions.email,
    };
    return createZodObject(
      schema,
      ["name", "personalSummaries", "address", "telephone", "email"],
      convertors,
      formSubPositions,
    );
  }

  const schema = formSchemaByData();

  const handleSave = async (formData: CreatePartiesDto) => {
    const isValid = isPhoneValid(formData.telephone.localNumber);
    if (!isValid) {
      return;
    }
    const phoneData = splitPhone(formData.telephone.localNumber);
    formData.telephone = { ...formData.telephone, ...phoneData };
    const createformData: CreateIndividualDTO = {
      name: formData.name,
      personalSummaries: [formData.personalSummaries],
      contactInformations: [
        {
          telephones: [{ ...formData.telephone, primaryFlag: true }],
          emails: [{ ...formData.email, primaryFlag: true }],
          addresses: [
            {
              ...formData.address,
              countryId: formData.address.countryId || "NULL",
              regionId: formData.address.regionId || "NULL",
              cityId: getEnumId(citiesEnum, formData.address.cityId || ""),
              primaryFlag: true,
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
      formSchema={schema}
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

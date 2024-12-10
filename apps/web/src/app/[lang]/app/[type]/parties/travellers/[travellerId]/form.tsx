"use client";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_TravellerService_PersonalIdentificationCommonDatas_PersonalIdentificationProfileDto,
  UniRefund_TravellerService_PersonalPreferencesTypes_UpsertPersonalPreferenceDto,
  UniRefund_TravellerService_PersonalSummaries_UpsertPersonalSummaryDto,
  UniRefund_TravellerService_Travellers_TravellerDetailProfileDto,
} from "@ayasofyazilim/saas/TravellerService";
import {
  $UniRefund_TravellerService_PersonalIdentificationCommonDatas_PersonalIdentificationProfileDto,
  $UniRefund_TravellerService_PersonalPreferencesTypes_UpsertPersonalPreferenceDto,
  $UniRefund_TravellerService_PersonalSummaries_UpsertPersonalSummaryDto,
} from "@ayasofyazilim/saas/TravellerService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import jsonToCsv from "@repo/ayasofyazilim-ui/lib/json-to-csv";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import AutoForm, {
  AutoFormSubmit,
  createFieldConfigWithResource,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import type { CellContext } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handlePutResponse } from "src/app/[lang]/app/actions/api-utils-client";
import { deleteTravellerPersonalIdentificationApi } from "src/app/[lang]/app/actions/TravellerService/actions";
import {
  putTravellerPersonalPreferenceApi,
  putTravellerPersonalSummaryApi,
} from "src/app/[lang]/app/actions/TravellerService/put-actions";
import type { TravellerServiceResource } from "src/language-data/TravellerService";
import { getBaseLink } from "src/utils";

export default function Page({
  languageData,
  travellerId,
  travellerData,
}: {
  languageData: TravellerServiceResource;
  travellerId: string;
  travellerData: UniRefund_TravellerService_Travellers_TravellerDetailProfileDto;
}) {
  const router = useRouter();

  const updatPersonalPreferenceSchema = createZodObject(
    $UniRefund_TravellerService_PersonalPreferencesTypes_UpsertPersonalPreferenceDto,
  );

  const updatPersonalSummarySchema = createZodObject(
    $UniRefund_TravellerService_PersonalSummaries_UpsertPersonalSummaryDto,
  );

  const translatedPersonalPreferenceForm = createFieldConfigWithResource({
    schema:
      $UniRefund_TravellerService_PersonalPreferencesTypes_UpsertPersonalPreferenceDto,
    resources: languageData,
  });

  const translatedPersonalSummaryForm = createFieldConfigWithResource({
    schema:
      $UniRefund_TravellerService_PersonalSummaries_UpsertPersonalSummaryDto,
    resources: languageData,
    name: "Form.Summary",
  });
  function cellWithLink(
    cell: CellContext<
      UniRefund_TravellerService_PersonalIdentificationCommonDatas_PersonalIdentificationProfileDto,
      unknown
    >,
  ) {
    const id = cell.row.original.id || "";
    const travelDocumentNumber = String(cell.getValue());
    return (
      <Link
        className="text-blue-700"
        href={`${travellerId}/identification/${id}`}
      >
        {travelDocumentNumber}
      </Link>
    );
  }

  function updateTravellerPersonalPreference(
    data: UniRefund_TravellerService_PersonalPreferencesTypes_UpsertPersonalPreferenceDto,
  ) {
    void putTravellerPersonalPreferenceApi({
      id: travellerId,
      requestBody: data,
    }).then((response) => {
      handlePutResponse(response, router);
    });
  }

  function updateTravellerPersonalSummary(
    data: UniRefund_TravellerService_PersonalSummaries_UpsertPersonalSummaryDto,
  ) {
    void putTravellerPersonalSummaryApi({
      id: travellerId,
      requestBody: data,
    }).then((response) => {
      handlePutResponse(response, router);
    });
  }

  return (
    <SectionLayout
      sections={[
        {
          name: languageData["Travellers.Personal.Identifications"],
          id: "identifications",
        },
        {
          name: languageData["Travellers.Personal.Preferences"],
          id: "preferences",
        },
        { name: languageData["Travellers.Personal.Summary"], id: "summary" },
      ]}
      vertical
    >
      <SectionLayoutContent sectionId="identifications">
        <DataTable
          action={[
            {
              cta: languageData["Travellers.New.Identification"],
              type: "NewPage",
              href: getBaseLink(
                `app/admin/parties/traveller/${travellerId}/identification/new`,
              ),
            },
            {
              cta: languageData.ExportCSV,
              callback: () => {
                jsonToCsv(
                  travellerData.personalIdentifications,
                  "Identifications",
                );
              },
              type: "Action",
            },
          ]}
          columnsData={{
            type: "Auto",
            data: {
              tableType:
                $UniRefund_TravellerService_PersonalIdentificationCommonDatas_PersonalIdentificationProfileDto,
              excludeList: [
                "id",
                "firstName",
                "lastName",
                "middleName",
                "nationalityCountryCode2",
                "residenceCountryCode2",
              ],
              customCells: {
                travelDocumentNumber: cellWithLink,
              },
              actionList: [
                {
                  cta: languageData.Delete,
                  type: "Dialog",
                  componentType: "ConfirmationDialog",
                  description: languageData["Delete.Assurance"],
                  cancelCTA: languageData.Cancel,
                  variant: "destructive",
                  callback: (row: { id: string }) => {
                    void deleteTravellerPersonalIdentificationApi(row.id).then(
                      (response) => {
                        if (
                          response.type === "error" ||
                          response.type === "api-error"
                        ) {
                          toast.error(
                            `${response.status}: ${response.message || languageData["Travellers.Identifications.Delete.Error"]}`,
                          );
                        } else {
                          toast.success(
                            languageData[
                              "Travellers.Identifications.Delete.Success"
                            ],
                          );
                          router.refresh();
                        }
                      },
                    );
                  },
                },
              ],
            },
          }}
          data={travellerData.personalIdentifications}
          showView
        />
      </SectionLayoutContent>

      <SectionLayoutContent sectionId="preferences">
        <AutoForm
          fieldConfig={translatedPersonalPreferenceForm}
          formSchema={updatPersonalPreferenceSchema}
          onSubmit={(values) => {
            updateTravellerPersonalPreference(
              values as UniRefund_TravellerService_PersonalPreferencesTypes_UpsertPersonalPreferenceDto,
            );
          }}
          values={{
            languagePreferenceCode: travellerData.languagePreferenceCode,
          }}
        >
          <AutoFormSubmit className="float-right">
            {languageData["Edit.Save"]}
          </AutoFormSubmit>
        </AutoForm>
      </SectionLayoutContent>
      <SectionLayoutContent sectionId="summary">
        <AutoForm
          fieldConfig={translatedPersonalSummaryForm}
          formSchema={updatPersonalSummarySchema}
          onSubmit={(values) => {
            updateTravellerPersonalSummary(
              values as UniRefund_TravellerService_PersonalSummaries_UpsertPersonalSummaryDto,
            );
          }}
          values={{
            genderTypeCode: travellerData.gender,
          }}
        >
          <AutoFormSubmit className="float-right">
            {languageData["Edit.Save"]}
          </AutoFormSubmit>
        </AutoForm>
      </SectionLayoutContent>
    </SectionLayout>
  );
}

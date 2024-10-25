"use client";
import { toast } from "@/components/ui/sonner";
import type { UniRefund_CRMService_Customss_CustomsProfileDto } from "@ayasofyazilim/saas/CRMService";
import type { UniRefund_ExportValidationService_ExportValidations_CreateExportValidationDto } from "@ayasofyazilim/saas/ExportValidationService";
import { $UniRefund_ExportValidationService_ExportValidations_CreateExportValidationDto } from "@ayasofyazilim/saas/ExportValidationService";
import type { UniRefund_TagService_Tags_TagListItemDto } from "@ayasofyazilim/saas/TagService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
  CustomCombobox,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useRouter } from "next/navigation";
import { postExportValidationApi } from "src/app/[lang]/app/actions/ExportValidationService/post-actions";
import type { ExportValidationServiceResource } from "src/language-data/ExportValidationService";
import { getBaseLink } from "src/utils";

const ExportValidationSchema = createZodObject(
  $UniRefund_ExportValidationService_ExportValidations_CreateExportValidationDto,
  [
    "tagId",
    "exportLocationId",
    "referenceId",
    "exportDate",
    "status",
    "stampType",
    "initialValidationResult",
    "finalValidationResult",
  ],
);

export default function Page({
  languageData,
  CustomsData,
  TagsData,
}: {
  languageData: ExportValidationServiceResource;
  CustomsData: UniRefund_CRMService_Customss_CustomsProfileDto[];
  TagsData: UniRefund_TagService_Tags_TagListItemDto[];
}) {
  const router = useRouter();

  async function createExportValidation(
    data: UniRefund_ExportValidationService_ExportValidations_CreateExportValidationDto,
  ) {
    try {
      const response = await postExportValidationApi({ requestBody: data });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(
          response.message || languageData["ExportValidation.New.Error"],
        );
      } else {
        toast.success([languageData["ExportValidation.New.Succes"]]);
        router.push(getBaseLink(`/app/admin/operations/export-validation`));
      }
    } catch (error) {
      toast.error(languageData["ExportValidation.New.Fail"]);
    }
  }
  return (
    <AutoForm
      fieldConfig={{
        exportLocationId: {
          renderer: (props) => (
            <CustomCombobox<UniRefund_CRMService_Customss_CustomsProfileDto>
              childrenProps={props}
              emptyValue="select Customs"
              list={CustomsData}
              selectIdentifier="id"
              selectLabel="name"
            />
          ),
        },
        tagId: {
          renderer: (props) => (
            <CustomCombobox<UniRefund_TagService_Tags_TagListItemDto>
              childrenProps={props}
              emptyValue="select Tag"
              list={TagsData}
              selectIdentifier="id"
              selectLabel="tagNumber"
            />
          ),
        },
      }}
      formSchema={ExportValidationSchema}
      onSubmit={(val) => {
        void createExportValidation(val);
      }}
      stickyChildren
    >
      <AutoFormSubmit className="float-right px-8 py-4">
        {languageData.Save}
      </AutoFormSubmit>
    </AutoForm>
  );
}

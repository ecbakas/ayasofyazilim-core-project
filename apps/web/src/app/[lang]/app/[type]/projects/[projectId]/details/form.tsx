"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { AccordionStepperHeader } from "@repo/ayasofyazilim-ui/organisms/accordion-stepper-header";
import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import { useState } from "react";
import {
  createProjectSectionRelationServer,
  updateProjectSectionRelationServer,
} from "../../action";

export interface IStatusFormProps {
  resources: any;
  projectId: string;
  sectionData:
    | {
        projectId?: string;
        sectionId?: string;
        sectionRelationId?: string;
        sectionName?: string | null;
        sectionRelationValue?: string | null;
        order?: number;
      }[]
    | null;
}
export default function ProjectForm({
  projectId,
  sectionData,
}: IStatusFormProps) {
  const [formValues, setFormValues] = useState<Record<string, number>>(() => {
    const data: Record<string, number> = {};
    sectionData?.forEach((section) => {
      if (section.sectionId) {
        data[section.sectionId] = section.sectionRelationValue?.length || 0;
      }
    });
    return data;
  });
  if (!sectionData) return <></>;

  async function onSaveClick(editorId: string, editorContent: string) {
    const section = sectionData?.find((i) => i.sectionId === editorId);
    if (
      section?.sectionRelationValue &&
      section.sectionRelationId &&
      section.sectionId
    ) {
      const updatedProjectInformation =
        await updateProjectSectionRelationServer(
          section.sectionRelationId,
          editorContent,
        );
      return updatedProjectInformation;
    }

    const createdProjectInformation = await createProjectSectionRelationServer(
      projectId,
      editorId,
      editorContent,
    );
    return createdProjectInformation;
  }
  function onWordCountChanged(id: string, count: number) {
    if (formValues[id] === count) return;

    setFormValues({ ...formValues, [id]: count });
  }
  return (
    <Accordion
      className="w-full"
      collapsible
      defaultValue={sectionData[0]?.sectionId || "item"}
      type="single"
    >
      {sectionData.map((section, index) => (
        <AccordionItem
          className="my-2 border"
          key={section.sectionId}
          value={section.sectionId || "item"}
        >
          <AccordionStepperHeader
            checked={formValues[section.sectionId || "item"] > 10}
          >
            {section.sectionName}
          </AccordionStepperHeader>
          <AccordionContent className="px-6">
            <div className="w-full">
              <div className="grid w-full items-center gap-3 mt-4">
                <TipTapEditor
                  canEditable
                  editOnStart={!(section.sectionRelationValue || index !== 0)}
                  editorContent={
                    section.sectionRelationValue
                      ? JSON.parse(section.sectionRelationValue)
                      : undefined
                  }
                  editorId={section.sectionId}
                  onSaveFunction={onSaveClick}
                  onWordCountChanged={(v) => {
                    onWordCountChanged(section.sectionId || "", v);
                  }}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

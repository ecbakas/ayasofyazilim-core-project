import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import type { SectionProps } from "./details";

export function RebateSettingsSection({ languageData }: SectionProps) {
  return (
    <SectionLayoutContent sectionId="rebate-setting">
      <>{languageData["Contracts.Create.RebateSettings"]}</>
    </SectionLayoutContent>
  );
}

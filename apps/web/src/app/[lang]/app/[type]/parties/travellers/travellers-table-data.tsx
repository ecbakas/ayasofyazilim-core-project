import type { UniRefund_TravellerService_Travellers_TravellerListProfileDto } from "@ayasofyazilim/saas/TravellerService";
import { $UniRefund_TravellerService_Travellers_TravellerListProfileDto } from "@ayasofyazilim/saas/TravellerService";
import type {
  TanstackTableColumnLink,
  TanstackTableCreationProps,
  TanstackTableTableActionsType,
} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import { tanstackTableCreateColumnsByRowData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import { PlusCircle } from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { TravellerServiceResource } from "src/language-data/TravellerService";
import type { Policy } from "src/types";
import isActionGranted from "src/app/[lang]/page-policy/action-policy";
import type { CountryDto } from "../../../actions/LocationService/types";

type TravellersTable =
  TanstackTableCreationProps<UniRefund_TravellerService_Travellers_TravellerListProfileDto>;

const links: Partial<
  Record<
    keyof UniRefund_TravellerService_Travellers_TravellerListProfileDto,
    TanstackTableColumnLink
  >
> = {};

function travellersTableActions(
  languageData: TravellerServiceResource,
  router: AppRouterInstance,
  grantedPolicies: Record<Policy, boolean>,
) {
  const actions: TanstackTableTableActionsType[] = [];
  if (
    isActionGranted(["TravellerService.Travellers.Create"], grantedPolicies)
  ) {
    actions.push({
      type: "simple",
      actionLocation: "table",
      cta: languageData.New,
      icon: PlusCircle,
      onClick() {
        router.push("travellers/new");
      },
    });
  }
  return actions;
}
function taxOfficesColumns(
  locale: string,
  languageData: TravellerServiceResource,
  grantedPolicies: Record<Policy, boolean>,
) {
  if (isActionGranted(["TravellerService.Travellers.Edit"], grantedPolicies)) {
    links.fullName = {
      prefix: "/app/admin/parties/travellers",
      targetAccessorKey: "id",
    };
  }

  return tanstackTableCreateColumnsByRowData<UniRefund_TravellerService_Travellers_TravellerListProfileDto>(
    {
      rows: $UniRefund_TravellerService_Travellers_TravellerListProfileDto.properties,
      languageData: {
        name: languageData.Name,
      },
      config: {
        locale,
      },
      links,
    },
  );
}

export function travellersTable(
  languageData: TravellerServiceResource,
  router: AppRouterInstance,
  countryList: CountryDto[],
  grantedPolicies: Record<Policy, boolean>,
): TravellersTable {
  const table: TravellersTable = {
    fillerColumn: "fullName",
    columnVisibility: {
      type: "hide",
      columns: ["id", "userAccountId"],
    },
    tableActions: travellersTableActions(languageData, router, grantedPolicies),
    columnOrder: [
      "fullName",
      "firstName",
      "middleName",
      "lastName",
      "nationalityCountryName",
      "nationalityCountryCode2",
      "residenceCountryName",
      "residenceCountryCode2",
      "identificationType",
    ],
    pinColumns: ["fullName"],
    filters: {
      textFilters: [
        "fullName",
        "travelDocumentNumber",
        "email",
        "phoneNumber",
        "username",
      ],
      facetedFilters: {
        nationalities: {
          title: languageData.Nationalities,
          options: countryList.map((x) => ({
            label: x.name,
            value: x.code2,
          })),
        },
        residences: {
          title: languageData.Residences,
          options: countryList.map((x) => ({
            label: x.name,
            value: x.code2,
          })),
        },
        showExpired: {
          title: "Show Expired",
          options: [
            { label: languageData.Yes, value: "true" },
            { label: languageData.No, value: "false" },
          ],
        },
      },
    },
  };
  return table;
}

export const tableData = {
  taxOffices: {
    columns: taxOfficesColumns,
    table: travellersTable,
  },
};

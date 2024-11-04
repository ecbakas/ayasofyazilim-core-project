"use client";
import { toast } from "@/components/ui/sonner";
import type { PagedResultDto_MerchantProfileDto } from "@ayasofyazilim/saas/CRMService";
import { $UniRefund_CRMService_Merchants_MerchantProfileDto } from "@ayasofyazilim/saas/CRMService";
import type {
  GetApiTagServiceTagResponse,
  GetApiTagServiceTagSummaryResponse,
  UniRefund_TagService_Tags_TagListItemDto,
} from "@ayasofyazilim/saas/TagService";
import { $UniRefund_TagService_Tags_TagListItemDto } from "@ayasofyazilim/saas/TagService";
import type {
  GetApiTravellerServiceTravellersResponse,
  Volo_Abp_Application_Dtos_PagedResultDto_15,
} from "@ayasofyazilim/saas/TravellerService";
import { $UniRefund_TravellerService_Travellers_TravellerListProfileDto } from "@ayasofyazilim/saas/TravellerService";
import type {
  ColumnsType,
  FilterColumnResult,
} from "@repo/ayasofyazilim-ui/molecules/tables";
import Dashboard from "@repo/ayasofyazilim-ui/templates/dashboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBaseLink } from "src/utils";
import { getMerchantsApi } from "../../../actions/CrmService/actions";
import { getTravellers } from "../../../actions/TravellerService/actions";
import { dataConfigOfParties } from "../../parties/table-data";
import type { TravllersKeys } from "../../parties/traveller/utils";
import {
  getTravellerFilterClient,
  travellerTableSchema,
} from "../../parties/traveller/utils";
import type { DetailedFilter, TypedFilter } from "../filter";
import { CommonFilter } from "../filter";
import { getMerchants, getSummary, getTags } from "./actions";

export default function Page(): JSX.Element {
  const [merchant, setMerchant] = useState<PagedResultDto_MerchantProfileDto>(
    {},
  );
  const [travellers, setTravellers] =
    useState<GetApiTravellerServiceTravellersResponse>({});
  useEffect(() => {
    async function getMerchantsLocally() {
      const merchants = await getMerchantsApi();
      if (merchants.type === "success") {
        setMerchant(merchants.data);
      }
      const travellersList = await getTravellers(1);
      setTravellers(
        travellersList.data as GetApiTravellerServiceTravellersResponse,
      );
    }
    void getMerchantsLocally();
  }, []);
  const travellerExcludeList: TravllersKeys[] = [
    ...travellerTableSchema.excludeList,
    "identificationType",
    "languagePreferenceCode",
  ];
  const travellerPosition: TravllersKeys[] = [
    "firstName",
    "lastName",
    "nationalityCountryName",
  ];
  // convert type filter to array
  const typedFilters: TypedFilter = {
    ...CommonFilter,
    merchantIds: {
      name: "merchantIds",
      type: "select-async",
      displayName: "Merchant",
      value: "",
      rowCount: merchant.totalCount || 0,
      filterProperty: "id",
      showProperty: "name",
      data: merchant.items || [],
      columnDataType: {
        tableType: $UniRefund_CRMService_Merchants_MerchantProfileDto,
        ...dataConfigOfParties.merchants.tableSchema,
      },
      fetchRequest: getMerchants,
      detailedFilters: dataConfigOfParties.merchants.detailedFilters,
    },
    travellerIds: {
      name: "travellerIds",
      type: "select-async",
      displayName: "Traveller",
      value: "",
      rowCount: travellers.totalCount || 0,
      filterProperty: "id",
      showProperty: "firstName",
      data: travellers.items || [],
      columnDataType: {
        tableType:
          $UniRefund_TravellerService_Travellers_TravellerListProfileDto,
        excludeList: travellerExcludeList,
        positions: travellerPosition,
      },
      fetchRequest: async (page, filter) => {
        const response = await getTravellers(page, filter);
        if (response.type === "success") {
          const data =
            response.data as Volo_Abp_Application_Dtos_PagedResultDto_15;
          return {
            type: "success",
            data: { items: data.items || [], totalCount: data.totalCount || 0 },
          };
        }
        return {
          type: "success",
          data: { items: [], totalCount: 0 },
        };
      },
      detailedFilters: getTravellerFilterClient("en"),
    },
  };

  const filters: DetailedFilter[] = Object.values(typedFilters);

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<GetApiTagServiceTagResponse>();
  const [summary, setSummary] = useState<GetApiTagServiceTagSummaryResponse>();
  const fetchTags = (page: number, filter: FilterColumnResult) => {
    setLoading(true);
    void getTags({ maxResultCount: 10, skipCount: page * 10, ...filter })
      .then((res) => {
        if (res.type === "success") {
          setTags(res.data);
        }
        if (res.type === "error" || res.type === "api-error") {
          toast.error(res.message);
        }
      })
      .finally(() => {
        setLoading(false);
        // handleFilter(filter);
      });
    void getSummary({ maxResultCount: 10, skipCount: page * 10, ...filter })
      .then((res) => {
        if (res.type === "success") {
          setSummary(res.data);
          return;
        }
        toast.error(res.message);
      })
      .finally(() => {
        // setLoading(false);
        // handleFilter(filter);
      });
  };

  useEffect(() => {
    async function getTagsFromAPI() {
      const tagsList = await getTags();
      if (tagsList.type === "success") {
        setTags(tagsList.data);
        toast.success(tagsList.message);
        setLoading(false);
        return;
      }
      toast.error(tagsList.message);
    }
    void getTagsFromAPI();
  }, []);
  const columnsData: ColumnsType = {
    type: "Auto",
    data: {
      tableType: $UniRefund_TagService_Tags_TagListItemDto,
      excludeList: ["id"],
      actionList: [
        {
          cta: "Open in new page",
          type: "Action",
          callback: (originalRow: UniRefund_TagService_Tags_TagListItemDto) => {
            router.push(
              getBaseLink(`app/admin/operations/details/${originalRow.id}`),
            );
          },
        },
      ],
    },
  };
  const summaryCards = [
    {
      title: "Total Tags",
      content: `${tags?.totalCount}`,
      description: "Total tags in the system",
      footer: "",
    },
    {
      title: "Total Sales",
      content: `${summary?.totalSalesAmount || 0}`,
      description: "Total tags in the system",
      footer: "",
    },
    {
      title: "Total Refunds",
      content: `${summary?.totalRefundAmount || 0}`,
      description: "Total tags in the system",
      footer: "",
    },
    {
      title: "Currency",
      content: summary?.currency || "TRY",
      description: "Total tags in the system",
      footer: "",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Dashboard
        action={{
          type: "NewPage",
          cta: "Add Tag",
          href: getBaseLink("app/admin/operations/details/add"),
        }}
        cards={summaryCards}
        columnsData={columnsData}
        data={tags?.items || []}
        detailedFilter={filters}
        fetchRequest={fetchTags}
        isLoading={loading}
        rowCount={tags?.totalCount}
        withCards
        withTable
      />
    </div>
  );
}

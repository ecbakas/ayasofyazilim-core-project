import type { TableData } from "@repo/ui/utils/table/table-utils";

export interface DataConfig {
  displayName: string;
  default: string;
  pages: Record<string, TableData>;
}

export type DataConfigArray = Record<string, DataConfig>;

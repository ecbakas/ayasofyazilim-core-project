import type { TableData } from "@repo/ui/utils/table/table-utils";
import type policies from "./app/[lang]/page-policy/policies.json";

export interface DataConfig {
  displayName: string;
  default: string;
  pages: Record<string, TableData>;
}

export type DataConfigArray = Record<string, DataConfig>;

export type Policy = keyof typeof policies;

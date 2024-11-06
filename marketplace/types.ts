import { Database } from "@/types/hypercerts-data-database";

export type MarketplaceOrder =
  Database["public"]["Tables"]["marketplace_orders"]["Row"];

export interface Sales {
  seller: string;
  item_ids: unknown[] | null;
  collection: string;
  id: string;
  currency: string;
  amounts: unknown[] | null;
  buyer: string;
  creation_block_timestamp: unknown;
}

import request from "graphql-request";

import { salesByHypercertId } from "@/graphql/queries";

import { graphqlEndpoint } from "@/config/graphql";
import { Sales } from "@/marketplace/types";


export const getSalesByHypercertId = async (
  hypercert_id: string
): Promise<Sales[] | []> => {
  const res = await request(graphqlEndpoint, salesByHypercertId, {
    hypercert_id: hypercert_id,
  });
  const data = res;
  if (!data.sales.data || data.sales.data[0] === undefined) {
    return [];
  }
  return data.sales.data;
};

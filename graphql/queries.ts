import { ResultOf, graphql } from "gql.tada";

export const getHypercertsByHypercertIdQuery = graphql(`
  query GetHypercertByHypercertId($hypercert_id: String!) {
    hypercerts(where: { hypercert_id: { contains: $hypercert_id } }) {
      data {
        creator_address
        hypercert_id
        units
        uri
        contract {
          chain_id
        }
        orders {
          totalUnitsForSale
        }
        metadata {
          allow_list_uri
          contributors
          external_url
          description
          image
          impact_scope
          work_timeframe_from
          work_timeframe_to
          work_scope
          name
          properties
        }
      }
    }
  }
`);

export type GetHypercertsByHypercertId = ResultOf<
  typeof getHypercertsByHypercertIdQuery
>;

export const hypercertsByCreatorQuery = graphql(`
  query GetHypercertsByCreator($address: String!) {
    hypercerts(
      sort: { by: { claim_attestation_count: descending } }
      where: { creator_address: { contains: $address } }
      count: COUNT
    ) {
      count
      data {
        id
        hypercert_id
        units
        uri
        creator_address
        contract {
          chain_id
        }
        metadata {
          id
          name
          description
          image
          external_url
          work_scope
          contributors
          work_timeframe_from
          work_timeframe_to
          properties
        }
      }
    }
  }
`);

export type HypercertsByCreatorQuery = ResultOf<
  typeof hypercertsByCreatorQuery
>;

export const getFractionsByOwnerQuery = graphql(`
  query GetFractionsByOwner($address: String!) {
    fractions(where: { owner_address: { contains: $address } }, count: COUNT) {
      count
      data {
        id
        fraction_id
        owner_address
        units
        metadata {
          id
          name
          description
          image
          external_url
          work_scope
          contributors
          work_timeframe_from
          work_timeframe_to
        }
      }
    }
  }
`);
export const salesByHypercertId = graphql(`
  query MyQuery($hypercert_id: String) {
    sales(first: 5, where: { hypercert_id: { eq: $hypercert_id } }) {
      data {
        seller
        item_ids
        collection
        id
        currency
        amounts
        buyer
        creation_block_timestamp
      }
    }
  }
`);

export type GetFractionsByOwner = ResultOf<typeof getFractionsByOwnerQuery>;

// {
//     hyperboards(where: {admin_id: {eq: ""}}) {
//     data {
//         sections {
//             data {
//                 entries {
//                     id
//                 }
//             }
//         }
//         id
//     }
// }
// }

export const getHyperboardsByAdminQuery = graphql(
  `
    query GetHyperboardsByAdmin($admin_id: String!) {
      hyperboards(where: { admin_id: { eq: $admin_id } }) {
        data {
          sections {
            data {
              entries {
                id
              }
            }
          }
          id
        }
      }
    }
  `
);

export const getHyperboardsByIdQuery = graphql(
  `
    query GetHyperboardsById($id: UUID!) {
      hyperboards(where: { id: { eq: $id } }) {
        data {
          sections {
            data {
              entries {
                id
              }
            }
          }
          id
        }
      }
    }
  `
);

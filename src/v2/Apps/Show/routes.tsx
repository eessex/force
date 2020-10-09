import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"
import { paramsToCamelCase } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"

const ShowApp = loadable(() => import("./ShowApp"))

export const routes: RouteConfig[] = [
  {
    path: "/show2/:slug",
    getComponent: () => ShowApp,
    prepare: () => {
      ShowApp.preload()
    },
    prepareVariables: initializeVariablesWithFilterState,
    query: graphql`
      query routes_ShowQuery(
        $slug: String!
        $acquireable: Boolean
        $aggregations: [ArtworkAggregation] = [MEDIUM, TOTAL, MAJOR_PERIOD]
        $atAuction: Boolean
        $color: String
        $forSale: Boolean
        $inquireableOnly: Boolean
        $majorPeriods: [String]
        $medium: String
        $offerable: Boolean
        $page: Int
        $partnerID: ID
        $priceRange: String
        $sizes: [ArtworkSizes]
        $sort: String
      ) {
        show(id: $slug) {
          ...ShowApp_show
            @arguments(
              acquireable: $acquireable
              aggregations: $aggregations
              atAuction: $atAuction
              color: $color
              forSale: $forSale
              partnerID: $partnerID
              inquireableOnly: $inquireableOnly
              majorPeriods: $majorPeriods
              medium: $medium
              offerable: $offerable
              page: $page
              priceRange: $priceRange
              sizes: $sizes
              sort: $sort
            )
        }
      }
    `,
  },
]

function initializeVariablesWithFilterState(params, props) {
  const initialFilterState = props.location ? props.location.query : {}

  const state = {
    sort: "-decayed_merch",
    ...paramsToCamelCase(initialFilterState),
    ...params,
  }

  return state
}

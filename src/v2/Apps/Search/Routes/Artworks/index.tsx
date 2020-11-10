import { Box } from "@artsy/palette"
import { RouterState, withRouter } from "found"
import React from "react"

import { ArtworkFilter_viewer } from "v2/__generated__/ArtworkFilter_viewer.graphql"
import { ZeroState } from "v2/Apps/Search/Components/ZeroState"
import { ArtworkFilter } from "v2/Components/v2/ArtworkFilter"
import { updateUrl } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"

interface SearchResultsRouteProps extends RouterState {
  viewer: ArtworkFilter_viewer
}

export const SearchResultsArtworksRoute = withRouter((props => {
  return (
    <Box pt={2}>
      <ArtworkFilter
        viewer={props.viewer}
        filters={props.match.location.query}
        onChange={updateUrl}
        ZeroState={ZeroState}
      />
    </Box>
  )
}) as React.FC<SearchResultsRouteProps>)

// Top-level route needs to be exported for bundle splitting in the router
export default SearchResultsArtworksRoute

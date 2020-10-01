import React from "react"
import ReactDOM from "react-dom"
import { buildClientApp } from "v2/Artsy/Router/client"
import { getAppRoutes } from "v2/Apps/getAppRoutes"
import { data as sd } from "sharify"
import { artworkClient } from "./apps/artwork/artworkClient"
import { artistClient } from "./apps/artist/artistClient"
import { loadableReady } from "@loadable/component"
import { AnalyticsContextProps } from "v2/Artsy/Analytics/AnalyticsContext"
import { OwnerType } from "@artsy/cohesion"

const mediator = require("desktop/lib/mediator.coffee")

const pageType = 'fixme'

const analyticsContext: AnalyticsContextProps = {
  contextPageOwnerType: OwnerType[pageType],
  contextPageOwnerSlug: ''
}

buildClientApp({
  routes: getAppRoutes(),
  context: {
    user: sd.CURRENT_USER,
    mediator,
    analyticsContext
  } as any,
})
  .then(({ ClientApp }) => {
    /**
     * Mount route-specific client code here
     */
    const mountClientAppSupport = () => {
      artistClient()
      artworkClient()
    }

    loadableReady(() => {
      mountClientAppSupport()

      /**
       * Render app
       */
      ReactDOM.hydrate(
        <ClientApp />,
        document.getElementById("react-root"),
        () => {
          const pageType = window.location.pathname.split("/")[1]

          if (pageType === "search") {
            document.getElementById("loading-container").remove()
            document.getElementById("search-page-header").remove()
          }
        }
      )
    })
  })
  .catch((error) => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}

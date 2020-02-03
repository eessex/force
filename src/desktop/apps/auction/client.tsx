import App from "desktop/apps/auction/components/App"
import React from "react"
import ReactDOM from "react-dom"
import auctionReducer from "desktop/apps/auction/reducers"
import configureStore from "desktop/components/react/utils/configureStore"
const Articles = require("desktop/collections/articles.coffee")
const Auction = require("desktop/models/auction.coffee")
const CurrentUser = require("desktop/models/current_user.coffee")

export const init = () => {
  const bootstrapData = window.__BOOTSTRAP__
  const auctionModel = new Auction(bootstrapData.app.auction)
  const auctionArticles = new Articles(bootstrapData.app.articles)
  const { templateComponents } = bootstrapData

  // TODO: Refactor out Backbone
  bootstrapData.app.user = CurrentUser.orNull()
  bootstrapData.app.auction = auctionModel
  bootstrapData.app.articles = auctionArticles

  // Redux store
  const store = configureStore(auctionReducer, {
    app: bootstrapData.app,
    artworkBrowser: bootstrapData.artworkBrowser,
  })

  // Start app
  ReactDOM.hydrate(
    <App store={store} templateComponents={templateComponents} />,
    document.getElementById("react-root")
  )
}

_ = require 'underscore'
React = require 'react'
ReactDOM = require 'react-dom'
ArticlesGridView = require '../../../components/articles_grid/view.coffee'
Articles = require '../../../collections/articles.coffee'
{ fetchArticle } = require("desktop/apps/article/helpers.tsx")
{ ClassicArticleLayout } = require("desktop/apps/article/components/layouts/Classic.tsx")

module.exports = class ArticlesAdapter
  constructor: ({ @profile, @partner, @cache, @el }) ->
    @renderArticle() if @isArticle()
    @renderArticlesGrid() if not @isArticle()

  isArticle: ->
    window.location.pathname.includes '/article/'

  renderArticlesGrid: ->
    @collection = new Articles
    @collection.url = "#{@collection.url}/?partner_id=#{@partner.get('_id')}&published=true&limit=12&sort=-published_at&count=true"
    view = new ArticlesGridView
      el: @el
      collection: @collection
      partner: @partner
    @el.html '<div class="loading-spinner"></div>'
    @collection.fetch()
    view

  renderArticle: ->
    slug = _.last window.location.pathname.split('/')
    article = fetchArticle(
      slug,
      () => window.location.replace @partner.href()
    ).then((article) =>
      article.channel = {
        name: @partner.displayName()
      }
      ReactDOM.render(
        React.createElement(
          ClassicArticleLayout,
          { article }
        ),
        document.getElementById('partner2-content')
      )
    )

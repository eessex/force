Backbone = require 'backbone'
ShareView = require '../share/view.coffee'
textBalancer = require 'text-balancer'
FontFaceObserver = require 'fontfaceobserver'
template = -> require('./templates/article.jade') arguments...

module.exports = class ArticleFeedArticleView extends Backbone.View
  className: 'articles-feed-item'

  attributes: ->
    'data-tier': @model.get('tier')

  postRender: ->
    @share = new ShareView el: @$('.js-article-figure-share')
    @setupFonts()

  render: ->
    @$el.html template(article: @model, balanceText: true)
    @postRender()
    this

  remove: ->
    @share?.remove()
    super

  setupFonts: =>
    font = new FontFaceObserver('Adobe Garamond W08')
    font.load().then ->
      textBalancer.balanceText()
      $('.balance-text').css('opacity', 1)
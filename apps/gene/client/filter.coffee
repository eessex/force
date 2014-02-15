{ ARTSY_URL } = require('sharify').data
_ = require 'underscore'
Backbone = require 'backbone'
FilterArtworksView = require '../../../components/filter/artworks/view.coffee'

module.exports = class GeneFilter extends Backbone.View

  initialize: ->
    @document = document.documentElement
    @mainHeaderHeight = $('#main-layout-header').height()
    @filterView = new FilterArtworksView
      el: $ '#gene-filter'
      artworksUrl: "#{ARTSY_URL}/api/v1/search/filtered/gene/#{@model.get 'id'}"
      countsUrl: "#{ARTSY_URL}/api/v1/search/filtered/gene/#{@model.get 'id'}/suggest"
    @filterView.reset() if @model.isSubjectMatter()

  events:
    'click #gene-filter-all-artists': 'artistMode'
    'click #gene-filter-artworks-nav': 'artworksMode'

  artistMode: ->
    @$el.attr 'data-state', 'artists'
    @$('#gene-filter-all-artists').addClass 'is-active'
    @$('#gene-filter-artworks-nav .is-active').removeClass 'is-active'
    _.defer => @document.scrollTop = @$('#gene-artists').offset().top - @mainHeaderHeight - 50

  artworksMode: =>
    @$el.attr 'data-state', 'artworks'
    @$('#gene-filter-all-artists').removeClass 'is-active'
    _.defer => @document.scrollTop = @$('#gene-artworks').offset().top - @mainHeaderHeight - 50
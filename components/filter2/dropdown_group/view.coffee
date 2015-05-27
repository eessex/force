_ = require 'underscore'
Backbone = require 'backbone'
DropdownView = require '../dropdown/view.coffee'

module.exports = class DropdownGroupView extends Backbone.View
  subViews: {}

  events:
    'click .filter-nav-only-for-sale' : 'toggleForSale'

  # for every facet, render a dropdown view and set up count events
  initialize: ({@collection, @params, @facets}) ->
    for facet in @facets
      @initSubView facet

    @listenTo @params, 'change:price_range', @checkForSale
    @checkForSale()

  # init subview and add to subview hash
  initSubView: (facet) ->
    @subViews[facet] = new DropdownView
      facet: facet
      facets: @facets
      collection: @collection
      params: @params
      el: @$("#filter-dropdown-#{facet}")

  checkForSale: ->
    if @params.get('price_range') is '*-*'
      @$('#only-for-sale').prop 'checked', true
      @$('.filter-nav-only-for-sale').addClass('is-active')
    else
      @$('#only-for-sale').prop 'checked', false
      @$('.filter-nav-only-for-sale').removeClass('is-active')

  toggleForSale: ->
    if @params.get('price_range') is '*-*'
      @params.unset 'price_range'
    else
      @params.set 'price_range', '*-*'

    false

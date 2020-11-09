StepView = require './step.coffee'
template = -> require('../templates/how_can_we_help.jade') arguments...
{ getTrackingOptions } = require("../helpers.ts")

module.exports = class HowCanWeHelp extends StepView
  template: -> template arguments...

  __events__:
    'click button': 'next'
    'click .js-choice': 'choose'

  choose: (e) ->
    e.preventDefault()
    choice = $(e.currentTarget).data 'value'
    @state.set 'value', choice
    
    options = getTrackingOptions()
    window.analytics.track(
      "inquiry_questionnaire: Clicked on how_can_we_help option",
      { choice: choice },
      options
    )
    @next()

import { extend } from "underscore"
import { mediator } from "lib/mediator"
import { data as sd } from "sharify"
const modalize = require("../modalize/index.coffee")
const State = require("../branching_state/index.coffee")
const StateView = require("../branching_state/view.coffee")
const Logger = require("../logger/index.coffee")
const Trail = require("./trail.coffee")
const analytics = require("./analytics.coffee")
const openErrorFlash = require("./error.coffee")
let { steps, decisions, views } = require("./map.coffee")

export const openInquiryQuestionnaireFor = ({
  user,
  artwork,
  inquiry,
  bypass,
  state_attrs,
  ask_specialist,
}) => {
  const { collectorProfile } = user.related()
  const { userInterests } = collectorProfile.related()

  user.approximateLocation()

  // Allow us to trigger individual steps for debugging
  // by passing the named step as a `bypass` option
  if (bypass) {
    steps = bypass
  }

  const state = new State(
    extend(
      {
        steps,
        decisions,
      },
      state_attrs
    )
  )

  const logger = new Logger("inquiry-questionnaire-log")
  const trail = new Trail()

  const questionnaire = new StateView({
    className: "inquiry-questionnaire",
    state,
    views,
  })

  const modal = modalize(questionnaire, {
    className: "modalize inquiry-questionnaire-modal",
    dimensions: { width: "500px", height: "640px" },
  })

  state.inject({
    user,
    artwork,
    inquiry,
    logger,
    modal: modal.view,
    collectorProfile,
    userInterests,
    trail,
    enableNewInquiryFlow:
      sd.COMMERCIAL != null ? sd.COMMERCIAL.enableNewInquiryFlow : undefined,
    ask_specialist,
  })

  // Attach/teardown analytics events
  analytics.attach(state.context)

  modal.view.on("closed", () => {
    analytics.teardown(state.context)
    // Dispatch a reload event to the new reaction app shell. If user has created
    // account or logged in, page will reload to sync logged in state.
    mediator.trigger("auth:login:inquiry_form:maybeReloadOnModalClose")
  })

  // Log to both the `Logger` and the `Trail`
  const log = step => {
    trail.log(step)
    logger.log(step)
  }

  state
    // Log each step
    .on("next", log)
    // End of complete flow
    .on("done", () => {
      if (inquiry.send != null) {
        // Send the inquiry immediately
        inquiry.send(
          {},
          {
            success() {
              modal.close()
            },
            error(_model, response, _options) {
              modal.close(() => openErrorFlash(response))
            },
          }
        )
      } else {
        modal.close()
      }
    })

  // Prepare the user and open the modal
  modal.load(open =>
    user
      .prepareForInquiry()
      .then(() => {
        log(state.current())
        return open()
      })
      .catch(e => {
        modal.close(() => openErrorFlash(e))
        return console.error(e, e.stack)
      })
  )

  return modal
}

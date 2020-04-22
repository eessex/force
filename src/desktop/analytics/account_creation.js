import mediator from "../lib/mediator.coffee"
//
// Generic events for tracking events around account creation.
//

const getUrlParameter = name => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
  let results = regex.exec(location.search)
  return results === null
    ? undefined
    : decodeURIComponent(results[1].replace(/\+/g, " "))
}

const getAcquisitionInitiative = () =>
  getUrlParameter("m-id") || getUrlParameter("acquisition_initiative")

const trackAccountCreation = options => {
  analytics.track(options)

  analytics.identify(options.user_id, _.pick(options, "email"), {
    integrations: {
      All: false,
      Marketo: true,
    },
  })
}

// Created account (via email)
$(document).one(
  "submit",
  ".auth-register form, .marketing-signup-modal form, .artist-page-cta-overlay__register form",
  () => {
    $(document).one("ajaxComplete", (e, xhr, options) =>
      mediator.trigger("auth:sign_up:email", {
        acquisition_initiative: getAcquisitionInitiative(),
        signup_service: "email",
        user_id: xhr.responseJSON.user.id,
        context: options.context,
        email: xhr.responseJSON.user.email,
      })
    )
  }
)

// Created account (via social)

// Track account creation via social services
// After landing back on Artsy send the tracking call and expire the cookie
if (Cookies.get("analytics-signup")) {
  var data = JSON.parse(Cookies.get("analytics-signup"))
  Cookies.expire("analytics-signup")

  if (sd.CURRENT_USER) {
    trackAccountCreation({
      ...data,
      user_id: sd.CURRENT_USER.id,
    })
  }
}

analyticsHooks.on("auth:login", (options = {}) => {
  analytics.track(options)
})

// Triggered sign up form via save button
if (!sd.CURRENT_USER) {
  $(".artwork-item-image-container .overlay-button-save").click(function() {
    analytics.track("Triggered sign up form via save button")
  })
}

// Triggered sign up form via follow button
if (!sd.CURRENT_USER) {
  $(".follow-button, .entity-follow").click(function() {
    analytics.track("Triggered sign up form via follow button")
  })
}

// Clicked sign up via the header
$(".mlh-signup").click(function() {
  analytics.track("Clicked sign up via the header")
})

// Clicked sign out via the header
$(".mlh-logout").click(function() {
  analytics.track("Clicked logout via the header")
})

$("#auth-footer [href*=sign_up]").click(trackViewSignup)

// Created account via consignments submission page
analyticsHooks.on("consignment:account:created", function(options) {
  if (options.accountCreated) {
    trackAccountCreation({
      signup_service: "email",
      user_id: options.id,
      context: "consignments",
      email: options.email,
    })
  } else {
    analytics.identify(options.user_id, options.email, {
      integrations: {
        All: false,
        Marketo: true,
      },
    })
  }
})

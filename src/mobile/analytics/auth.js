//
// Events for signup and login.
//

// Created account (via email)
// FIXME: Maybe not used?
analyticsHooks.on("auth:signup", function(data, res) {
  analytics.track("Created account", {
    acquisition_initiative: data.acquisition_initiative,
    signup_service: "email",
    user_id: res.user.id,
  })
})

// Track account creation via social services
// After landing back on Artsy send the tracking call and expire the cookie
// FIXME: Maybe not used? duplicated in desktop analytics
if (Cookies.get("analytics-signup")) {
  var data = JSON.parse(Cookies.get("analytics-signup"))
  Cookies.expire("analytics-signup")
  if (sd.CURRENT_USER) {
    analytics.track("Created account", {
      acquisition_initiative: data.acquisition_initiative,
      service: data.service,
      user_id: sd.CURRENT_USER.id,
    })
  }
}

// Successfully logged in
// FIXME: Maybe not used?
analyticsHooks.on("auth:login", function(options) {
  analytics.track(options)
})

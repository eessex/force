export const inquiryReferrerTrackingOptions = () => {
  let trackingOptions = {}

  const referrer = window.analytics.__artsyClientSideRoutingReferrer
  // Grab referrer from our trackingMiddleware in Reaction, since we're in a
  // single-page-app context and the value will need to be refreshed on route
  // change. See: https://github.com/artsy/force/blob/master/src/v2/Artsy/Analytics/trackingMiddleware.ts
  if (referrer) {
    trackingOptions = {
      page: {
        referrer,
      },
    }
  }

  return trackingOptions
}

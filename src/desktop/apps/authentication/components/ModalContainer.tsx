import Cookies from "cookies-js"
import React from "react"
import { data as sd } from "sharify"

import {
  createdAccount,
  AuthService,
  successfullyLoggedIn,
} from "@artsy/cohesion"
import { handleSubmit, setCookies } from "../helpers"
import { ModalManager } from "@artsy/reaction/dist/Components/Authentication/Desktop/ModalManager"
import {
  ModalOptions,
  ModalType,
} from "reaction/Components/Authentication/Types"

const mediator = require("../../../lib/mediator.coffee")

interface SocialAuthArgs extends ModalOptions {
  service: AuthService
}

export class ModalContainer extends React.Component<any> {
  public manager: ModalManager | null

  UNSAFE_componentWillMount() {
    mediator.on("open:auth", this.onOpenAuth)
    mediator.on("auth:error", this.onAuthError)
  }

  onOpenAuth = (options: ModalOptions) => {
    options.destination = options.destination || location.href
    if (options && (options.mode as any) === "register") {
      options.mode = ModalType.signup
    }

    setCookies(options)
    setTimeout(
      () => {
        if (this.manager) {
          this.manager.openModal(options)
        }
      },
      document.readyState === "complete" ? 0 : 500
    )
  }

  onAuthError = (err: any) => {
    if (this.manager) {
      this.manager.setError(err)
    }
  }

  onSocialAuthEvent = ({
    contextModule,
    destination,
    intent,
    mode,
    redirectTo,
    service,
    triggerSeconds,
  }: SocialAuthArgs) => {
    const options = {
      contextModule,
      triggerSeconds,
      intent,
      authRedirect: redirectTo || destination,
      service,
    }
    let analyticsOptions
    if (mode === "signup") {
      analyticsOptions = createdAccount(options)
    } else {
      analyticsOptions = successfullyLoggedIn(options)
    }

    Cookies.set(`analytics-${data.mode}`, JSON.stringify(analyticsOptions), {
      expires: 60 * 60 * 24,
    })
  }

  render() {
    return (
      <ModalManager
        ref={ref => (this.manager = ref)}
        submitUrls={{
          login: sd.AP.loginPagePath,
          signup: sd.AP.signupPagePath,
          apple: sd.AP.applePath,
          facebook: sd.AP.facebookPath,
          twitter: sd.AP.twitterPath,
        }}
        csrf={sd.CSRF_TOKEN}
        handleSubmit={handleSubmit}
        onSocialAuthEvent={this.onSocialAuthEvent}
        onModalClose={() => {
          mediator.trigger("modal:closed")
        }}
        showRecaptchaDisclaimer={true}
      />
    )
  }
}

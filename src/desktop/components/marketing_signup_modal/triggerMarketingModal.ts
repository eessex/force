import { data as sd } from "sharify"
import qs from "querystring"
import { findWhere } from "underscore"
import { handleOpenAuthModal } from "desktop/apps/authentication/helpers"
import { ModalType } from "@artsy/reaction/dist/Components/Authentication/Types"

interface ModalData {
  image: string
  copy: string
}

export const triggerMarketingModal = (isScrolling?: boolean) => {
  const query = qs.parse(location.search.replace(/^\?/, ""))
  const isTargetCampaign = sd.CURRENT_PATH === sd.TARGET_CAMPAIGN_URL
  const slug = query["m-id"] || (isTargetCampaign && "ca3")
  const modalData = findWhere(sd.MARKETING_SIGNUP_MODALS, { slug: slug })

  if (sd.MARKETING_SIGNUP_MODALS && modalData) {
    if (!sd.CURRENT_USER) {
      if (isScrolling) {
        scrollingMarketingModal(modalData)
      } else {
        staticMarketingModal(modalData)
      }
    }
  }
}

export const scrollingMarketingModal = (modalData: ModalData) => {
  if (!sd.IS_MOBILE) {
    window.addEventListener(
      "scroll",
      () => {
        setTimeout(() => {
          const { image, copy } = modalData
          handleOpenAuthModal(ModalType.signup, {
            copy,
            intent: "signup",
            trigger: "scroll",
            triggerSeconds: 2,
            destination: location.href,
            image,
          })
        }, 2000)
      },
      { once: true }
    )
  }
}

export const staticMarketingModal = (modalData: ModalData) => {
  const { image, copy } = modalData
  handleOpenAuthModal(ModalType.signup, {
    copy,
    intent: "signup",
    destination: location.href,
    image,
  })
}

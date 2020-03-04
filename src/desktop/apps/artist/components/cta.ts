import { get } from "lodash"
import { data as sd } from "sharify"
import { handleOpenAuthModal } from "desktop/apps/authentication/helpers"
import { ModalType } from "@artsy/reaction/dist/Components/Authentication/Types"
const metaphysics = require("lib/metaphysics.coffee")

export const query = `
query ArtistCTAQuery($artistID: String!) {
  artist(id: $artistID) {
    name
    artworks(size: 1) {
      image {
        cropped(width: 390, height: 644) {
          url
        }
      }
    }
  }
}
`
const send = {
  method: "post",
  query,
  variables: { artistID: sd.ARTIST_PAGE_CTA_ARTIST_ID },
}

export const setupArtistSignUpModal = () => {
  if (sd.ARTIST_PAGE_CTA_ENABLED && sd.ARTIST_PAGE_CTA_ARTIST_ID) {
    return metaphysics(send).then(({ artist: artistData }) => {
      const image = get(artistData, "artworks[0].image.cropped.url")

      if (!sd.CURRENT_USER && !sd.IS_MOBILE) {
        window.addEventListener(
          "scroll",
          () => {
            setTimeout(() => {
              handleOpenAuthModal(ModalType.signup, {
                copy: `Join Artsy to discover new works by ${artistData.name} and more artists you love`,
                intent: "signup",
                trigger: "scroll",
                triggerSeconds: 4,
                destination: location.href,
                image,
              })
            }, 4000)
          },
          { once: true }
        )
      }
    })
  }
}

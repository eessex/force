import { ArtworkSidebar_Test_QueryRawResponse } from "v2/__generated__/ArtworkSidebar_Test_Query.graphql"

export const ArtworkSidebarFixture: ArtworkSidebar_Test_QueryRawResponse["artwork"] = {
  id: "josef-albers-homage-to-the-square-85",
  internalID: "sdf222",
  is_biddable: false,
  is_in_auction: false,
  is_for_sale: true,
  is_inquireable: true,
  is_acquireable: false,
  is_offerable: false,
  sale_message: "$2,000",
  listPrice: {
    __typename: "Money",
    display: "$2,000",
  },
  priceIncludesTaxDisplay: null,
  shippingInfo: null,
  shippingOrigin: null,
  cultural_maker: null,
  hasCertificateOfAuthenticity: false,
  slug: "josef-albers-meow",
  partner: {
    id: "UGFydG5lcjpyb2dhbGxlcnk=",
    isVerifiedSeller: false,
    name: "RoGallery",
    href: "/rogallery",
    locations: [],
  },
  sale_artwork: null,
  sale: null,
  myLotStanding: null,
  artists: [
    {
      id: "QXJ0aXN0Ompvc2VmLWFsYmVycw==",
      slug: "josef-albers",
      internalID: "asb2335",
      related: null,
      name: "Josef Albers",
      href: "/artist/josef-albers",
      is_followed: false,
      counts: {
        follows: 9346,
      },
      is_consignable: true,
    },
  ],
  title: "Homage to the Square",
  date: "1972",
  medium: "Silkscreen",
  edition_sets: [
    {
      id: "RWRpdGlvblNldDo1YmM4ZGZmNWE4YzMzODQ5ZjVhODc3ZDE=",
      internalID: "abc23444",
      is_acquireable: false,
      is_offerable: false,
      __typename: "ArtworkEditionSet",
      sale_message: "For sale",
      dimensions: {
        in: "15 × 20 in",
        cm: "38.1 × 50.8 cm",
      },
      edition_of: "Edition of 1000",
    },
  ],
  dimensions: {
    in: "15 × 20 in",
    cm: "38.1 × 50.8 cm",
  },
  edition_of: "Edition of 1000",
  attribution_class: {
    id: "asdlfkjsdf",
    short_description: "This is an editioned multiple",
  },
}

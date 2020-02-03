import React from "react"
import { init, initModalManager } from "../index"
import { data as sd } from "sharify"
import { AuthStatic } from "../../components/AuthStatic"
import { MobileAuthStatic } from "../../components/MobileAuthStatic"
import { ModalContainer } from "../../components/ModalContainer"

jest.mock("cookies-js")
jest.mock("sharify")
jest.mock("react-dom", () => ({
  hydrate: jest.fn(),
  render: jest.fn(),
}))
const hydrateMock = require("react-dom").hydrate as jest.Mock
const renderMock = require("react-dom").render as jest.Mock
const cookieMock = require("cookies-js").set as jest.Mock

describe("Auth client", () => {
  beforeEach(() => {
    cookieMock.mockClear()
    hydrateMock.mockClear()
  })

  describe("#init", () => {
    beforeEach(() => {
      // @ts-ignore
      global.document.getElementById = jest.fn(() => <div id="react-root" />)
      window.__BOOTSTRAP__ = {
        options: {
          destination: "/foo",
        },
      }
    })

    it("Returns AuthStatic by default", () => {
      init()
      const component = hydrateMock.mock.calls[0][0]

      expect(component.type).toBe(AuthStatic)
    })

    it("Returns MobileAuthStatic if sd.IS_MOBILE", () => {
      sd.IS_MOBILE = true
      init()
      const component = hydrateMock.mock.calls[0][0]

      expect(component.type).toBe(MobileAuthStatic)
    })

    it("calls #setCookies", () => {
      init()
      const cookieMock = require("cookies-js").set as jest.Mock
      const cookie = cookieMock.mock.calls[0]

      expect(cookie[0]).toBe("destination")
      expect(cookie[1]).toMatch("/foo")
      expect(cookie[2].expires).toBe(86400)
    })
  })

  describe("#initModalManager", () => {
    beforeEach(() => {
      // @ts-ignore
      global.document.getElementById = jest.fn(() => (
        <div id="react-modal-container" />
      ))
    })

    it("Sets up the modal container", () => {
      initModalManager()
      const component = renderMock.mock.calls[0][0]

      expect(component.type).toBe(ModalContainer)
    })
  })
})

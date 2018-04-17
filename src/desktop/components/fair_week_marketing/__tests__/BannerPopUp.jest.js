import React from 'react'
import { mount } from 'enzyme'
import { BannerPopUp, Container } from '../BannerPopUp'

describe('BannerPopUp', () => {
  let props = {
    ctaTitle: 'CTA Title',
    ctaImageUrl: 'http://image.jpg',
  }

  const getWrapper = props => {
    return mount(<BannerPopUp {...props} />)
  }

  describe('introduction', () => {
    it('renders title and image', () => {
      const component = getWrapper(props)

      expect(component.text()).toMatch(props.ctaTitle)
      expect(component.html()).toMatch(props.ctaImageUrl)
    })

    it('Calls #openModal on click', () => {
      BannerPopUp.prototype.openModal = jest.fn()
      const component = getWrapper(props)
      component.find(Container).simulate('click')
      console.log(component.instance().openModal.mock.calls)
    })
  })
})

import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Divider from '../Divider.vue'

describe('Divider', () => {
  it('renders the component', () => {
    const wrapper = mount(Divider)
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('sets direction class based on direction prop', () => {
    const wrapper = mount(Divider, { props: { direction: 'vertical' } })
    expect(wrapper.find('.c-divider-vertical').exists()).toBe(true)
  })

  it('sets dashed class when dashed prop is true', () => {
    const wrapper = mount(Divider, { props: { dashed: true } })
    expect(wrapper.find('.c-divider-dashed').exists()).toBe(true)
  })

  it('shows text when slot is provided', () => {
    const wrapper = mount(Divider, { slots: { default: 'My Divider Text' } })
    expect(wrapper.find('.c-divider-with-text').exists()).toBe(true)
  })

  it('sets margin style based on margin prop', () => {
    const wrapper = mount(Divider, { props: { margin: '10px' } })
    expect(wrapper.find('div').attributes('style')).toContain(
      'margin-top: 10px; margin-bottom: 10px;'
    )
  })
})

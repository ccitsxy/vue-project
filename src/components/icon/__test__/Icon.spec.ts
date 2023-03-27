import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Icon from '../Icon.vue'

describe('Icon', () => {
  it('renders the component', () => {
    const wrapper = mount(Icon)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the correct aria-label', () => {
    const wrapper = mount(Icon, {
      props: {
        ariaLabel: 'test-label'
      }
    })
    expect(wrapper.attributes('aria-label')).toBe('test-label')
  })

  it('renders the correct size', () => {
    const wrapper = mount(Icon, {
      props: {
        size: 'large'
      }
    })
    expect(wrapper.classes('icon-large')).toBe(true)
  })

  it('renders with spin class when spin prop is true', () => {
    const wrapper = mount(Icon, {
      props: {
        spin: true
      }
    })
    expect(wrapper.classes('icon-spin')).toBe(true)
  })

  it('renders with rotation transform when rotate prop is provided', () => {
    const wrapper = mount(Icon, {
      props: {
        rotate: 45
      }
    })
    expect(wrapper.attributes('style')).toContain('transform: rotate(45deg);')
  })

  it('renders the default slot if no component prop is provided', () => {
    const wrapper = mount(Icon, {
      slots: {
        default: '<span>test-slot</span>'
      }
    })
    expect(wrapper.find('span').text()).toBe('test-slot')
  })

  it('renders the provided component', () => {
    const wrapper = mount(Icon, {
      props: {
        component: 'div'
      }
    })
    expect(wrapper.find('div').exists()).toBe(true)
  })
})

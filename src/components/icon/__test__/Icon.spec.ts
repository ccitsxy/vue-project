import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { markRaw } from 'vue'
import Icon from '../Icon.vue'
import IconSpin from '../IconSpin.vue'

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
    expect(wrapper.classes('c-icon-large')).toBe(true)
  })

  it('renders with spin class when spin prop is true', () => {
    const wrapper = mount(Icon, {
      props: {
        spin: true
      }
    })
    expect(wrapper.classes('c-icon-spin')).toBe(true)
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
        default: markRaw(IconSpin)
      }
    })
    expect(wrapper.findComponent(IconSpin).exists()).toBe(true)
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

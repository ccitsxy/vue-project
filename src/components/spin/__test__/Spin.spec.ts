import { describe, it, expect, vitest } from 'vitest'

import { mount } from '@vue/test-utils'
import Spin from '../Spin.vue'
import SpinIcon from '../SpinIcon.vue'

describe('Spin', () => {
  it('renders the component', () => {
    const wrapper = mount(Spin)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the child content', () => {
    const wrapper = mount(Spin, {
      slots: {
        default: '<span>test-slot</span>'
      }
    })
    expect(wrapper.find('.spin-child').text()).toBe('test-slot')
  })

  it('renders the correct size', () => {
    const wrapper = mount(Spin, {
      props: {
        size: 'large'
      }
    })
    expect(wrapper.classes('spin-large')).toBe(true)
  })

  it('renders the tip', () => {
    const wrapper = mount(Spin, {
      props: {
        tip: 'test-tip'
      }
    })
    expect(wrapper.text()).toContain('test-tip')
  })

  it('renders the indicator slot', () => {
    const wrapper = mount(Spin, {
      slots: {
        indicator: '<span>test-indicator</span>'
      }
    })
    expect(wrapper.find('.spin-indicator').text()).toBe('test-indicator')
  })

  it('renders the default SpinIcon when no indicator slot is provided', () => {
    const wrapper = mount(Spin)
    expect(wrapper.findComponent(SpinIcon).exists()).toBe(true)
  })

  it('hides the spin content when spin prop is false', async () => {
    const wrapper = mount(Spin, {
      props: {
        spin: false
      }
    })
    expect(wrapper.classes('spin-hidden')).toBe(true)
  })

  it('delays the spin display by the specified delay prop', async () => {
    vitest.useFakeTimers()
    const wrapper = mount(Spin, {
      props: {
        delay: 1000
      }
    })
    expect(wrapper.classes('spin-hidden')).toBe(true)
    vitest.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()
    expect(wrapper.classes('spin-hidden')).toBe(false)
  })

  it('applies the wrapperClassName prop', () => {
    const wrapper = mount(Spin, { props: { wrapperClassName: 'test-class' } })
    expect(wrapper.classes('test-class')).toBe(true)
  })

  it('applies the childStyle prop', () => {
    const wrapper = mount(Spin, {
      props: { childStyle: { backgroundColor: 'red' } },
      slots: { default: 'test-slot' }
    })
    expect(wrapper.find('.spin-child').attributes('style')).toContain('background-color: red;')
  })
})

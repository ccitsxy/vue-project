import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(Button)
    expect(wrapper.classes()).toContain('button')
    expect(wrapper.classes()).toContain('button-light')
    expect(wrapper.classes()).toContain('button-default')
    expect(wrapper.vm.$props.disabled).toBe(false)
    expect(wrapper.vm.$props.loading).toBe(false)
    expect(wrapper.vm.$props.iconPlacement).toBe('left')
  })

  it('emits click event when button is clicked', async () => {
    const wrapper = mount(Button)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('emits mousedown event when button is mousedown', async () => {
    const wrapper = mount(Button)
    await wrapper.find('button').trigger('mousedown')
    expect(wrapper.emitted()['mousedown']).toBeTruthy()
  })

  it('emits mouseenter event when button is mouseenter', async () => {
    const wrapper = mount(Button)
    await wrapper.find('button').trigger('mouseenter')
    expect(wrapper.emitted()['mouseenter']).toBeTruthy()
  })

  it('emits mouseleave event when button is mouseleave', async () => {
    const wrapper = mount(Button)
    await wrapper.find('button').trigger('mouseleave')
    expect(wrapper.emitted()['mouseleave']).toBeTruthy()
  })

  it('does not emit mouse event when button is disabled', async () => {
    const wrapper = mount(Button, { props: { disabled: true } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('shows loading icon when loading prop is set', () => {
    const wrapper = mount(Button, { props: { loading: true } })
    expect(wrapper.find('.button-loading').exists()).toBe(true)
  })

  it('renders button with icon prop', () => {
    const wrapper = mount(Button, { props: { icon: 'check' } })
    expect(wrapper.find('.button-with-icon').exists()).toBe(true)
  })

  it('renders button with icon slot', () => {
    const wrapper = mount(Button, {
      slots: {
        icon: '<span class="test-icon"></span>'
      }
    })
    expect(wrapper.classes()).toContain('button-with-icon')
    expect(wrapper.find('.test-icon').exists()).toBe(true)
  })
})

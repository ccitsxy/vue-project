import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { markRaw } from 'vue'
import Button from '../Button.vue'
import { IconSpin } from '../../icon'

describe('Button', () => {
  it('renders the component', () => {
    const wrapper = mount(Button)
    expect(wrapper.classes()).toContain('c-button')
    expect(wrapper.classes()).toContain('c-button-light')
    expect(wrapper.vm.$props.disabled).toBe(false)
    expect(wrapper.vm.$props.loading).toBe(false)
    expect(wrapper.vm.$props.iconPlacement).toBe('left')
  })

  it('emits click event when button is clicked', async () => {
    const wrapper = mount(Button)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('emits mousedown event when button is mousedownd', async () => {
    const wrapper = mount(Button)
    await wrapper.find('button').trigger('mousedown')
    expect(wrapper.emitted()['mousedown']).toBeTruthy()
  })

  it('emits mouseenter event when button is mouseenterd', async () => {
    const wrapper = mount(Button)
    await wrapper.find('button').trigger('mouseenter')
    expect(wrapper.emitted()['mouseenter']).toBeTruthy()
  })

  it('emits mouseleave event when button is mouseleaved', async () => {
    const wrapper = mount(Button)
    await wrapper.find('button').trigger('mouseleave')
    expect(wrapper.emitted()['mouseleave']).toBeTruthy()
  })

  it('does not emit click event when button is disabled', async () => {
    const wrapper = mount(Button, { props: { disabled: true } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('does not emit mousedown event when button is disabled', async () => {
    const wrapper = mount(Button, { props: { disabled: true } })
    await wrapper.find('button').trigger('mousedown')
    expect(wrapper.emitted()['mousedown']).toBeFalsy()
  })

  it('does not emit mouseenter event when button is disabled', async () => {
    const wrapper = mount(Button, { props: { disabled: true } })
    await wrapper.find('button').trigger('mouseenter')
    expect(wrapper.emitted()['mouseenter']).toBeFalsy()
  })

  it('does not emit mouseleave event when button is disabled', async () => {
    const wrapper = mount(Button, { props: { disabled: true } })
    await wrapper.find('button').trigger('mouseleave')
    expect(wrapper.emitted()['mouseleave']).toBeFalsy()
  })

  it('shows loading icon when loading prop is set', () => {
    const wrapper = mount(Button, { props: { loading: true } })
    expect(wrapper.find('.c-button-loading').exists()).toBe(true)
  })

  it('renders button with icon prop', () => {
    const wrapper = mount(Button, { props: { icon: markRaw(IconSpin) } })
    expect(wrapper.find('.c-button-with-icon').exists()).toBe(true)
  })

  it('renders button with icon slot', () => {
    const wrapper = mount(Button, {
      slots: {
        icon: markRaw(IconSpin)
      }
    })
    expect(wrapper.find('.c-button-with-icon').exists()).toBe(true)
  })
})

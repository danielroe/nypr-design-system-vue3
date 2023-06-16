import { mount } from '@vue/test-utils'
// import { describe, test, expect } from '@jest/globals'
import { toHaveNoViolations } from 'jest-axe'
import VShareTools from '../components/VShareTools.vue'
import AudioIcon from '../assets/icons/AudioIcon.vue'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)


describe('VShareTools', () => {
  let wrapper = {}
  const vertical = true
  const responsive = true
  const bp = 'md'
  const label = 'The label'

  const createComponent = ({ props = {} } = {}) => {
    wrapper = mount(VShareTools, {
      props,
    })
  }

  afterEach(() => {
    if (wrapper && wrapper.destroy) {
      wrapper.destroy()
    } else {
      wrapper = null
    }
  })

  test('with label', () => {
    createComponent({
      props: {
        label,
      }
    })

    const labelProp = wrapper.find('.label')

    expect(labelProp.text()).toMatch(label)
  })

  test('vertical', () => {
    createComponent({
      props: {
        label,
        vertical
      }
    })

    const group = wrapper.find('.group')

    expect(group.attributes().class).toContain('vertical')
  })

  test('it passes basic accessibility tests', async () => {
    createComponent({
      props: {
        label
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})

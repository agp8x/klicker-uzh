/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import Running from './running'

// HACK: workaround for https://github.com/Semantic-Org/Semantic-UI-React/issues/1702
jest.mock('react-dom', () => ({
  findDOMNode: jest.fn(() => {}),
}))

describe('Snapshot-Testing', () => {
  it('Works', () => {
    const component = renderer.create(<Running />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Api from '../Api'

test('Api component should render as expected', () => {
  const component = shallow(<Api />)
  const tree = toJson(component)
  expect(tree).toMatchSnapshot()
})

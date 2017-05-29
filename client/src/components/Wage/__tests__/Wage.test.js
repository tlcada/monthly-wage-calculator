import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import toJson from 'enzyme-to-json'
import Wage from '../Wage'

test('Wage component should render as expected', () => {
  const component = shallow(<Wage />)
  const tree = toJson(component)
  expect(tree).toMatchSnapshot()
})

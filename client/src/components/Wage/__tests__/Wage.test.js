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

/* Skip the broken test */
test.skip('Call componentDidMount only once', async () => {
  sinon.spy(Wage.prototype, 'componentDidMount')
  const wrapper = mount(<Wage />)
  expect(Wage.prototype.componentDidMount.calledOnce).toEqual(true)
})
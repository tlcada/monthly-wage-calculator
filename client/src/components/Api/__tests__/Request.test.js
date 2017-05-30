import React from 'react'
import { Request } from '../Request'

test('The data is JSON object', async () => {
  expect.assertions(1)
  const data = await Request('http://localhost:3000/api/wage')
  expect(data).toEqual({ 'Janet Java': { '3/2017': 701.61, '4/2017': 14.7 }, 'Scott Scala': { '3/2017': 657.34, '4/2017': 109.73 }, 'Larry Lolcode': { '3/2017': 377.01 }})
})

test('The fetch fails with an error', async () => {
  return Request('http://localhost:3000/api/wage').catch(e =>
    expect(e).toMatch('error')
  )
})

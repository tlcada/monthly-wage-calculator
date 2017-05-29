import React, { Component } from 'react'

import { Table } from 'react-bootstrap'
import { Request } from '../Api/Request'

class Wage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    const data = Request()
    data.then(json => {
      this.setState({data: [json]})
    }).catch((err) => {
      console.log('Request failed', err)
    })
  }

  render () {
    return (
      <div>
        <Table striped hover>
          <thead>
            <tr>
              <th>Person Name</th>
              <th>Wage</th>
              <th>Month</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(data =>
              Object.keys(data).map(person =>
              Object.keys(data[person]).map(month =>
                <tr key={person + '_' + month}>
                  <td>{person}</td>
                  <td>${data[person][month]}</td>
                  <td>{month}</td>
                </tr>
             )))}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Wage

'use strict';

import React from 'react'
import {Table} from 'react-bootstrap';
import config from '../../../config/config';

class Wage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch(config.apiUrl, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            return response.json()
        }).then(json => {
            this.setState({data: [json]});
         }).catch(function(err) {
            console.log('Request failed', err);
        });
    };

    render() {
        const allData = this.state.data;
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
                        {
                            allData.map(data =>
                                Object.keys(data).map(person =>
                                    Object.keys(data[person]).map(month =>
                                        <tr key={person + '_' + month}>
                                            <td>{person}</td>
                                            <td>${data[person][month]}</td>
                                            <td>{month}</td>
                                        </tr>
                                    )
                                )
                            )
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Wage;
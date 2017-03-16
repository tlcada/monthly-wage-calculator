'use strict';

import React from 'react'
import {Link} from 'react-router'
import {Navbar} from 'react-bootstrap';
import config from '../../../config/config';

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to={`/`}>Monthly Wage Calculator</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                </Navbar>

                <div className="container">
                    <p><a href={config.apiDoc} title="API documentation" target="_blank">API documentation</a></p>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App;

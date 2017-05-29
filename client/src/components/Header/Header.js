import React from 'react'

import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'

const Header = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to='/'>Monthly Wage Calculator</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
  </Navbar>
)

export default Header

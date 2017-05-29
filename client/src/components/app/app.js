import React from 'react'

import { BrowserRouter as Router } from 'react-router-dom'
import Header from '../Header/Header'
import Api from '../Api/Api'
import Wage from '../Wage/Wage'

const App = () => (
  <Router>
    <div>
      <Header />
      <div className='container'>
        <Api />
        <Wage />
      </div>
    </div>
  </Router>
)

export default App

import React from 'react'
import ReactDOM from 'react-dom'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

import './base.scss'
import App from './components/App/App'

ReactDOM.render(
  <App />, document.getElementById('app')
)

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install()
}

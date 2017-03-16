'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './appContainer'
import './components/app/app.scss'

const render = Component => {
    ReactDOM.render(<AppContainer><Component /></AppContainer>, document.getElementById('app'))
};

render(App);

if (module.hot) {
    module.hot.accept('./appContainer', () => {
        render(App)
    })
}
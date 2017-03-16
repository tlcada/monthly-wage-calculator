'use strict';

import React from 'react';
import {Router, hashHistory} from 'react-router';
import App from './components/app/app'
import Wage from './components/wage/wage'

const ROUTES = {
    path: '/',
    component: App,
    indexRoute: {
        onEnter: (nextState, replace) => replace('/wage')
    },
    childRoutes: [
        {path: '/wage', component: Wage}
    ]
};

class AppContainer extends React.Component {
    render () {
        return (
            <Router history={hashHistory} routes={ROUTES}></Router>
        );
    }
}

export default AppContainer;
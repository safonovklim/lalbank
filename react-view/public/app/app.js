import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,IndexRoute,hashHistory} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'




import store from './store';
const history = syncHistoryWithStore(hashHistory, store)

import VTemplate from './pages/layout/Template'
import VMain from './pages/Main'
import VDemoPaywall from './pages/DemoPaywall'

import VSignUp from './pages/SignUp'
import VLogin from './pages/Login'
import VProfile from './pages/Profile'

import VAdminLogin from './pages/admin/Login'
import VAdminSignUp from './pages/admin/SignUp'
import VAdminDashboard from './pages/admin/Dashboard'
import VAdminClients from './pages/admin/Clients'
import VAdminClient from './pages/admin/Client'


import routeProtector, {ONLY_AUTHENTICATED, ONLY_EMPLOYEE_ALL} from './helpers/routeProtector'

import {restore_session} from './actions/client'
import {restore_e_session} from './actions/employee'
import axios from 'axios'
import cookie from 'react-cookie'




const app = document.getElementById('app');
let init_app = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={VTemplate}>
                    <IndexRoute component={VMain}></IndexRoute>

                    <Route path="signup" component={VSignUp}></Route>
                    <Route path="login" component={VLogin}></Route>
                    <Route path="profile" component={routeProtector(VProfile, ONLY_AUTHENTICATED)}></Route>

                    <Route path="demo_paywall" component={VDemoPaywall}></Route>

                    <Route path="admin/">
                        <Route path="signup" component={VAdminSignUp}></Route>
                        <Route path="login" component={VAdminLogin}></Route>
                        <Route path="dashboard" component={routeProtector(VAdminDashboard, ONLY_EMPLOYEE_ALL)}></Route>
                        <Route path="clients" component={routeProtector(VAdminClients, ONLY_EMPLOYEE_ALL)}></Route>
                        <Route path="clients/:client_id" component={routeProtector(VAdminClient, ONLY_EMPLOYEE_ALL)}></Route>
                    </Route>
                </Route>
            </Router>
        </Provider>,
        app);
}


new Promise((resolve, reject) => {
    resolve()
})
    .then(() => {
        let client_token = cookie.load('client_token')
        if (client_token && client_token['length'] > 0) {
            store.dispatch(restore_session())
        }
    })
    .then(() => {
        let employee_token = cookie.load('employee_token')
        if (employee_token && employee_token['length'] > 0) {
            store.dispatch(restore_e_session())
        }
    })
    .then(() => {
        init_app()
    })



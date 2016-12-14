import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,IndexRoute,hashHistory} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'




import store from './store';
const history = syncHistoryWithStore(hashHistory, store)
/*
import {INCREMENT} from './actions/counter'
import {ADD_TODO} from './actions/todos'
store.dispatch({
    type: INCREMENT
});

store.dispatch({
    type: ADD_TODO,
    text: 'HELLO WORLD BLEAT'
})
*/

import VTemplate from './pages/layout/Template'
import VMain from './pages/Main'
import VAbout from './pages/About'

import VSignUp from './pages/SignUp'
import VLogin from './pages/Login'
import VProfile from './pages/Profile'

import VAdminLogin from './pages/admin/Login'
import VAdminSignUp from './pages/admin/SignUp'


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
                    <Route path="about" component={VAbout}></Route>
                    <Route path="signup" component={VSignUp}></Route>
                    <Route path="login" component={VLogin}></Route>
                    <Route path="profile" component={routeProtector(VProfile, ONLY_AUTHENTICATED)}></Route>

                    <Route path="admin/">
                        <Route path="signup" component={VAdminSignUp}></Route>
                        <Route path="login" component={VAdminLogin}></Route>
                        <Route path="dashboard" component={routeProtector(VAbout, ONLY_EMPLOYEE_ALL)}></Route>
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



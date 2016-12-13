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


import routeProtector, {ONLY_AUTHENTICATED, ONLY_ADMIN, ONLY_SUPERUSER} from './helpers/routeProtector'

import {restore_session} from './actions/client'

store.dispatch(restore_session(function () {
    const app = document.getElementById('app');
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={VTemplate}>
                    <IndexRoute component={VMain}></IndexRoute>
                    <Route path="about" component={VAbout}></Route>

                    <Route path="signup" component={VSignUp}></Route>

                    <Route path="login" component={VLogin}></Route>
                    <Route path="profile" component={routeProtector(VProfile, ONLY_AUTHENTICATED)}></Route>
                </Route>
            </Router>
        </Provider>,
        app);
}))


import api from '../helpers/api';
// import {Router} from 'react-router'
import cookie from 'react-cookie'
let my_api = api();

export const AUTHENTICATE_START = 'AUTHENTICATE_START'
export const AUTHENTICATE_OK = 'AUTHENTICATE_OK'
export const AUTHENTICATE_FAILED = 'AUTHENTICATE_FAILED'
export const LOG_OUT = 'LOG_OUT'
export const ACCESS_DENIED = 'ACCESS_DENIED'

export function authenticate_user(login, password) {

    return function (dispatch) {
        dispatch({
            type: AUTHENTICATE_START,
            data: {
                login: login,
                password: password
            }
        });
        my_api.post("api/v1/log_in", {
            username: login,
            password: password
        })
            .then((response) => {
                my_api = api()
                dispatch({
                    type: AUTHENTICATE_OK,
                    data: response.data
                })
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: AUTHENTICATE_FAILED,
                    data: {
                        handle: err,
                        message: err.response.data.message
                    }
                })
            })
    }
}
export function restore_session() {
    return function (dispatch) {
        my_api.get("api/v1/me")
            .then((response) => {
                my_api = api()
                dispatch({
                    type: AUTHENTICATE_OK,
                    data: response.data
                })
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: AUTHENTICATE_FAILED,
                    data: {
                        handle: err,
                        message: err.response.data.message
                    }
                })
            })
    }
}
export function auth_required(msg) {

    return function (dispatch) {
        dispatch({
            type: ACCESS_DENIED,
            data: {
                message: msg
            }
        })
    }
}
export function log_out(msg) {
    return function (dispatch) {
        my_api.post("api/v1/log_out", {})
            .then((response) => {
                dispatch({
                    type: LOG_OUT,
                    data: {
                        message: msg
                    }
                })
            })

    }
}



import api from '../helpers/api';
let my_api = api();

export const E_AUTHENTICATE_START = 'E_AUTHENTICATE_START'
export const E_AUTHENTICATE_OK = 'E_AUTHENTICATE_OK'
export const E_AUTHENTICATE_FAILED = 'E_AUTHENTICATE_FAILED'
export const E_LOG_OUT = 'E_LOG_OUT'
export const E_ACCESS_DENIED = 'E_ACCESS_DENIED'

export function authenticate_employee(login, password) {

    return function (dispatch) {
        dispatch({
            type: E_AUTHENTICATE_START,
            data: {
                login: login,
                password: password
            }
        });
        my_api.post("api/v1/employee/log_in", {
            username: login,
            password: password
        })
            .then((response) => {
                my_api = api()
                dispatch({
                    type: E_AUTHENTICATE_OK,
                    data: response.data
                })
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: E_AUTHENTICATE_FAILED,
                    data: {
                        handle: err,
                        message: err.response.data.message
                    }
                })
            })
    }
}

export function restore_e_session(next) {
    return function (dispatch) {
        my_api.get("api/v1/employee/me")
            .then((response) => {
                my_api = api()
                dispatch({
                    type: E_AUTHENTICATE_OK,
                    data: response.data
                })
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: E_AUTHENTICATE_FAILED,
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
            type: E_ACCESS_DENIED,
            data: {
                message: msg
            }
        })
    }
}



import api from '../helpers/api';
let my_api = api();

export const E_GET_CLIENTS_OK = 'E_GET_CLIENTS_OK'
export const E_GET_CLIENTS_FAILED = 'E_GET_CLIENTS_FAILED'

export const E_SWITCH_CLIENTS_PAGE = 'E_SWITCH_CLIENTS_PAGE'

export const E_OPEN_CLIENT_PAGE = 'E_OPEN_CLIENT_PAGE'
export const E_CLOSE_CLIENT_PAGE = 'E_CLOSE_CLIENT_PAGE'

export function get_clients(page = 1) {
    return function (dispatch) {
        my_api
            .get("api/v1/clients/?page=" + page)
            .then(response => {
                dispatch({
                    type: E_GET_CLIENTS_OK,
                    data: {
                        response: response.data,
                        requested: {
                            page: page
                        }
                    }
                })
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: E_GET_CLIENTS_FAILED,
                    data: {
                        handle: err,
                        message: err.response.data.message
                    }
                })
            })
    }
}
export function switch_page(page = 1) {
    return function (dispatch) {
        dispatch({
            type: E_SWITCH_CLIENTS_PAGE,
            data: page
        })
    }
}
export function open_client(client_id) {
    return function (dispatch) {
        dispatch({
            type: E_OPEN_CLIENT_PAGE,
            data: client_id
        })
    }
}
export function close_client() {
    return function (dispatch) {
        dispatch({
            type: E_CLOSE_CLIENT_PAGE,
            data: null
        })
    }
}
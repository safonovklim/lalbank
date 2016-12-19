import api from '../helpers/api';
let my_api = api();

export const E_GET_TRANSACTIONS_OK = 'E_GET_TRANSACTIONS_OK'
export const E_GET_TRANSACTIONS_FAILED = 'E_GET_TRANSACTIONS_FAILED'

export const E_SWITCH_TRANSACTIONS_PAGE = 'E_SWITCH_TRANSACTIONS_PAGE'

export function get_transactions(client_id, page = 1) {
    return function (dispatch) {
        my_api
            .get("api/v1/clients/" + client_id + "/transactions/?page=" + page)
            .then(response => {
                dispatch({
                    type: E_GET_TRANSACTIONS_OK,
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
                    type: E_GET_TRANSACTIONS_FAILED,
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
            type: E_SWITCH_TRANSACTIONS_PAGE,
            data: page
        })
    }
}
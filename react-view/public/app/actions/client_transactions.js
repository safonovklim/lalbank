import api from '../helpers/api';
let my_api = api();

export const GET_TRANSACTIONS_OK = 'GET_TRANSACTIONS_OK'
export const GET_TRANSACTIONS_FAILED = 'GET_TRANSACTIONS_FAILED'

export const SWITCH_TRANSACTIONS_PAGE = 'SWITCH_TRANSACTIONS_PAGE'

export function get_transactions(page = 1) {
    return function (dispatch) {
        my_api
            .get("api/v1/transactions/?page=" + page)
            .then(response => {
                dispatch({
                    type: GET_TRANSACTIONS_OK,
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
                    type: GET_TRANSACTIONS_FAILED,
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
            type: SWITCH_TRANSACTIONS_PAGE,
            data: page
        })
    }
}
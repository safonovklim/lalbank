import api from '../helpers/api';
let my_api = api();

export const GET_MY_CARDS_OK = 'GET_MY_CARDS_OK'
export const GET_MY_CARDS_FAILED = 'GET_MY_CARDS_FAILED'

export const ISSUE_CARD_OK = 'ISSUE_CARD_OK'
export const ISSUE_CARD_FAILED = 'ISSUE_CARD_FAILED'

export function get_cards() {
    return function (dispatch) {
        my_api.get("api/v1/cards")
            .then((response) => {
                dispatch({
                    type: GET_MY_CARDS_OK,
                    data: response.data
                })
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: GET_MY_CARDS_FAILED,
                    data: {
                        handle: err,
                        message: err.response.data.message
                    }
                })
            })
    }
}
export function issue_card(currency) {
    return function (dispatch) {
        my_api.post("api/v1/cards", {
            card: {
                currency: currency
            }
        })
            .then((response) => {
                dispatch({
                    type: ISSUE_CARD_OK,
                    data: response.data
                })
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: ISSUE_CARD_FAILED,
                    data: {
                        handle: err,
                        message: err.response.data.message
                    }
                })
            })
    }
}
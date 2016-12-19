import api from '../helpers/api';
let my_api = api();

export const SIGN_UP_OK = 'SIGN_UP_OK'
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED'

export function sign_up(client_data) {

    return function (dispatch) {

        my_api.post("api/v1/sign_up", client_data)
            .then((response) => {
                my_api = api()
                dispatch({
                    type: SIGN_UP_OK,
                    data: response.data
                })
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: SIGN_UP_FAILED,
                    data: {
                        handle: err,
                        message: err.response.data.message
                    }
                })
            })
    }
}


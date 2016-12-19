import api from '../helpers/api';
let my_api = api();

export const E_SIGN_UP_OK = 'E_SIGN_UP_OK'
export const E_SIGN_UP_FAILED = 'E_SIGN_UP_FAILED'

export function sign_up(client_data) {

    return function (dispatch) {

        my_api.post("api/v1/employee/sign_up", client_data)
            .then((response) => {
                my_api = api()
                dispatch({
                    type: E_SIGN_UP_OK,
                    data: response.data
                })
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: E_SIGN_UP_FAILED,
                    data: {
                        handle: err,
                        message: err.response.data.message
                    }
                })
            })
    }
}


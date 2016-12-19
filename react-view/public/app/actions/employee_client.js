import api from '../helpers/api';
let my_api = api();

export const E_UPDATE_USER_OK = 'E_UPDATE_USER_OK'
export const E_UPDATE_USER_FAILED = 'E_UPDATE_USER_FAILED'

export function update(client_id, action = '') {
    return function (dispatch) {
        if (action.length == 0) {
            dispatch({
                type: E_UPDATE_USER_FAILED,
                data: {
                    message: 'Unknown action'
                }
            })
        } else {
            my_api
                .post("api/v1/clients/" + client_id + "/" + action)
                .then((response) => {
                    dispatch({
                        type: E_UPDATE_USER_OK,
                        data: response.data
                    })
                })
                .catch((err) => {
                    console.error(err);
                    dispatch({
                        type: E_UPDATE_USER_FAILED,
                        data: {
                            handle: err,
                            message: err.response.data.message
                        }
                    })
                })
        }
    }
}


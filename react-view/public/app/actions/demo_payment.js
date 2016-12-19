import api from '../helpers/api';
import sha1 from 'sha1'

let my_api = api();

export const DEMO_PAYMENT_OK = 'DEMO_PAYMENT_OK'
export const DEMO_PAYMENT_FAILED = 'DEMO_PAYMENT_FAILED'

export function make_payment(payment_params) {
    let toSend = {
        transaction: payment_params
    }
    // key for dev stage, ONLY FOR DEMO, NOT FOR PRODUCTION
    let secret_key = '9d9618e3b573b08303134d469fcc88e51c1db1cdf2565cba53a673ccb1127b6d5c064d11a765745ce614b7b8f1d29fd3b83b5ff38c4ac36341bada5baea857c7'
    let signature = sha1(JSON.stringify(toSend) + '|' + secret_key)

    return function (dispatch) {
        my_api
            .post("gateway/v1/sexycard", toSend, {
                headers: {
                    'X-SexyCard-Signature': signature
                }
            })
            .then((response) => {
                dispatch({
                    type: DEMO_PAYMENT_OK,
                    data: response.data
                })
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: DEMO_PAYMENT_FAILED,
                    data: {
                        handle: err,
                        message: err.response.data.message
                    }
                })
            })
    }
}
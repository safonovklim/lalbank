import api from '../helpers/api';
let my_api = api();

export const E_GET_ANALYSIS_FOR_PERIOD_OK = 'E_GET_ANALYSIS_FOR_PERIOD_OK'
export const E_GET_ANALYSIS_FOR_PERIOD_FAILED = 'E_GET_ANALYSIS_FOR_PERIOD_FAILED'
export const E_SWITCH_ANALYSIS_FOR_PERIOD = 'E_SWITCH_ANALYSIS_FOR_PERIOD'

export function get_analysis_for_period(client_id, period) {
    let year = period.getUTCFullYear()
    let month = period.getUTCMonth() + 1
    return function (dispatch) {
        my_api
            .get("api/v1/clients/" + client_id + '/analysis?year=' + year + '&month=' + month)
            .then((response) => {

                dispatch({
                    type: E_GET_ANALYSIS_FOR_PERIOD_OK,
                    data: response.data
                })
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: E_GET_ANALYSIS_FOR_PERIOD_FAILED,
                    data: {
                        handle: err,
                        message: err.response.data.message
                    }
                })
            })
    }
}
export function switch_period(period) {
    return function (dispatch) {
        dispatch({
            type: E_SWITCH_ANALYSIS_FOR_PERIOD,
            data: period
        })
    }
}
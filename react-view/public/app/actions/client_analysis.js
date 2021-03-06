import api from '../helpers/api';
let my_api = api();

export const GET_ANALYSIS_FOR_PERIOD_OK = 'GET_ANALYSIS_FOR_PERIOD_OK'
export const GET_ANALYSIS_FOR_PERIOD_FAILED = 'GET_ANALYSIS_FOR_PERIOD_FAILED'

export const SWITCH_ANALYSIS_FOR_PERIOD = 'SWITCH_ANALYSIS_FOR_PERIOD'

export function get_analysis_for_period(period) {
    // period format is YYYY-MM
    let year = period.getUTCFullYear()
    let month = period.getUTCMonth() + 1

    return function (dispatch) {
        my_api
            .get("api/v1/analysis/?year=" + year + '&month=' + month)
            .then(response => {
                dispatch({
                    type: GET_ANALYSIS_FOR_PERIOD_OK,
                    data: response.data
                })
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: GET_ANALYSIS_FOR_PERIOD_FAILED,
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
            type: SWITCH_ANALYSIS_FOR_PERIOD,
            data: period
        })
    }
}
import {
    DEMO_PAYMENT_OK,
    DEMO_PAYMENT_FAILED
} from '../actions/demo_payment'
import cookie from 'react-cookie'

const initialState = {
    error: null,
    transaction_completed: false
};

export default function demo_transaction(state = initialState, action) {
    switch (action.type) {
        case DEMO_PAYMENT_OK: {
            return Object.assign({}, state, {
                error: initialState.error,
                transaction_completed: action.data.transaction_completed
            })
        }
        case DEMO_PAYMENT_FAILED: {
            return Object.assign({}, state, {
                error: (action.data['message']) ? action.data.message : 'Unknown error',
                transaction_completed: false
            })
        }

        default: {
            return state
        }
    }
}
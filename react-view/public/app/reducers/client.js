import {
    AUTHENTICATE_START,
    AUTHENTICATE_OK,
    AUTHENTICATE_FAILED,
    LOG_OUT,
    ACCESS_DENIED
} from '../actions/client'
import cookie from 'react-cookie'

const initialState = {
    isAuthenticated: false,
    error: null,
    user: null
};

export default function client(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATE_START: {
            return Object.assign({}, state, {
                isAuthenticated: false,
                error: null,
                user: null
            })
        }
        case AUTHENTICATE_OK: {
            if (action.data['token']) {
                cookie.save('client_token', action.data.token.value, {
                    expires: new Date(action.data.token.expire_at)
                })
            }
            return Object.assign({}, state, {
                isAuthenticated: true,
                user: action.data.client,
                error: null
            })
        }
        case AUTHENTICATE_FAILED: {
            if (action.data.message) {
                return Object.assign({}, state, {
                    isAuthenticated: false,
                    user: null,
                    error: action.data.message
                })
            } else {
                return Object.assign({}, state, {
                    isAuthenticated: false,
                    user: null,
                    error: 'Internal script error'
                })
            }
        }
        case ACCESS_DENIED:
        case LOG_OUT: {
            return Object.assign({}, state, {
                isAuthenticated: false,
                error: action.data.message,
                user: null
            })
        }
        default: {
            return state
        }
    }
}
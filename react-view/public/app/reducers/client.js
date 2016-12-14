import {
    AUTHENTICATE_START,
    AUTHENTICATE_OK,
    AUTHENTICATE_FAILED,
    LOG_OUT,
    ACCESS_DENIED
} from '../actions/client'
import {
    GET_MY_CARDS_OK,
    GET_MY_CARDS_FAILED,
    ISSUE_CARD_OK,
    ISSUE_CARD_FAILED
} from '../actions/client_cards'
import {
    SIGN_UP_OK,
    SIGN_UP_FAILED
} from '../actions/client_signup'

import cookie from 'react-cookie'

const initialState = {
    errors: {
        auth: null,
        cards: null
    },
    isAuthenticated: false,
    profile: null,
    data: {
        cards: [],
        issued_card: null
    },

    newbie: {
        created: false,
        errors: null, // fields
        error: null // message
    }
};

export default function client(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATE_START: {
            return Object.assign({}, state, initialState)
        }
        case AUTHENTICATE_OK: {
            if (action.data['token']) {
                cookie.save('client_token', action.data.token.value, {
                    expires: new Date(action.data.token.expire_at)
                })
            }
            return Object.assign({}, state, {
                errors: initialState.errors,
                isAuthenticated: true,
                profile: action.data.client,
                data: initialState.data
            })
        }
        case AUTHENTICATE_FAILED: {
            console.log(action)
            return Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    auth: (action.data['message']) ? action.data.message : 'Internal script error'
                }),
                isAuthenticated: false,
                profile: initialState.profile,
                data: initialState.data
            })
        }
        case ACCESS_DENIED: {
            return Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    auth: (action.data['message']) ? action.data.message : 'Internal script error'
                }),
                isAuthenticated: false,
                profile: initialState.profile,
                data: initialState.data
            })
        }
        case LOG_OUT: {
            return Object.assign({}, state, {
                errors: initialState.errors,
                isAuthenticated: false,
                profile: initialState.profile,
                data: initialState.data
            })
        }
        case GET_MY_CARDS_OK: {
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, {
                    cards: action.data
                }),
                errors: Object.assign({}, state.errors, {
                    cards: initialState.errors.cards
                })
            })
        }
        case GET_MY_CARDS_FAILED: {
            console.log(action)
            return Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    cards: (action.data['message']) ? action.data['message'] : 'Internal script error'
                }),
                data: Object.assign({}, state.data, {
                    cards: initialState.data.cards
                })
            })
        }
        case SIGN_UP_OK: {
            return Object.assign({}, state, {
                newbie: {
                    created: action.data.created,
                    errors: initialState.newbie.errors,
                    error: initialState.newbie.error
                }
            })
        }
        case SIGN_UP_FAILED: {
            console.log(action)
            const response = action.data.handle.response.data;
            return Object.assign({}, state, {
                newbie: {
                    created: response.created,
                    errors: (response['errors']) ? response['errors'] : initialState.newbie.errors,
                    error: (response['error']) ? response['error'] : 'Validation error',
                }
            })
        }
        case ISSUE_CARD_OK: {
            let new_card = action.data.card
            let new_state = Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    cards: initialState.errors.cards
                })
            })
            new_state.data.issued_card = new_card
            new_state.data.cards.push({
                amount: new_card.amount,
                card_number: new_card.card_number,
                currency: new_card.currency,
                id: new_card.id
            })
            return new_state
        }
        case ISSUE_CARD_FAILED: {
            console.log(action)
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, {
                    issued_card: null
                }),
                errors: Object.assign({}, state.errors, {
                    cards: (action.data['message']) ? action.data['message'] : 'Internal error'
                })
            })
        }
        default: {
            return state
        }
    }
}
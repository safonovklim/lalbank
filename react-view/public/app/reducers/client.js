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

import {
    GET_TRANSACTIONS_OK,
    GET_TRANSACTIONS_FAILED,
    SWITCH_TRANSACTIONS_PAGE
} from '../actions/client_transactions'

import {
    GET_ANALYSIS_FOR_PERIOD_OK,
    GET_ANALYSIS_FOR_PERIOD_FAILED,
    SWITCH_ANALYSIS_FOR_PERIOD
} from '../actions/client_analysis'

import cookie from 'react-cookie'

const date_now = new Date()
const initialState = {
    errors: {
        auth: null,
        cards: null,
        transactions: null,
        analysis: null
    },
    isAuthenticated: false,
    profile: null,
    data: {
        cards: [],
        issued_card: null,
        transactions: {
            list: [],
            current_page: 1,
            last_loaded_page: 0,
            more_available: true,
            per_page: 1
        },
        analysis: {
            data: {},
            current_period: date_now,
            allowed_periods: {
                from: date_now,
                to: date_now
            }
        }
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
            // reset all
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
        case GET_TRANSACTIONS_OK: {
            let new_state = Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    transactions: initialState.errors.transactions
                })
            })

            new_state.data.transactions.per_page = action.data.response.per_page // update per_page amount

            if (action.data.requested.page > new_state.data.transactions.last_loaded_page) {
                new_state.data.transactions.last_loaded_page = action.data.requested.page
                let new_t = action.data.response.transactions
                if (new_t.length > 0) {
                    new_t.forEach(t => {
                        new_state.data.transactions.list.push(t)
                    })


                    if (new_t.length < action.data.response.per_page) {
                        new_state.data.transactions.more_available = false
                    }
                } else {
                    // no more available
                    new_state.data.transactions.more_available = false
                }
            }


            return new_state
        }
        case GET_TRANSACTIONS_FAILED: {
            console.log(action)
            return Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    transactions: (action.data['message']) ? action.data['message'] : 'Internal script error'
                })
            })
        }
        case SWITCH_TRANSACTIONS_PAGE: {
            let new_state = Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    transactions: initialState.errors.transactions
                })
            })

            new_state.data.transactions.current_page = action.data // update per_page amount


            return new_state
        }
        case GET_ANALYSIS_FOR_PERIOD_OK: {
            console.log('new analysis', action.data)
            let new_state = Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    analysis: initialState.errors.analysis
                })
            })
            new_state.data.analysis.data[action.data.choosed_period] = action.data.info
            new_state.data.analysis.allowed_periods = {
                from: new Date(action.data.allowed_range.from),
                to: new Date(action.data.allowed_range.to),
            }

            return new_state
        }
        case GET_ANALYSIS_FOR_PERIOD_FAILED: {
            console.log(action)
            let unknown_msg = 'Internal script error'
            if (action.data['available'] === false) {
                unknown_msg = 'Not available for this period'
            }
            return Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    analysis: (action.data['message']) ? action.data['message'] : unknown_msg
                })
            })
        }
        case SWITCH_ANALYSIS_FOR_PERIOD: {
            let new_state = Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    analysis: initialState.errors.analysis
                })
            })

            new_state.data.analysis.current_period = new Date(action.data)


            return new_state
        }
        default: {
            return state
        }
    }
}
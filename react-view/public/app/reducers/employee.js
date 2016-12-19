import {
    E_AUTHENTICATE_START,
    E_AUTHENTICATE_OK,
    E_AUTHENTICATE_FAILED,
    E_LOG_OUT,
    E_ACCESS_DENIED
} from '../actions/employee'

import {
    E_SIGN_UP_OK,
    E_SIGN_UP_FAILED
} from '../actions/employee_signup'

import {
    E_GET_CLIENTS_OK,
    E_GET_CLIENTS_FAILED,
    E_SWITCH_CLIENTS_PAGE,
    E_OPEN_CLIENT_PAGE,
    E_CLOSE_CLIENT_PAGE
} from '../actions/employee_clients'

import {
    E_GET_BANK_ACCOUNTS_OK,
    E_GET_BANK_ACCOUNTS_FAILED
} from '../actions/employee_bank_accounts'

import {
    E_GET_ANALYSIS_FOR_PERIOD_OK,
    E_GET_ANALYSIS_FOR_PERIOD_FAILED,
    E_SWITCH_ANALYSIS_FOR_PERIOD
} from '../actions/employee_analysis'

import {
    E_GET_TRANSACTIONS_OK,
    E_GET_TRANSACTIONS_FAILED,
    E_SWITCH_TRANSACTIONS_PAGE
} from '../actions/employee_transactions'

import {
    E_UPDATE_USER_OK,
    E_UPDATE_USER_FAILED
} from '../actions/employee_client'

import cookie from 'react-cookie'

const date_now = new Date()

const startState = {
    errors: {
        auth: null,
        clients: null,
        bank_accounts: null,
        transactions: null,
        analysis: null,
        client_update: null
    },
    isAuthenticated: false,
    profile: null,
    data: {
        clients: {
            list: [],

            current_page: 1,
            last_loaded_page: 0,
            more_available: true,
            per_page: 1
        },
        client: {
            selected: false,
            profile: null,
            data: {
                bank_accounts: [],
                issued_card: null,
                transactions: {
                    list: [],
                    current_page: 1,
                    last_loaded_page: 0,
                    more_available: true,
                    per_page: 1,
                    statuses: {}
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
        }
    },
    newbie: {
        created: false,
        errors: null, // fields
        error: null // message
    }
};
let initialState = Object.assign({}, startState)

export default function employee(state = initialState, action) {
    switch (action.type) {
        case E_AUTHENTICATE_START: {
            return Object.assign({}, state, initialState)
        }
        case E_AUTHENTICATE_OK: {
            if (action.data['token']) {
                cookie.save('employee_token', action.data.token.value, {
                    expires: new Date(action.data.token.expire_at)
                })
            }
            return Object.assign({}, state, {
                errors: initialState.errors,
                isAuthenticated: true,
                profile: action.data.employee,
                data: initialState.data
            })
        }
        case E_AUTHENTICATE_FAILED: {
            return Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    auth: (action.data['message']) ? action.data.message : 'Internal script error'
                }),
                isAuthenticated: false,
                profile: initialState.profile,
                data: initialState.data
            })
        }

        case E_ACCESS_DENIED: {
            return Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    auth: (action.data['message']) ? action.data.message : 'Internal script error'
                }),
                isAuthenticated: false,
                profile: initialState.profile,
                data: initialState.data
            })
        }
        case E_LOG_OUT: {
            return Object.assign({}, state, {
                errors: initialState.errors,
                isAuthenticated: false,
                profile: initialState.profile,
                data: initialState.data
            })
        }

        case E_SIGN_UP_OK: {
            return Object.assign({}, state, {
                newbie: {
                    created: action.data.created,
                    errors: initialState.newbie.errors,
                    error: initialState.newbie.error
                }
            })
        }
        case E_SIGN_UP_FAILED: {
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

        case E_GET_CLIENTS_OK: {
            console.info(E_GET_CLIENTS_OK, action, initialState)

            let new_state = Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    clients: initialState.errors.clients
                })
            })


            let new_clients = Object.assign({}, new_state.data.clients)

            new_clients.per_page = action.data.response.per_page // update per_page amount

            if (action.data.requested.page > new_state.data.clients.last_loaded_page) {
                new_clients.last_loaded_page = action.data.requested.page

                let new_t = action.data.response.clients

                if (new_t.length > 0) {
                    new_t.forEach(t => {
                        new_clients.list.push(t)
                    })


                    if (new_t.length < action.data.response.per_page) {
                        new_clients.more_available = false
                    }
                } else {
                    // no more available
                    new_clients.more_available = false
                }
            }

            new_state.data.clients = new_clients



            return new_state
        }
        case E_GET_CLIENTS_FAILED: {
            console.log(action)
            return Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    clients: (action.data['message']) ? action.data['message'] : 'Ah error occurred'
                })
            })
        }
        case E_SWITCH_CLIENTS_PAGE: {
            let new_state = Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    clients: initialState.errors.clients
                })
            })

            new_state.data.clients.current_page = action.data // update per_page amount


            return new_state
        }

        case E_OPEN_CLIENT_PAGE:
        case E_CLOSE_CLIENT_PAGE: {
            let new_state = Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    clients: initialState.errors.clients
                }),
            })

            let new_data_client = {
                selected: false,
                    profile: null,
                    data: {
                    bank_accounts: [],
                        issued_card: null,
                        transactions: {
                        list: [],
                            current_page: 1,
                            last_loaded_page: 0,
                            more_available: true,
                            per_page: 1,
                            statuses: {}
                    },
                    analysis: {
                        data: {},
                        current_period: date_now,
                            allowed_periods: {
                            from: date_now,
                                to: date_now
                        }
                    }
                }
            }


            state.data.clients.list.forEach(client => {
                if (client.id == action.data) {
                    new_data_client.selected = true
                    new_data_client.profile = client
                }
            })



            new_state.data.client = new_data_client


            return new_state
        }

        case E_GET_BANK_ACCOUNTS_OK: {
            let new_state = Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    bank_accounts: initialState.errors.bank_accounts
                })
            })
            new_state.data.client.data.bank_accounts = action.data.response

            return new_state;
        }
        case E_GET_BANK_ACCOUNTS_FAILED: {
            console.log(action)
            return Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    bank_accounts: (action.data['message']) ? action.data['message'] : 'Internal script error'
                })
            })
        }

        case E_GET_ANALYSIS_FOR_PERIOD_OK: {


            let new_state = Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    analysis: initialState.errors.clients
                }),
                data: Object.assign({}, state.data, {
                    client: Object.assign({}, state.data.client)
                })
            })

            new_state.data.client.data.analysis.data[action.data.choosed_period] = action.data.info
            new_state.data.client.data.analysis.allowed_periods = {
                from: new Date(action.data.allowed_range.from),
                to: new Date(action.data.allowed_range.to),
            }

            return new_state
        }
        case E_GET_ANALYSIS_FOR_PERIOD_FAILED: {
            let unknown_msg = 'Not available for this period'
            if (action.data['available'] === false) {
                unknown_msg = 'Not available for this period'
            }
            return Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    analysis: (action.data['message']) ? action.data['message'] : unknown_msg
                })
            })
        }
        case E_SWITCH_ANALYSIS_FOR_PERIOD: {
            let new_state = Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    analysis: initialState.errors.analysis
                })
            })

            new_state.data.client.data.analysis.current_period = new Date(action.data)


            return new_state
        }

        case E_GET_TRANSACTIONS_OK: {
            let new_state = Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    transactions: initialState.errors.transactions
                })
            })

            new_state.data.client.data.transactions.per_page = action.data.response.per_page // update per_page amount
            new_state.data.client.data.transactions.statuses = action.data.response.statuses

            if (action.data.requested.page > new_state.data.client.data.transactions.last_loaded_page) {

                new_state.data.client.data.transactions.last_loaded_page = action.data.requested.page

                let new_t = action.data.response.transactions
                if (new_t.length > 0) {
                    new_t.forEach(t => {
                        new_state.data.client.data.transactions.list.push(t)
                    })


                    if (new_t.length < action.data.response.per_page) {
                        new_state.data.client.data.transactions.more_available = false
                    }
                } else {
                    // no more available
                    new_state.data.client.data.transactions.more_available = false
                }
            }


            return new_state
        }
        case E_GET_TRANSACTIONS_FAILED: {
            console.log(action)
            return Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    transactions: (action.data['message']) ? action.data['message'] : 'Internal script error'
                })
            })
        }
        case E_SWITCH_TRANSACTIONS_PAGE: {
            let new_state = Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    transactions: initialState.errors.transactions
                })
            })

            new_state.data.client.data.transactions.current_page = action.data // update per_page amount


            return new_state
        }


        case E_UPDATE_USER_OK: {
            let new_state =  Object.assign({}, state)
            new_state.data.client.profile = action.data.client
            return new_state
        }
        case E_UPDATE_USER_FAILED: {
            return Object.assign({}, state, {
                errors: Object.assign({}, state.errors, {
                    client_update: (action.data['message']) ? action.data.message : 'Unknown error'
                })
            })
        }

        default: {
            return state
        }
    }
}
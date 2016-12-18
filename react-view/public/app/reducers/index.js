import {combineReducers} from 'redux'
import client from './client'
import employee from './employee'
import demo_transaction from './demo_transaction'

export default combineReducers({
    client,
    employee,
    demo_transaction
})
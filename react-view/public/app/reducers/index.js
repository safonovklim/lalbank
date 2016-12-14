import {combineReducers} from 'redux'
import client from './client'
import employee from './employee'

export default combineReducers({
    client,
    employee
})
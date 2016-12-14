import axios from 'axios'
import cookie from 'react-cookie'


export default function api(headers = {}) {
    let client_token = cookie.load('client_token')
    if (client_token && client_token['length'] > 0) {
        headers['Authorization'] = 'Token token=' + client_token
    }
    let employee_token = cookie.load('employee_token')
    if (employee_token && employee_token['length'] > 0) {
        headers['Authorization-Employee'] = employee_token
    }
    return axios.create(Object.assign({}, {
        baseURL: 'http://localhost:3000/',
        headers: headers
    }))
}
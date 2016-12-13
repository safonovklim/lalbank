import axios from 'axios'
import cookie from 'react-cookie'


export default function api(headers = {}) {
    let client_token = cookie.load('client_token')
    if (client_token.length > 0) {
        console.log('auth token for client set')
        headers['Authorization'] = 'Token token=' + client_token
    }
    return axios.create(Object.assign({}, {
        baseURL: 'http://localhost:3000/',
        headers: headers
    }))
}
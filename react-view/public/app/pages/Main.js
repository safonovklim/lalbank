import React from 'react'
import {Link} from 'react-router'
import api from '../helpers/api'

const my_api = api();

export default class Main extends React.Component {

    render() {
        return(
            <div>
                Just page<br/>
                If you first time here, welcome to <Link to="signup">sign up form</Link>
            </div>
        )
    }
}
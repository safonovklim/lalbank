import React from 'react'
import {Link} from 'react-router'
import api from '../helpers/api'

const my_api = api();

export default class Main extends React.Component {

    render() {
        return(
            <div className="row">
                <div className="col-sm-12 col-md-3 col-md-offset-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">For clients</h3>
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link to="signup" className="btn btn-success btn-block">Sign up</Link>
                                <Link to="login" className="btn btn-primary btn-block">Log in</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-sm-12 col-md-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">For employee</h3>
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link to="admin/signup" className="btn btn-success btn-block">Sign up</Link>
                                <Link to="admin/login" className="btn btn-primary btn-block">Log in</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
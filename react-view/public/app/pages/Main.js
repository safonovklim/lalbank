import React from 'react'
import {Link} from 'react-router'
import api from '../helpers/api'

const my_api = api();

export default class Main extends React.Component {

    render() {
        return(
            <div className="row">
                <div className="col-sm-12 col-md-4 col-md-offset-2">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">For clients</h3>
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link to="signup" className="btn btn-success btn-block">Sign up</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="login" className="btn btn-primary btn-block">Log in</Link>
                            </li>
                            <li className="list-group-item">
                                <b>Features:</b>
                            </li>
                            <li className="list-group-item">
                                <i className="glyphicon glyphicon-ok"></i> Sign up <br/>
                                <i className="glyphicon glyphicon-ok"></i> Log in <br/>
                                <i className="glyphicon glyphicon-ok"></i> Profile info <br/>
                                <i className="glyphicon glyphicon-ok"></i> Watch own cards <br/>
                                <i className="glyphicon glyphicon-ok"></i> Issue card <br/>
                                <i className="glyphicon glyphicon-ok"></i> Watch own transactions <br/>
                                <i className="glyphicon glyphicon-ok"></i> Watch analytics <br/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-sm-12 col-md-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">For employee</h3>
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link to="admin/signup" className="btn btn-success btn-block">Sign up</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="admin/login" className="btn btn-primary btn-block">Log in</Link>
                            </li>
                            <li className="list-group-item">
                                <b>Features:</b>
                            </li>
                            <li className="list-group-item">
                                <i className="glyphicon glyphicon-ok"></i> Sign up <br/>
                                <i className="glyphicon glyphicon-ok"></i> Log in <br/>
                                <i className="glyphicon glyphicon-ok"></i> Employee profile info <br/>
                                <i className="glyphicon glyphicon-ok"></i> Manage client <br/>
                                <i className="glyphicon glyphicon-remove"></i> Bank analytics <br/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
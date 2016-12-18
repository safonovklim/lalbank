import React from 'react'
import {Link} from 'react-router'
import api from '../helpers/api'
import {connect} from 'react-redux'

const my_api = api();



@connect((store) => {
    return {
        client: store.reducer.client,
        employee: store.reducer.employee
    };
})
export default class Main extends React.Component {

    render() {
        const client = this.props.client
        const employee = this.props.employee


        return(
            <div>
                {
                    (!client.isAuthenticated || !employee.isAuthenticated) ? (
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="alert alert-warning" role="alert">
                                    After authorization, please reload page using <b>F5</b> button
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                        </div>
                    )
                }

                <div className="row">
                    <div className="col-sm-12 col-md-4 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">For clients</h3>
                            </div>
                            <ul className="list-group">
                                {
                                    (client.isAuthenticated == true) ? (
                                        <div>
                                            <li className="list-group-item">
                                                Welcome back, {client.profile.first_name + ' ' + client.profile.last_name}!
                                            </li>
                                            <li className="list-group-item">
                                                <Link to="profile" className="btn btn-success btn-block">Continue</Link>
                                            </li>
                                        </div>
                                    ) : (
                                        <div>
                                            <li className="list-group-item">
                                                <Link to="login" className="btn btn-primary btn-block">Log in</Link>
                                            </li>
                                            <li className="list-group-item">
                                                <Link to="signup" className="btn btn-success btn-block">Sign up</Link>
                                            </li>
                                        </div>
                                    )
                                }

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
                                {
                                    (employee.isAuthenticated == true) ? (
                                        <div>
                                            <li className="list-group-item">
                                                Logged in as @{employee.profile.username}
                                            </li>
                                            <li className="list-group-item">
                                                <Link to="admin/dashboard" className="btn btn-success btn-block">Continue</Link>
                                            </li>
                                        </div>
                                    ) : (
                                        <div>
                                            <li className="list-group-item">
                                                <Link to="admin/login" className="btn btn-primary btn-block">Log in</Link>
                                            </li>
                                            <li className="list-group-item">
                                                <Link to="admin/signup" className="btn btn-success btn-block">New employee</Link>
                                            </li>
                                        </div>
                                    )
                                }
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
            </div>
        )
    }
}
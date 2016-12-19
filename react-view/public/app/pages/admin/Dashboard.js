import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import EmployeeInfo from './for_dashboard/EmployeeInfo'

@connect((store) => {
    return {
        employee: store.reducer.employee
    };
})

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const employee = this.props.employee;
        if (employee.isAuthenticated === false) {
            return (<div></div>);
        }

        return(
            <div>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <EmployeeInfo employee={employee}/>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Actions</h3>
                            </div>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Link to="admin/clients" className="btn btn-block btn-primary">Watch clients</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
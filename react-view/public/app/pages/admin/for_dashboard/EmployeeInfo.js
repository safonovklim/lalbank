import React from 'react'


export default class EmployeeInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const employee = this.props.employee;
        const employee_info = employee['profile'];

        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Employee Info</h3>
                </div>
                <ul className="list-group">
                    <li className="list-group-item">Login: <b>{employee_info['username']}</b></li>
                    <li className="list-group-item">Role: <b>{employee_info['role']}</b></li>
                </ul>
            </div>
        )
    }
}
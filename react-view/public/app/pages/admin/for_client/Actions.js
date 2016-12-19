import React from 'react'
import {connect} from 'react-redux'
import {
    update
} from '../../../actions/employee_client'


@connect((store) => {
    return {
        errors: store.reducer.employee.errors,
        employee_data: store.reducer.employee.data.client,
        employee: store.reducer.employee
    };
})

export default class Analysis extends React.Component {
    constructor(props) {
        super(props)

        this.update = this.update.bind(this)
    }

    update(action = '') {
        this.props.dispatch(update(this.props.employee.data.client.profile.id, action))
    }


    render() {
        const a_error = this.props.errors.client_update;
        const a_data = this.props.employee_data; // analysis data
        const e_data = this.props.employee;

        if (!(e_data.profile.role == "security_staff" || e_data.profile.role == "founder")) {
            return <div></div>
        }

        let alert = <div></div>
        if (a_error) {
            alert = (
                <div className="alert alert-danger">
                    {a_error}
                </div>
            )
        }


        return(
            <div>
                {alert}
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Actions</h3>
                    </div>
                    <ul className="list-group">
                        {
                            (e_data.profile.role == "security_staff" && a_data.profile.status == "not_approved") ? (
                                <li className="list-group-item">
                                    <button className="btn btn-success btn-block" onClick={() => this.update('approve')}>approve</button>
                                </li>
                            ) : (
                                <div></div>
                            )
                        }
                        {
                            (a_data.profile.status == "activated") ? (
                                <li className="list-group-item">
                                    <button className="btn btn-block btn-danger" onClick={() => this.update('ban')} >block</button>
                                </li>
                            ) : (
                                <div></div>
                            )
                        }
                        {
                            (a_data.profile.status == "banned") ? (
                                <li className="list-group-item">
                                    <button className="btn btn-block btn-danger" onClick={() => this.update('unban')}>unblock</button>
                                </li>
                            ) : (
                                <div></div>
                            )
                        }
                    </ul>




                </div>
            </div>
        )
    }
}
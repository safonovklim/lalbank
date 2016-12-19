import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import MainInfo from './for_client/MainInfo'
import BankAccounts from './for_client/BankAccounts'
import Analysis from './for_client/Analysis'
import Transactions from './for_client/Transactions'
import Actions from './for_client/Actions'

import {
    open_client,
    close_client
} from '../../actions/employee_clients'

@connect((store) => {
    return {
        employee: store.reducer.employee,
        client: store.reducer.employee.data.client
    };
})

export default class Client extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.dispatch(open_client(this.props.routeParams.client_id))
    }

    render() {
        const client = this.props.client;
        const employee = this.props.employee;

        if (client.selected === false) {
            return (<div></div>);
        }

        return(
            <div>
                <div className="row">
                    <div className="col-sm-12 col-md-3">
                        <Link to="admin/clients" className="btn btn-danger btn-block">back to all clients</Link>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <MainInfo employee={employee}/>
                        <Actions employee={employee} />
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <Analysis employee={employee}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <BankAccounts employee={employee}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <Transactions employee={employee}/>
                    </div>
                </div>
            </div>


        )
    }
}
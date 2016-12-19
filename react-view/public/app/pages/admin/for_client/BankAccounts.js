import React from 'react'
import {connect} from 'react-redux'
import {
    get_bank_accounts
} from '../../../actions/employee_bank_accounts'

@connect((store) => {
    return {
        errors: store.reducer.employee.errors,
        employee_data: store.reducer.employee.data
    };
})

export default class BankAccounts extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.dispatch(get_bank_accounts(this.props.employee.data.client.profile.id))
    }

    render() {
        const error = this.props.errors.bank_accounts;
        const client_data = this.props.employee_data.client.data;

        let alert = <div></div>

        if (error) {
            alert = (
                <div className="alert alert-danger">
                    {error}
                </div>
            )
        }
        return(
            <div>
                {alert}

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Bank accounts (total: {client_data['bank_accounts'].length})</h3>
                    </div>
                    {
                        (client_data['bank_accounts'].length > 0) ? (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Balance</th>
                                        <th>Issue reason</th>
                                        <th>Linked cards</th>
                                        <th className="success">Transactions success</th>
                                        <th className="danger">Transactions failed</th>
                                        <th>Issued at</th>
                                        <th>Blocked?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        client_data['bank_accounts'].map((account) => {
                                            let dt = new Date(account.created_at)
                                            return (
                                                <tr key={account.id}>
                                                    <td>{account.amount + ' ' + account.currency}</td>
                                                    <td>{account.reason}</td>
                                                    <td>{
                                                        (account.cards.map((card) => {
                                                            return (
                                                                <span>{card.card_number}<br/></span>
                                                            )
                                                        }))
                                                    }</td>
                                                    <td className="success">{account.transactions_success}</td>
                                                    <td className="danger">{account.transactions_failed}</td>
                                                    <td>
                                                        {dt.getUTCFullYear() + '-' + (dt.getUTCMonth() + 1) + '-' + dt.getUTCDate()}
                                                        <br/>
                                                        {dt.getUTCHours() + ':' + dt.getUTCMinutes()} UTC
                                                    </td>
                                                    <td>
                                                        {
                                                            (account.is_blocked == true) ? (
                                                                <span className="glyphicon glyphicon-ok"></span>
                                                            ) : (
                                                                <span className="glyphicon glyphicon-remove"></span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        ) : (
                            <div className="panel-body">
                                No bank accounts opened.
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}
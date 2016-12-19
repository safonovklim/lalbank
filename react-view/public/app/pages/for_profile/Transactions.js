import React from 'react'
import {connect} from 'react-redux'
import {
    get_transactions,
    switch_page
} from '../../actions/client_transactions'

// this.props.dispatch(authenticate_user(this.state.login, this.state.password))
@connect((store) => {
    return {
        client: store.reducer.client
    };
})

export default class Transactions extends React.Component {
    constructor(props) {
        super(props)
        this.openNextPage = this.openNextPage.bind(this)
        this.openPrevPage = this.openPrevPage.bind(this)
        this.openPage = this.openPage.bind(this)
        this.getTransactionsByPage = this.getTransactionsByPage.bind(this)

        const t_data = this.props.client.data.transactions; // transactions data
        if (t_data.last_loaded_page == 0) {
            this.props.dispatch(get_transactions(t_data.last_loaded_page + 1))
        }
    }

    openNextPage() {
        const t_data = this.props.client.data.transactions;
        this.openPage(t_data.current_page + 1)
    }
    openPrevPage() {
        const t_data = this.props.client.data.transactions;
        this.openPage(t_data.current_page - 1)
    }
    openPage(number) {
        const t_data = this.props.client.data.transactions;


        if (!(number <= t_data.last_loaded_page) && (t_data.last_loaded_page <= number)){
            this.props.dispatch(get_transactions(t_data.last_loaded_page + 1))
        }
        this.props.dispatch(switch_page(number))

    }

    getTransactionsByPage(number) {
        const t_data = this.props.client.data.transactions;
        return t_data.list.slice((number - 1) * t_data.per_page, number * t_data.per_page)
    }

    render() {
        const t_error = this.props.client.errors.transactions;
        const client_data = this.props.client.data.profile;
        const t_data = this.props.client.data.transactions; // transactions data

        let alert = <div></div>
        if (t_error) {
            alert = (
                <div className="alert alert-danger">
                    {t_error}
                </div>
            )
        }



        let t_display_date_style = {opacity: '0.5'}
        return(
            <div>
                {alert}
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Your transactions</h3>
                    </div>
                    {
                        (this.getTransactionsByPage(t_data.current_page).length > 0) ? (
                            <ul className="list-group">
                                {
                                    this.getTransactionsByPage(t_data.current_page).map(function (t) {
                                        let dt = new Date(t.created_at)
                                        return (
                                            <li className="list-group-item" key={t.id}>
                                                <b>{t.amount} {t.currency}</b> - {t.category} <br/>
                                                <span style={t_display_date_style}>
                                                    at {
                                                        dt.getUTCFullYear()
                                                        + '/' + (dt.getUTCMonth() + 1)
                                                        + '/' + dt.getUTCDate()
                                                        + ' ' + dt.getUTCHours()
                                                        + ':' + dt.getUTCMinutes()
                                                        + ' UTC'
                                                    }
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        ) : (
                            <div className="panel-body">
                                No transactions.
                            </div>
                        )
                    }
                    {
                        (t_data.list.length > 0) ? (
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-xs-6">
                                        {
                                            t_data.current_page > 1 ? (
                                                <button className="btn btn-block btn-warning" onClick={this.openPrevPage}>&lt; prev</button>
                                            ) : (
                                                <button className="btn btn-block btn-warning" disabled="disabled">First page</button>
                                            )
                                        }
                                    </div>
                                    <div className="col-xs-6">
                                        {
                                            (t_data.more_available || (t_data.more_available == false && t_data.current_page < t_data.last_loaded_page)) ? (
                                                <button className="btn btn-block btn-warning" onClick={this.openNextPage}>next &gt;</button>
                                            ) : (
                                                <button className="btn btn-block btn-warning" disabled="disabled">Last page</button>
                                            )
                                        }
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div>
                            </div>
                        )
                    }


                </div>
            </div>
        )
    }
}
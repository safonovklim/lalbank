import React from 'react'
import {connect} from 'react-redux'
import {
    get_analysis_for_period,
    switch_period
} from '../../actions/client_analysis'

// this.props.dispatch(authenticate_user(this.state.login, this.state.password))
@connect((store) => {
    return {
        client: store.reducer.client
    };
})

export default class Analysis extends React.Component {
    constructor(props) {
        super(props)
        this.getNextPeriod = this.getNextPeriod.bind(this)
        this.getPrevPeriod = this.getPrevPeriod.bind(this)
        this.openPeriod = this.openPeriod.bind(this)

        const a_data = this.props.client.data.analysis; // analysis data
        const current_period_f = a_data.current_period.getUTCFullYear() + '-' + (a_data.current_period.getUTCMonth() + 1)

        if (!(typeof a_data.data[current_period_f] == "object")) {
            console.info('load analysis for ' + a_data.current_period)
            this.props.dispatch(get_analysis_for_period(a_data.current_period))
        }
    }

    getNextPeriod() {
        const a_data = this.props.client.data.analysis;
        let new_p = a_data.current_period
        new_p.setUTCMonth(new_p.getUTCMonth() +1 )
        return new_p
    }
    getPrevPeriod() {
        const a_data = this.props.client.data.analysis;
        let new_p = a_data.current_period
        new_p.setUTCMonth(new_p.getUTCMonth() - 1 )
        return new_p
    }
    openPeriod(period) {
        const a_data = this.props.client.data.analysis;

        const new_period_f = period.getUTCFullYear() + '-' + (period.getUTCMonth() + 1)
        if (!(a_data.data[new_period_f])) {
            this.props.dispatch(get_analysis_for_period(period))
        }
        this.props.dispatch(switch_period(period))

    }


    render() {
        const a_error = this.props.client.errors.analysis;
        const client_data = this.props.client.data.profile;
        const a_data = this.props.client.data.analysis; // analysis data

        let alert = <div></div>
        if (a_error) {
            alert = (
                <div className="alert alert-danger">
                    {a_error}
                </div>
            )
        }


        const current_period_f = a_data.current_period.getUTCFullYear() + '-' + (a_data.current_period.getUTCMonth() + 1)
        return(
            <div>
                {alert}
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Expenses for {current_period_f}</h3>
                    </div>
                    {
                        (typeof a_data.data[current_period_f] == "object") ? (
                            <ul className="list-group">
                                {
                                    (a_data.data[current_period_f].length > 0) ? a_data.data[current_period_f].map(function (t) {
                                        return (
                                            <li className="list-group-item">
                                                <b>{t.amount} {t.currency}</b> - {t.category} <br/>
                                            </li>
                                        )
                                    }) : (
                                        <li className="list-group-item">
                                            No transactions found for this period
                                        </li>
                                    )
                                }
                            </ul>
                        ) : (
                            <div className="panel-body">
                                No info.
                            </div>
                        )
                    }
                    <div className="panel-body">
                            <div className="row">
                                <div className="col-xs-6">
                                    {
                                        a_data.current_period > a_data.allowed_periods.from ? (
                                            <button className="btn btn-block btn-warning" onClick={() => this.openPeriod(this.getPrevPeriod())}>&lt; prev</button>
                                        ) : (
                                            <button className="btn btn-block btn-warning" disabled="disabled">First page</button>
                                        )
                                    }
                                </div>
                                <div className="col-xs-6">
                                    {
                                        a_data.current_period < a_data.allowed_periods.to ? (
                                            <button className="btn btn-block btn-warning" onClick={() => this.openPeriod(this.getNextPeriod())}>next &gt;</button>
                                        ) : (
                                            <button className="btn btn-block btn-warning" disabled="disabled">Last page</button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>




                </div>
            </div>
        )
    }
}
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {
    get_clients,
    switch_page
} from '../../actions/employee_clients'

// this.props.dispatch(authenticate_user(this.state.login, this.state.password))
@connect((store) => {
    return {
        employee: store.reducer.employee
    };
})

export default class Clients extends React.Component {
    constructor(props) {
        super(props)
        this.openNextPage = this.openNextPage.bind(this)
        this.openPrevPage = this.openPrevPage.bind(this)
        this.openPage = this.openPage.bind(this)
        this.getClientsByPage = this.getClientsByPage.bind(this)

        const t_data = this.props.employee.data.clients; // transactions data
        if (t_data.last_loaded_page == 0) {
            this.props.dispatch(get_clients(t_data.last_loaded_page + 1))
        }
    }

    openNextPage() {
        const t_data = this.props.employee.data.clients;
        this.openPage(t_data.current_page + 1)
    }
    openPrevPage() {
        const t_data = this.props.employee.data.clients;
        this.openPage(t_data.current_page - 1)
    }
    openPage(number) {
        const t_data = this.props.employee.data.clients;


        if (!(number <= t_data.last_loaded_page) && (t_data.last_loaded_page <= number)){
            this.props.dispatch(get_clients(t_data.last_loaded_page + 1))
        }
        this.props.dispatch(switch_page(number))

    }

    getClientsByPage(number) {
        const t_data = this.props.employee.data.clients;
        return t_data.list.slice((number - 1) * t_data.per_page, number * t_data.per_page)
    }

    render() {
        const t_error = this.props.employee.errors.clients;
        const t_data = this.props.employee.data.clients;

        let alert = <div></div>
        if (t_error) {
            alert = (
                <div className="alert alert-danger">
                    {t_error}
                </div>
            )
        }



        return(
            <div>
                <div className="row">
                    <div className="col-sm-12 col-md-3">
                        <Link to="admin/dashboard" className="btn btn-danger">back to dashboard</Link>
                    </div>
                </div>
                <hr/>
                {alert}
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Clients</h3>
                    </div>
                    <div className="panel-body">
                    {
                        (this.getClientsByPage(t_data.current_page).length > 0) ? (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Full name</th>
                                        <th>Birth date (YYYY-MM-DD)</th>
                                        <th>Status</th>
                                        <th>Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.getClientsByPage(t_data.current_page).map(function (t) {
                                            return (
                                                <tr key={t.id}>
                                                    <td>{t.last_name + ' ' + t.first_name + ' ' + t.middle_name}</td>
                                                    <td>{t.birth_at}</td>
                                                    <td>{t.status}</td>
                                                    <td><Link to={'admin/clients/' + t.id} className="btn btn-info">OPEN</Link></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        ) : (<span>No clients.</span>)
                    }
                    </div>
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
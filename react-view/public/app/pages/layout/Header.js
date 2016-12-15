import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {log_out} from '../../actions/client'


@connect((store) => {
    return {
        client: store.reducer.client,
        employee: store.reducer.employee
    };
})



export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }
    onLogoutClick(e) {
        // console.info('Header onLogoutClick', this);
        this.props.dispatch(log_out('You are logged out'));
        this.props.router.push('login');
    }

    render() {

        let admin_link = <span></span>
        if (this.props.employee.isAuthenticated) {
            admin_link = (
                <span>
                    | <Link to="admin/dashboard" className="navbar-link">Admin</Link>
                </span>
            )
        }

        let header_auth = <span></span>;
        let client = this.props.client;
        if (!(client.isAuthenticated)) {
            header_auth = <Link to="login" className="navbar-link">Sign in</Link>
        } else {
            header_auth = (
                <span>
                    <b><Link to="profile" className="navbar-link">{client.profile['last_name']} {client.profile['first_name']}</Link> </b> | <Link className="navbar-link" onClick={this.onLogoutClick}>Log out</Link>
                </span>
            )
        }

        const nav_style = {
            'marginTop': '20px'
        }
        return(
            <nav className="navbar navbar-inverse" style={nav_style}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Virtual Bank</Link>
                    </div>
                    <div className="collapse navbar-collapse">
                        <div className="navbar-right">
                            <p className="navbar-text">
                                {header_auth} {admin_link}
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
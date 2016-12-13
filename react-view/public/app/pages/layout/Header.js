import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {log_out} from '../../actions/client'


@connect((store) => {
    return {
        client: store.reducer.client
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
        let header_auth = null;
        let auth = this.props.client;
        if (!(auth.isAuthenticated)) {
            header_auth = <Link to="login" className="btn btn-default navbar-btn navbar-right">Sign in</Link>
        } else {
            header_auth = (
                <div className="navbar-right">
                    <p className="navbar-text">
                       <b><Link to="profile" className="navbar-link">{auth.profile['last_name']} {auth.profile['first_name']}</Link> </b> | <Link className="navbar-link" onClick={this.onLogoutClick}>Log out</Link>
                    </p>
                </div>
            )
        }

        const nav_style = {
            'marginTop': '20px'
        }
        return(
            <nav className="navbar navbar-inverse" style={nav_style}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">eBank</Link>
                    </div>
                    <div className="collapse navbar-collapse">
                        {header_auth}
                    </div>
                </div>
            </nav>
        )
    }
}
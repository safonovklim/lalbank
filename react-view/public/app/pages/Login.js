import React from 'react'
import {connect} from 'react-redux'
import {authenticate_user} from '../actions/client'

@connect((store) => {
    return {
        client: store.reducer.client
    };
})

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        // console.log(e.target.name + ' == ' + e.target.value);
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e) {
        e.preventDefault();
        // console.info('Login: ' + this.state.login);
        // console.info('Password: ' + this.state.password);
        this.props.dispatch(authenticate_user(this.state.login, this.state.password))
    }
    render() {
        // console.log(this);
        if (this.props.client.isAuthenticated) {
            this.props.router.push('profile');
        }
        let alert = <div className=""></div>;
        if (this.props.client.errors['auth']) {
            alert = <div className="alert alert-danger">{this.props.client.errors['auth']}</div>
        }
        return(
            <div className="col-sm-12 col-md-6 col-md-offset-3">
                <form onSubmit={this.onSubmit}>
                    {alert}
                    <div className="form-group">
                        <input type="text" className="form-control" name="login" onChange={this.onChange} placeholder="Login"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" onChange={this.onChange} placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Log in</button>
                </form>
            </div>
        )
    }
}
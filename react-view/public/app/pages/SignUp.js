import React from 'react'
import {connect} from 'react-redux'
import {sign_up} from '../actions/client_signup'

@connect((store) => {
    return {
        client: store.reducer.client
    };
})

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            client: {
                last_name: '',
                first_name: '',
                middle_name: '',
                username: '',
                password: '',
                password_confirmation: ''
            },
            input_validation_errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.renderInput = this.renderInput.bind(this);
    }
    onChange(e) {
        console.log(e.target.name + ' == ' + e.target.value)
        let new_state = Object.assign({}, this.state)
        new_state.client[e.target.name] = e.target.value
        this.setState(new_state)
        console.log(this.state)
    }
    onSubmit(e) {
        e.preventDefault();
        // console.info('Login: ' + this.state.login);
        // console.info('Password: ' + this.state.password);
        this.props.dispatch(sign_up({client: this.state.client}))
    }
    renderInput(name, value = "", placeholder = "", type = "text", required = true) {
        return (
            <div className="form-group">
                <input className="form-control" onChange={this.onChange}  type={type} name={name} defaultValue={value} placeholder={placeholder} required={required} />
                {
                    (this.state.input_validation_errors && this.state.input_validation_errors[name]) ? (
                        <span>
                            {this.state.input_validation_errors[name].join(',')}
                        </span>
                    ) : (
                        <span></span>
                    )
                }
            </div>
        )
    }
    render() {
        // console.log(this);
        if (this.props.client.isAuthenticated) {
            this.props.router.push('profile');
        }
        let alert = <div></div>;
        if (this.props.client.newbie['error']) {
            alert = <div className="alert alert-danger">{this.props.client.newbie['error']}</div>
        }
        if (this.props.client.newbie.created === true) {
            alert = <div className="alert alert-success">Successful registered. Please wait for approving by our security staff.</div>
        }
        this.state.input_validation_errors = this.props.client.newbie.errors;
        return(
            <div className="col-sm-12 col-md-6 col-md-offset-3">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Join us</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            {alert}
                            {this.renderInput("last_name", '', 'Last name')}
                            {this.renderInput("first_name", '', 'First name')}
                            {this.renderInput("middle_name", '', 'Middle name', 'text', false)}
                            {this.renderInput("birth_at", '', 'Birth date', 'date')}
                            <hr/>
                            {this.renderInput("username", '', 'Login')}
                            {this.renderInput("password", '', 'Password', 'password')}
                            {this.renderInput("password_confirmation", '', 'Password confirmation', 'password')}
                            <button type="submit" className="btn btn-primary">Sign up</button>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}
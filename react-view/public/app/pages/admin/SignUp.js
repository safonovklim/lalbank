import React from 'react'
import {connect} from 'react-redux'
import {sign_up} from '../../actions/employee_signup'

@connect((store) => {
    return {
        employee: store.reducer.employee
    };
})

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employee: {
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
        let new_state = Object.assign({}, this.state)
        new_state.employee[e.target.name] = e.target.value
        this.setState(new_state)
    }
    onSubmit(e) {
        e.preventDefault();
        // console.info('Login: ' + this.state.login);
        // console.info('Password: ' + this.state.password);
        this.props.dispatch(sign_up({employee: this.state.employee}))
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
        if (this.props.employee.isAuthenticated) {
            this.props.router.push('profile');
        }
        let alert = <div></div>;
        if (this.props.employee.newbie['error']) {
            alert = <div className="alert alert-danger">{this.props.employee.newbie['error']}</div>
        }
        if (this.props.employee.newbie.created === true) {
            alert = <div className="alert alert-success">Successful registered. Please wait for approving by our security staff.</div>
        }
        this.state.input_validation_errors = this.props.employee.newbie.errors;
        return(
            <div className="col-sm-12 col-md-6 col-md-offset-3">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Join us</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            {alert}
                            {this.renderInput("username", '', 'Login')}
                            {this.renderInput("password", '', 'Password', 'password')}
                            {this.renderInput("password_confirmation", '', 'Password confirmation', 'password')}
                            <button type="submit" className="btn btn-primary">Sign up as Employee</button>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}